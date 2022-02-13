import { NewPatient,Gender,NewEntry, HealthCheckRating,Discharge, SickLeave,HealthCheckEntry,HospitalEntry,OccupationalHealthcareEntry } from "../models/types";

type Fields = {name: unknown,dateOfBirth: unknown,ssn: unknown,gender:unknown,occupation: unknown};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param:any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param:any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const toNewPatientEntry = ({name,dateOfBirth,ssn,gender,occupation}:Fields):NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
    };

    return newPatient;
};

const parseString = (name: unknown):string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing string');
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown) : Gender => {
    if (!gender || !isGender(gender)){
        throw new Error('Incorrect or missing weather: '+gender);
    }
    return gender;
};


type FieldsDischarge = {date:unknown,criteria:unknown};

type FieldsSickLeave = {startDate:unknown,endDate:unknown};

type FieldsNewEntry = {description:unknown,date:unknown,specialist:unknown,diagnosisCodes:unknown,healthCheckRating:unknown,employerName:unknown};

const parseTypeEntry = (type: unknown):"HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
    if(!type || !isString(type)){
        throw new Error('Incorrect or missing type');
    }

    if (type !== "HealthCheck" && type !== "Hospital" && type !== "OccupationalHealthcare"){
        throw new Error('Invalid type');
    }

    return type;
};

const parseDescriptionEntry = (description: unknown): string => {
    if(!description || !isString(description)){
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseSpecialistEntry = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseEmployerNameEntry = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const parseStringArray = (array: unknown) : string[]=>  {
    if (!Array.isArray(array)) {
        throw new Error('Invalid string array');
    }

    if (array.length > 0){
        array.forEach(item => {
            if (!isString(item)){
                throw new Error('Invalid string array');
            }
        })
    }

    return array;
};

const parseHealthCheckRating = (healthCheckRating : unknown) : HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)){
        throw new Error('Invalid Health Check Rating');
    }

    return healthCheckRating;
};

const parseDischarge = ({date,criteria}:FieldsDischarge):Discharge => {
    const newDischarge:Discharge = {
        date: parseDate(date),
        criteria: parseString(criteria)
    }
    return newDischarge;
};

const parseSickLeave = ({startDate,endDate}:FieldsSickLeave):SickLeave => {
    const newSickLeave: SickLeave ={
        startDate:parseDate(startDate),
        endDate:parseDate(endDate)
    } 

    return newSickLeave;
}


const toNewEntry = (typeEntry:"HealthCheck" | "Hospital" | "OccupationalHealthcare",{description,date,specialist,diagnosisCodes,healthCheckRating,employerName}:FieldsNewEntry, discharge: Discharge|undefined, sickLeave: SickLeave|undefined):NewEntry => {

    var diagnosisCodesEntry: string[]|undefined;

    if(diagnosisCodes){
        diagnosisCodesEntry = parseStringArray(diagnosisCodes);
    }

    switch(typeEntry){
        case "HealthCheck":

            const healthCheckEntry:Omit<HealthCheckEntry,"id"> = {
                type : "HealthCheck",
                description: parseDescriptionEntry(description),
                date: parseDate(date),
                specialist: parseSpecialistEntry(specialist),
                diagnosisCodes: diagnosisCodesEntry,
                healthCheckRating: parseHealthCheckRating(healthCheckRating),
            };

            return healthCheckEntry;

        case "Hospital":

            const hospitalEntry:Omit<HospitalEntry,"id"> = {
                type : "Hospital",
                description: parseDescriptionEntry(description),
                date: parseDate(date),
                specialist: parseSpecialistEntry(specialist),
                diagnosisCodes: diagnosisCodesEntry,
                discharge: discharge as Discharge,
            };

            return hospitalEntry;

        case "OccupationalHealthcare":
            const occupationalHealthcareEntry:Omit<OccupationalHealthcareEntry,"id"> = {
                type : "OccupationalHealthcare",
                description: parseDescriptionEntry(description),
                date: parseDate(date),
                specialist: parseSpecialistEntry(specialist),
                diagnosisCodes: diagnosisCodesEntry,
                sickLeave: sickLeave,
                employerName: parseEmployerNameEntry(employerName),
            };

            return occupationalHealthcareEntry;
        default:
            throw new Error('Invalid type');
    }
};

export default {
    toNewPatientEntry,
    toNewEntry,
    parseDischarge,
    parseSickLeave,
    parseTypeEntry
};

