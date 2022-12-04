import { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const validJwtRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        const token = req.headers.authorization?.split(' ')[1]; // get the part after 'Bearer'
        if (!token) throw Error('token not found');
        const { email, exp } = jwt.verify(token, jwtSecretKey, {
            complete: false
        }) as any;

        const dbUrl = process.env.DB_URL as string;
        const client = new MongoClient(dbUrl);

        try {
            // connect to the db
            await client.connect();
            const db = client.db('todo');
            const users = db.collection('users');

            // find the user with the given email
            const user = await users.findOne({ email });
            if (user) {
                res.locals.user = user;
                next();
            } else {
                res.status(401).json({ msg: 'invalid token' }).end();
            }
        } catch (e) {
            res.status(500).json({ msg: 'database error' }).end();
        }
    } catch (e) {
        res.status(401).json({ msg: 'invalid token' }).end();
    }
};

export default validJwtRequired;
