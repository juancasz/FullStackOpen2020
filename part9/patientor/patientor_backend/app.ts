import express from 'express';
import cors from 'cors';
import pingRouter from './controllers/ping';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

app.use('/api/ping',pingRouter);

export default app;