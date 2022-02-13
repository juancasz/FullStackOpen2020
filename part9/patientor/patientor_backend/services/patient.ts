/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v4 as uuidv4} from 'uuid';
import patientsData from "../data/patients";
import { PublicPatient,NewPatient,Patient,Entry, NewEntry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "../models/types";

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

const addPatientEntry = (patientId:string ,newEntry: NewEntry): Entry => {
    const index =patientsData.findIndex(patient => patient.id === patientId);

    if (index === -1){
        throw new Error("Patient not found");
    }

    var newEntryObj: Entry;

    switch(newEntry.type){
        case "HealthCheck":
            newEntryObj = {...newEntry,id: uuidv4()} as HealthCheckEntry;
            break;
        case "Hospital":
            newEntryObj = {...newEntry,id: uuidv4()} as HospitalEntry;
            break;
        case "OccupationalHealthcare":
            newEntryObj = {...newEntry,id: uuidv4()} as OccupationalHealthcareEntry;
            break;
        default:
            throw new Error("Invalid type entry");
    }

    const updatedPatient = patientsData[index];
    updatedPatient.entries.push(newEntryObj);
    patientsData[index] = updatedPatient;

    return newEntryObj;
};

export default {
    getAllPublicPatients,
    AddNewPatient,
    getPatientInfo,
    addPatientEntry
};