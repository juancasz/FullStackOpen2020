export interface Diagnose{
    code:string,
    name:string,
    latin?:string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
//export interface Entry {}

export interface Patient{
    id:string,
    name:string,
    dateOfBirth:string,
    ssn:string,
    gender:Gender,
    occupation:string
    entries: Entry[]
}

export type PublicPatient = Omit<Patient,"ssn" | "entries">;

export type NewPatient = Omit<Patient,"id" | "entries">;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface BaseEntry {
    id:string,
    description:string,
    date:string,
    specialist:string,
    diagnosisCodes?:Array<Diagnose['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface Discharge {
    date:string;
    criteria: string
}

export interface HospitalEntry extends BaseEntry{
    type:"Hospital";
    discharge: Discharge;
}

export interface SickLeave{
    startDate: string;
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type:"OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

