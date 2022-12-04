import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT;

import protectedEndpoint from './protectedEndpoint.js';

app.use('/', express.static('../frontend/dist'));

app.get('/api', (req, res) => {
    res.send('welcome to the todo app api!');
});

app.get('/api/test', (req, res) => {
    res.json({ msg: 'the server is running' });
});

app.get('/api/signup', (req, res) => {});

app.get('/api/login', (req, res) => {});

app.get(
    '/api/profile',
    protectedEndpoint((req, res, user) => {
        res.json({ user });
    })
);

app.get(
    '/api/todos',
    protectedEndpoint((req, res, user) => {
        res.json({ user });
    })
);
app.get(
    '/api/todo/:id',
    protectedEndpoint((req, res, user) => {
        const id = req.params.id;
        res.json({ id, user });
    })
);

app.listen(port, () => {
    console.log(`[server]: live at http://localhost:${port}`);
});
