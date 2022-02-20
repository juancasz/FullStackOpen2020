import React from "react";
import { Field, Formik, Form } from "formik";
import { OccupationalHealthcareEntry, SickLeave } from "../types";
import { useStateValue } from "../state";
import { TextField,DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";

export type OccupationalHealthCareEntryFormValues = Omit<OccupationalHealthcareEntry,"id"> ;

interface Props {
    onSubmit: (values: OccupationalHealthCareEntryFormValues) => void;
    onCancel: () => void;
}

export const AddOccupationalHealthCareEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnosis }] = useStateValue();
    return(
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {} as SickLeave
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                  errors.description = requiredError;
                }
                if (!values.date) {
                  errors.date = requiredError;
                }
                if (!values.specialist) {
                  errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.dateDischarge = requiredError;
                }
                return errors;
            }}
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
                        <Field
                            label="dateDischarge"
                            placeholder="YYYY-MM-DD"
                            name="sicLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="dateDischarge"
                            placeholder="YYYY-MM-DD"
                            name="sicLeave.endDate"
                            component={TextField}
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