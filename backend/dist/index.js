import express from 'express';
import { config } from 'dotenv';
config();
const app = express();
const port = process.env.PORT;
app.use('/', express.static('../frontend/dist'));
app.get('/api/test', (req, res) => {
    res.json({ msg: 'the server is running' });
});
app.listen(port, () => {
    console.log(`[server]: live at http://localhost:${port}`);
});
