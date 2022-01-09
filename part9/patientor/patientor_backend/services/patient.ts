/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v4 as uuidv4} from 'uuid';
import patientsData from "../data/patients";
import { PublicPatient,NewPatient } from "../models/types";

const publicPatientsData:PublicPatient[] = patientsData.map(
    ({id,name,dateOfBirth,gender,occupation}) => ({id,name,dateOfBirth,gender,occupation})
);

const getAllPublicPatients = (): PublicPatient[] => {
    return publicPatientsData;
};

const AddNewPatient = (patient:NewPatient): PublicPatient => {
    const patientObj = {...patient,id: uuidv4()} ;
    publicPatientsData.push(patientObj);
    return patientObj;
};

export default {
    getAllPublicPatients,
    AddNewPatient
};