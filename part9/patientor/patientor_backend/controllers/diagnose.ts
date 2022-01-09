import  { Router } from 'express';
import { getAllDiagnoses } from '../services/diagnose';

const diagnoseRouter = Router();

diagnoseRouter.get('/', (_req, res) => {
    res.send(getAllDiagnoses());
});

export default diagnoseRouter;