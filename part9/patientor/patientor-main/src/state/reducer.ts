import { State } from "./state";
import { Diagnosis, Patient} from "../types";
import { NewEntryPayload } from "../AddEntryModal";

export const setPatientList = (payload:Patient[]):Action => {
  return(
    {
      type: "SET_PATIENT_LIST",
      payload: payload
    }
  );
};

export const setDiagnosisList = (payload:Diagnosis[]):Action => {
  return(
    {
      type: "SET_DIAGNOSIS_LIST",
      payload: payload
    }
  );
};

export const addPatient = (payload:Patient):Action => {
  return(
    {
      type: "ADD_PATIENT",
      payload: payload
    }
  );
};

export const addEntry = (payload:NewEntryPayload):Action => {
  return(
    {
      type: "ADD_ENTRY",
      payload: payload
    }
  );
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: NewEntryPayload;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      let patient: Patient =  state.patients[action.payload.patientId];
      console.log(state);
      if (patient.entries){
        patient.entries.push(action.payload.entry);
      }else{
        patient = {...patient,entries: [action.payload.entry]};
      }
      const finalState = {
        ...state,
        patients:{
          ...state.patients,
          [action.payload.patientId]:patient
        }
      };
      console.log(finalState);
      return {
        ...state,
        patients:{
          ...state.patients,
          [action.payload.patientId]:patient
        }
      };
    default:
      return state;
  }
};
