import { Request, Response } from 'express';
import { MongoClient, MongoServerError } from 'mongodb';
import { hash, compare } from 'bcrypt';

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

const nameIsValid = (name: string) => {
    if (!name || name === '') throw new ValidationError("'name' field missing");
};

const emailIsValid = (email: string) => {
    if (!email || email === '')
        throw new ValidationError("'email' field missing");
    else {
        const validEmailRegex = /\S+@\S+\.\S+/g;
        if (!validEmailRegex.test(email))
            throw new ValidationError('email format incorrect');
    }
};

const passwordIsValid = (password: string) => {
    if (!password || password === '')
        throw new ValidationError("'name' field missing");
};

const signup = async (req: Request, res: Response) => {
    const dbUrl = process.env.DB_URL as string;

    // validate the input
    const { name, email, password }: UserForDb = req.body;
    try {
        nameIsValid(name);
        emailIsValid(email);
        passwordIsValid(password);
    } catch (e) {
        if (e instanceof ValidationError) {
            res.json({ msg: e.message });
            return;
        } else throw e;
    }

    // prepare the user
    const hashedPassword = await hash(password, 10);
    const user: UserForDb = {
        name,
        email,
        password: hashedPassword
    };

    const client = new MongoClient(dbUrl);
    try {
        // connect to the db
        await client.connect();
        const db = client.db('todo');
        const users = db.collection('users');

        // insert the user into the db
        try {
            const writeResult = await users.insertOne(user);
            // check for errors
            res.status(201).json({ msg: 'new account created' });
        } catch (e) {
            if (e instanceof MongoServerError && e.code === 11000) {
                res.json({
                    msg: 'an account with this email already exists'
                });
            } else throw e;
        }
    } catch (e) {
        res.status(500).json({ msg: 'database error' });
    } finally {
        await client.close();
    }
};

export default signup;
