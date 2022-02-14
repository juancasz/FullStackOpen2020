import React from "react";
import { Modal,Dropdown,DropdownProps } from 'semantic-ui-react';
import { TypeEntry} from '../types';
import { EntryTypeOption } from "./FormField";
import { AddHospitalEntryForm ,HospitalEntryFormValues} from "./AddHospitalEntryForm";

const entryOptions: EntryTypeOption[] = [
  {key: TypeEntry.Hospital, text:TypeEntry.Hospital,value:TypeEntry.Hospital},
  {key: TypeEntry.HealthCheck, text:TypeEntry.HealthCheck,value:TypeEntry.HealthCheck},
  {key: TypeEntry.OccupationalHealthcare, text:TypeEntry.OccupationalHealthcare,value:TypeEntry.OccupationalHealthcare}
];

interface PropsType{
  type: TypeEntry|undefined
}


interface Props {
    modalOpen: boolean;
    onClose: () => void;
}

const AddEntryModal = ({modalOpen, onClose }: Props) => {
    const [type, setType] = React.useState<TypeEntry|undefined>(undefined);

    const handleChangeType = (    
      _event: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
    ) => {
      setType(data.value as TypeEntry);
    };

    const submitHospitalEntry = (values: HospitalEntryFormValues) => {
      console.log(values);
    };

    const TypeForm = ({type}:PropsType) => {
      switch(type){
        case TypeEntry.HealthCheck:
          return <div>HealthCheck</div>;
        case TypeEntry.Hospital:
          return <AddHospitalEntryForm onSubmit={submitHospitalEntry} onCancel={onClose}/>;
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
          />
          <TypeForm type={type}/>
        </Modal.Content>
      </Modal>
    );
};

export default AddEntryModal;