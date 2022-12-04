import express from 'express';
import { config } from 'dotenv';
config();
const app = express();
const port = process.env.PORT;
app.get('/test', (req, res) => {
    res.json({ msg: 'server running' });
});
app.listen(port, () => {
    console.log(`[server]: live at https://localhost:${port}`);
});

