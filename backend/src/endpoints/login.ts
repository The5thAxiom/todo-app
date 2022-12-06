import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
    const dbUrl = process.env.DB_URL as string;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const client = new MongoClient(dbUrl);
    const { email, password } = req.body;
    try {
        // connect to the db
        await client.connect();
        const db = client.db('todo');
        const users = db.collection('users');

        // find the user with the given email
        const user = await users.findOne({ email });

        if (user) {
            const passwordIsValid = await compare(password, user.password);
            if (passwordIsValid) {
                // create a new jwt token for the user
                const token = jwt.sign({ email }, jwtSecretKey, {
                    expiresIn: process.env.TOKEN_EXPIRY as string
                });
                res.status(202).json({
                    msg: 'logged in successfully',
                    token
                });
            } else res.json({ msg: 'incorrect password' });
        } else {
            res.json({ msg: 'incorrect email' });
        }
    } catch (e) {
        res.status(500).json({ msg: 'database error' });
    } finally {
        await client.close();
    }
};

export default login;
