import { Request, Response } from 'express';
import { MongoClient, MongoServerError } from 'mongodb';

export const getAllTodos = async (req: Request, res: Response) => {
    const user = res.locals.user as User;

    const dbUrl = process.env.DB_URL as string;
    const client = new MongoClient(dbUrl);

    try {
        await client.connect();
        const db = client.db('todo');
        const todosCollection = db.collection('todos');

        // get the todos from the db
        const todos = await todosCollection
            .find({ 'creator._id': user._id })
            .toArray();
        res.json({ msg: 'OK', todos });
    } catch (e) {
        res.status(500).json({ msg: 'database error' });
    } finally {
        client.close();
    }
};

export const addNewTodo = async (req: Request, res: Response) => {
    const user = res.locals.user;
    delete user.password;

    // get the todo from the request
    const todoFromRequest = req.body;
    const todo: Todo = {
        ...todoFromRequest,
        creationDateTime: new Date(todoFromRequest.creationDateTime),
        dateTime: new Date(todoFromRequest.dateTime),
        creator: user
    };
    // validate the todo
    // TODO: make validation function for todo

    // insert in the db
    const dbUrl = process.env.DB_URL as string;
    const client = new MongoClient(dbUrl);

    try {
        await client.connect();
        const db = client.db('todo');
        const todos = db.collection('todos');

        // insert the todo into the db
        const writeResult = await todos.insertOne(todo);
        res.status(201).json({ msg: 'todo added' });
    } catch (e) {
        res.status(500).json({ msg: 'database error' });
    } finally {
        client.close();
    }
};
