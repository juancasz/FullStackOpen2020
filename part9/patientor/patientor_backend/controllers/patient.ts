import  { Router } from 'express';
import { NewPatient, PublicPatient } from '../models/types';
import patientService from '../services/patient';
import toNewPatientEntry from '../utils/utils';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getAllPublicPatients());
});

patientRouter.post('/', (req, res) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient : NewPatient = toNewPatientEntry(req.body);

        const addedPatient:PublicPatient = patientService.AddNewPatient(newPatient);
        res.status(201).send(addedPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
        res.status(400).send(e.message);
    }
});

patientRouter.get('/:id',(req,res) => {
    const patientInfo = patientService.getPatientInfo(req.params.id);
    if (patientInfo === undefined){
        res.status(404).send("patient not found"); 
    }
    res.status(200).send(patientInfo);
});

export default patientRouter;