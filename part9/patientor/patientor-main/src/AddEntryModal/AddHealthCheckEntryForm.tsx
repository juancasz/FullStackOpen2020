import React from "react";
import { HealthCheckEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { TextField,DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry,"id"> ;

interface Props {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnosis }] = useStateValue();
    return(
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0
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
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
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
                            label="health Check rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
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