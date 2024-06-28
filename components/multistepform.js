// MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveFormData } from "./firebase";

const validationSchema = [
  Yup.object({
    position: Yup.string().required("Position is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
  Yup.object({
    university: Yup.string().required("University is required"),
    degree: Yup.string().required("Degree is required"),
    graduationYear: Yup.number().required("Graduation year is required"),
  }),
  Yup.object({
    coverLetter: Yup.string().required("Cover letter is required"),
    resume: Yup.mixed().required("Resume is required"),
  }),
];

const initialValues = {
  position: "",
  firstName: "",
  lastName: "",
  email: "",
  university: "",
  degree: "",
  graduationYear: "",
  coverLetter: "",
  resume: null,
};

const StepOne = () => (
  <>
    <div className="mb-4">
      <label
        htmlFor="position"
        className="block text-sm font-medium text-gray-700"
      >
        Position
      </label>
      <Field
        name="position"
        as="select"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="">Select a position</option>
        <option value="Intern">Intern</option>
        <option value="Junior Developer">Junior Developer</option>
        <option value="Senior Developer">Senior Developer</option>
      </Field>
      <ErrorMessage
        name="position"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="firstName"
        className="block text-sm font-medium text-gray-700"
      >
        First Name
      </label>
      <Field
        name="firstName"
        type="text"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="firstName"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="lastName"
        className="block text-sm font-medium text-gray-700"
      >
        Last Name
      </label>
      <Field
        name="lastName"
        type="text"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="lastName"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <Field
        name="email"
        type="email"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="email"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  </>
);

const StepTwo = () => (
  <>
    <div className="mb-4">
      <label
        htmlFor="university"
        className="block text-sm font-medium text-gray-700"
      >
        University
      </label>
      <Field
        name="university"
        type="text"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="university"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="degree"
        className="block text-sm font-medium text-gray-700"
      >
        Degree
      </label>
      <Field
        name="degree"
        type="text"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="degree"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="graduationYear"
        className="block text-sm font-medium text-gray-700"
      >
        Graduation Year
      </label>
      <Field
        name="graduationYear"
        type="number"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="graduationYear"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  </>
);

const StepThree = () => (
  <>
    <div className="mb-4">
      <label
        htmlFor="coverLetter"
        className="block text-sm font-medium text-gray-700"
      >
        Cover Letter
      </label>
      <Field
        name="coverLetter"
        as="textarea"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="coverLetter"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="resume"
        className="block text-sm font-medium text-gray-700"
      >
        Resume
      </label>
      <input
        name="resume"
        type="file"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
      <ErrorMessage
        name="resume"
        component="div"
        className="text-red-600 text-sm mt-1"
      />
    </div>
  </>
);

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formValues, setFormvalues] = useState(initialValues);

  const handleNext = (values, actions) => {
    console.log(
      "handleNext is called values" + values + " and action: " + actions
    );
    console.log("current validationSchemes:", validationSchema[step]);
    setFormvalues({ ...formValues, ...values });
    if (step === validationSchema.length - 1) {
      // Submit the form
      onSubmit(values, actions);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = (values) => {
    switch (step) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo values={values} />;
      case 2:
        return <StepThree />;
      default:
        return <StepOne />;
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await saveFormData(values);
      setSubmitting(false);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Failed to submit application", error);
      setSubmitting(false);
      alert("Failed to submit application");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[step]}
      onSubmit={handleNext}
    >
      {({ isSubmitting, values }) => (
        <Form className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md">
          {renderStep(values)}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {step === validationSchema.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
