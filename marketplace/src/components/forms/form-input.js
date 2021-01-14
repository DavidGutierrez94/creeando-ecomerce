import React from "react";
import { Field, ErrorMessage } from "formik";

export const FormInput = ({ formType, formName, label }) => (
  <div className="form-group">
    <label htmlFor={formName}>{label}</label>
    <Field
      type={formType}
      name={formName}
      id={formName}
      className="form-control"
    />
    <small className="form-text text-warning">
      <ErrorMessage name={formName} />
    </small>
  </div>
);
