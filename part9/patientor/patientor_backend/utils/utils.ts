import { NewPatient,Gender } from "../models/types";

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

const toNewPatientEntry = ({name,dateOfBirth,ssn,gender,occupation}:Fields):NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };

    return newPatient;
};

const parseString = (name: unknown):string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing name');
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

export default toNewPatientEntry;

