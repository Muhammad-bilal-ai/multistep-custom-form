import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schemas for each step
const validationSchema = [
  Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  }),
  Yup.object({
    university: Yup.string().required("University is required"),
    degree: Yup.string().required("Degree is required"),
  }),
];

// Initial values for the form fields
const initialValues = {
  firstName: "",
  lastName: "",
  university: "",
  degree: "",
};

// Individual steps as components
const StepOne = () => (
  <>
    <Field name="firstName" type="text" placeholder="First Name" />
    <ErrorMessage name="firstName" />
    <Field name="lastName" type="text" placeholder="Last Name" />
    <ErrorMessage name="lastName" />
  </>
);

const StepTwo = () => (
  <>
    <Field name="university" type="text" placeholder="University" />
    <ErrorMessage name="university" />
    <Field name="degree" type="text" placeholder="Degree" />
    <ErrorMessage name="degree" />
  </>
);

const Review = ({ values }) => (
  <>
    <p>First Name: {values.firstName}</p>
    <p>Last Name: {values.lastName}</p>
    <p>University: {values.university}</p>
    <p>Degree: {values.degree}</p>
  </>
);

// The multi-step form component
const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const handleSubmit = (values, actions) => {
    if (step < validationSchema.length - 1) {
      setStep(step + 1);
    } else {
      // Handle final form submission here
      console.log(values);
    }
    actions.setSubmitting(false);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[step]}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          {step === 0 && <StepOne />}
          {step === 1 && <StepTwo />}
          {step === 2 && <Review values={values} />}
          {step > 0 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          <button type="submit">
            {step === validationSchema.length - 1 ? "Submit" : "Next"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
