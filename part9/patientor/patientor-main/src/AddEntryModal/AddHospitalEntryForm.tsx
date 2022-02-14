import React from "react";
import { HospitalEntry,Discharge } from "../types";
import { Field, Formik, Form } from "formik";
import { TextField,DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

export type HospitalEntryFormValues = Omit<HospitalEntry,"id"> ;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnosis }] = useStateValue();
    return(
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                discharge: {} as Discharge,
            }}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return(
                    <Form className="form ui">
                        <Field
                            label="description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection            
                            setFieldValue={setFieldValue}            
                            setFieldTouched={setFieldTouched}            
                            diagnoses={Object.values(diagnosis)}          
                        />   
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                                >
                                Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>

    );
};

