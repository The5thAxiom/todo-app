import express, { json } from 'express';
import { config } from 'dotenv';

import validJwtRequired from './middleware/validJwtRequired.js';

import login from './endpoints/login.js';
import signup from './endpoints/signup.js';

config();
const app = express();
const port = process.env.PORT;

app.use('/', express.static('../frontend/dist'));
app.use(json());

app.get('/api', (req, res) => {
    res.send('welcome to the todo app api!');
});

app.get('/api/test', (req, res) => res.json({ msg: 'running' }));

// user endpoints
app.post('/api/signup', signup);

app.post('/api/login', login);

app.get('/api/profile', validJwtRequired, (req, res) => {
    const msg = 'user details';
    const user = res.locals.user as User;
    res.json({ msg, user });
});

app.get('/api/logout', validJwtRequired, (req, res) => {
    const msg = 'logged out';
    const user = res.locals.user as User;
    res.json({ msg });
});

// todo endpoints
app.get('/api/todos', validJwtRequired, (req, res) => {
    const msg = 'OK';
    const user = res.locals.user as User;
    res.json({ msg, user });
});

app.get('/api/todo/:id', validJwtRequired, (req, res) => {
    const msg = 'OK';
    const user = res.locals.user as User;
    res.json({ msg, user });
});

app.listen(port, () => {
    console.log(`[server]: live at http://localhost:${port}`);
});
