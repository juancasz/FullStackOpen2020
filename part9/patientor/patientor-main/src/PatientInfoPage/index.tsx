import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { addPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { Gender } from "../types";

const PatientInfoPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const[patient,setPatient] = React.useState<Patient|undefined>(undefined);

    React.useEffect(() => {
        const getPatient = async (id:string) => {
            try{
                const{data: patientFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientFromApi);
                dispatch(addPatient(patientFromApi));
            }catch(e){
                console.error(e);
            }

        };
        const patient:Patient|undefined = Object.keys(patients).length===0?undefined:patients[id];

        if (!patient ){
            void getPatient(id);
        }else if(patient.ssn === undefined){
            void getPatient(id);
        }else{
            setPatient(patient);
        }
    },[dispatch]);
    
    if(!patient){
        return(
            <div></div>
        );
    }

    const Entries = () => {
       if(patient.entries){
           return(
               <div>
                    <h3>entries</h3>
                    {patient.entries.map((entry:Entry) => (
                        <div key={entry.id}>
                            <p>{entry.date} {entry.description}</p>
                            <ul>
                                {entry.diagnosisCodes?.map((code) => (
                                    <li key={code}>{code}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
               </div>
           );
       }

       return(
        <div></div>
       );
    };

    return(
        <div>
            <h2>
                {patient.name} <Icon 
                    name={
                        patient.gender === Gender.Male?
                            "mars":
                            patient.gender === Gender.Female?
                                "venus":
                                "venus mars"
                    }
                />
            </h2>
            <h3>ssn: {patient.ssn}</h3>
            <h3>occupation: {patient.occupation}</h3>
            <br/>
            <br/>
            <Entries/>
        </div>
    );
};

export default PatientInfoPage;