import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Server!');
});

app.listen(port, () => {
    console.log(`[server]: live at https://localhost:${port}`);
});
