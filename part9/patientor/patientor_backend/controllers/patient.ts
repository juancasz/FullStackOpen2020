import  { Router } from 'express';
import { NewPatient, PublicPatient,Entry, Discharge, SickLeave } from '../models/types';
import patientService from '../services/patient';
import utils from '../utils/utils';

const patientRouter = Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getAllPublicPatients());
});

patientRouter.post('/', (req, res) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient : NewPatient = utils.toNewPatientEntry(req.body);

        const addedPatient:PublicPatient = patientService.AddNewPatient(newPatient);
        res.status(201).send(addedPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
        res.status(400).send({error:e.message});
    }
});

patientRouter.get('/:id',(req,res) => {
    const patientInfo = patientService.getPatientInfo(req.params.id);
    if (patientInfo === undefined){
        res.status(404).send("patient not found"); 
    }
    res.status(200).send(patientInfo);
});

patientRouter.post('/:id/entries',(req,res) => {
    try{
        const type = utils.parseTypeEntry(req.body.type);
        let discharge:Discharge|undefined;
        let sickLeave:SickLeave|undefined;

        switch(type){
            case "Hospital":
                if (!req.body.discharge){
                    throw new Error("missing field discharge")
                }else{
                    discharge = utils.parseDischarge(req.body.discharge)
                }
                break;
            case "OccupationalHealthcare":
                if (!req.body.sickLeave){
                    throw new Error("missing field sickLeave")
                }else{
                    sickLeave = utils.parseSickLeave(req.body.sickLeave)
                }
                break;
        }

        const newEntry = utils.toNewEntry(type,req.body,discharge,sickLeave);

        const addedEntry:Entry = patientService.addPatientEntry(req.params.id,newEntry);

        res.status(201).send(addedEntry);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
        res.status(400).send({error:e.message});
    }
});

export default patientRouter;