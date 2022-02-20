import axios from "axios";
import React from "react";
import { apiBaseUrl } from "../constants";
import { addPatient, setDiagnosisList, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient,TypeEntry } from "../types";
import { Gender } from "../types";
import { Message,Icon,Button,DropdownProps } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { NewEntryFormValue } from "../AddEntryModal";
import { NewEntryPayload } from "../AddEntryModal";
import { addEntry } from "../state";
import { EntryTypeOption } from "../AddEntryModal/FormField";


const PatientInfoPage = () => {
    const [{ patients,diagnosis }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const[patient,setPatient] = React.useState<Patient|undefined>(undefined);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setType(undefined);
      setError(undefined);
    };

    const entryOptions: EntryTypeOption[] = [
        {key: TypeEntry.Hospital, text:TypeEntry.Hospital,value:TypeEntry.Hospital},
        {key: TypeEntry.HealthCheck, text:TypeEntry.HealthCheck,value:TypeEntry.HealthCheck},
        {key: TypeEntry.OccupationalHealthcare, text:TypeEntry.OccupationalHealthcare,value:TypeEntry.OccupationalHealthcare}
    ];

    const [type, setType] = React.useState<TypeEntry|undefined>(undefined);

    const handleChangeType = (    
      _event: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
    ) => {
      setType(data.value as TypeEntry);
    };
      

    const submitNewEntry = async (values: NewEntryFormValue) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          const newEntryAction :NewEntryPayload = {entry: newEntry,patientId:id};
          dispatch(addEntry(newEntryAction));
          closeModal();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e:any) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
    };

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
    },[patients]);

    React.useEffect(() => {
        const getDiagnosisList = async () => {
            const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
            );
            dispatch(setDiagnosisList(diagnosisListFromApi));
        };
        if (Object.keys(diagnosis).length===0){
            void getDiagnosisList();
        }
    },[dispatch]);
    
    if(!patient){
        return(
            <div></div>
        );
    }

    const Entries = () => {
       if(patient.entries && patient.entries.length>0){
           return(
               <div>
                    <h3>entries</h3>
                    {patient.entries.map((entry:Entry) => {
                        switch (entry.type){
                            case "Hospital":
                                return (
                                    <Message>
                                        <p>{entry.date}   <Icon name='hospital' size="big"/></p>
                                        <p>{entry.description}</p>
                                        <ul>
                                            {entry.diagnosisCodes?.map((code) => (
                                                <li key={code}>{code} {diagnosis[code]?diagnosis[code].name:""}</li>
                                            ))}
                                        </ul>
                                        <Icon name='heart' color='red'/>
                                    </Message>
                                );
                            case "OccupationalHealthcare":
                                return (
                                    <Message>
                                        <p>{entry.date} <Icon name='factory' size="big"/></p>
                                        <p>{entry.description}</p>
                                        <ul>
                                            {entry.diagnosisCodes?.map((code) => (
                                                <li key={code}>{code} {diagnosis[code]?diagnosis[code].name:""}</li>
                                            ))}
                                        </ul>
                                        <Icon name='heart' color='green'/>
                                    </Message>
                                );
                            case "HealthCheck":
                                return (
                                    <Message>
                                        <p>{entry.date} <Icon name='fork' size="big"/></p>
                                        <p>{entry.description}</p>
                                        <ul>
                                            {entry.diagnosisCodes?.map((code) => (
                                                <li key={code}>{code} {diagnosis[code]?diagnosis[code].name:""}</li>
                                            ))}
                                        </ul>
                                        <Icon name='heart' color='blue'/>
                                    </Message>
                                );
                            default:
                                return <></>;
                        }
                    })}
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
            <AddEntryModal
                modalOpen={modalOpen}
                onClose={closeModal}
                error={error}
                submitNewEntry={submitNewEntry}
                entryOptions={entryOptions}
                handleChangeType={handleChangeType}
                type={type}
            />
            <Button style={{marginTop: "1rem"}} onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientInfoPage;