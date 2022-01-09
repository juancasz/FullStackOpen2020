import express from 'express';
import cors from 'cors';
import pingRouter from './controllers/ping';
import diagnoseRouter from './controllers/diagnose';
import patientRouter from './controllers/patient';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

app.use('/api/ping',pingRouter);
app.use('/api/diagnoses',diagnoseRouter);
app.use('/api/patients',patientRouter);

export default app;