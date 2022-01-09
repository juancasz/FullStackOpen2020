import patientsData from "../data/patients";
import { PublicPatient } from "../models/types";

const publicPatientsData:PublicPatient[] = patientsData.map(
    ({id,name,dateOfBirth,gender,occupation}) => ({id,name,dateOfBirth,gender,occupation})
);

export const getAllPublicPatients = (): PublicPatient[] => {
    return publicPatientsData;
};