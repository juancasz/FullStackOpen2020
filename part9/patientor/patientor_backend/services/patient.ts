/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v4 as uuidv4} from 'uuid';
import patientsData from "../data/patients";
import { PublicPatient,NewPatient,Patient,Entry } from "../models/types";

const getAllPublicPatients = (): PublicPatient[] => {
    const publicPatientsData:PublicPatient[] = patientsData.map(
        ({id,name,dateOfBirth,gender,occupation}) => ({id,name,dateOfBirth,gender,occupation})
    );
    
    return publicPatientsData;
};

const AddNewPatient = (patient:NewPatient): PublicPatient => {
    const patientObj = {...patient,id: uuidv4()} ;
    patientsData.push({...patientObj,entries: <Entry[]>[]});
    return patientObj;
};

const getPatientInfo = (id: string ): Patient|undefined => {
   const patient = patientsData.find(patient => patient.id === id);
   return patient;
};

export default {
    getAllPublicPatients,
    AddNewPatient,
    getPatientInfo
};