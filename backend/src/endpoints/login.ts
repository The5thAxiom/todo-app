import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
    const dbUrl = process.env.DB_URL as string;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

    const client = new MongoClient(dbUrl);
    const { email, password } = req.body;
    console.log({ email, password });
    try {
        // connect to the db
        await client.connect();
        const db = client.db('todo');
        const users = db.collection('users');

        // find the user with the given email and password
        const user = await users.findOne({ email, password });
        console.log({ user });

        if (user) {
            // create a new jwt token for the user
            const token = jwt.sign({ email }, jwtSecretKey, {
                expiresIn: '30m'
            });
            res.status(200).json({
                msg: 'logged in successfully',
                token
            });
        } else {
            res.status(400).json({ msg: 'username or password is incorrect' });
        }
    } catch (e) {
        res.status(500).json({ msg: 'database error' });
    } finally {
        await client.close();
    }
};

export default login;
