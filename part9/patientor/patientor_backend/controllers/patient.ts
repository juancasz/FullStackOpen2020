import  { Router } from 'express';
import { getAllPublicPatients } from '../services/patient';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    res.send(getAllPublicPatients());
});

export default patientRouter;