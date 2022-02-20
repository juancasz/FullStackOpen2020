import React from "react";
import { Modal,Dropdown,Segment,DropdownProps } from 'semantic-ui-react';
import { Entry, TypeEntry} from '../types';
import { EntryTypeOption } from "./FormField";
import { AddHospitalEntryForm ,HospitalEntryFormValues} from "./AddHospitalEntryForm";
import { AddHealthCheckEntryForm,HealthCheckEntryFormValues } from "./AddHealthCheckEntryForm";
import { OccupationalHealthCareEntryFormValues } from "./AddOccupationalHealthCareEntry";

export interface NewEntryPayload {
  entry: Entry
  patientId: string
}

export type NewEntryFormValue = HealthCheckEntryFormValues | HospitalEntryFormValues| OccupationalHealthCareEntryFormValues;

interface PropsType{
  type: TypeEntry|undefined
}

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    error?:string;
    submitNewEntry: (values: NewEntryFormValue) => void;
    entryOptions: EntryTypeOption[];
    handleChangeType: ( _event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>void ;
    type: TypeEntry|undefined
}

const AddEntryModal = ({submitNewEntry,error,modalOpen, onClose,entryOptions ,handleChangeType,type}: Props) => {

    const TypeForm = ({type}:PropsType) => {
      switch(type){
        case TypeEntry.HealthCheck:
          return <AddHealthCheckEntryForm onSubmit={submitNewEntry} onCancel={onClose}/>;
        case TypeEntry.Hospital:
          return <AddHospitalEntryForm  onSubmit={submitNewEntry} onCancel={onClose}/>;
        case TypeEntry.OccupationalHealthcare:
          return <div>OccupationalHealthcare</div>;
        default:
          return <></>;
      }
    };

    return(
      <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
          <Dropdown
            placeholder='select entry type'
            fluid
            selection
            options={entryOptions}
            onChange={handleChangeType}
            style={{marginBottom: "1rem"}}
          />
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <TypeForm type={type}/>
        </Modal.Content>
      </Modal>
    );
};

export default AddEntryModal;