import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";
import { Gender } from "../types";

const PatientInfoPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const getPatient = async (id:string) => {
            try{
                const{data: patientFromApi} = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({type:'ADD_PATIENT',payload:patientFromApi});
            }catch(e){
                console.error(e);
            }

        };
        const patient:Patient|undefined = Object.keys(patients).length===0?undefined:patients[id];

        if (!patient ){
            void getPatient(id);
        }else if(patient.ssn === undefined){
            void getPatient(id);
        }
    },[dispatch]);
    
    if(!patients[id]){
        return(
            <div>
                Not Found
            </div>
        );
    }

    return(
        <div>
            <h2>
                {patients[id].name} <Icon 
                    name={
                        patients[id].gender === Gender.Male?
                            "mars":
                            patients[id].gender === Gender.Female?
                                "venus":
                                "venus mars"
                    }
                />
            </h2>
            <h3>ssn: {patients[id].ssn}</h3>
            <h3>occupation: {patients[id].occupation}</h3>
        </div>
    );
};

export default PatientInfoPage;