import React from "react";
import { Field, ErrorMessage } from "formik";

export const FormSelect = ({ formName, label, list }) => (
  <div className="form-group">
    <label htmlFor={formName}>{label}</label>
    <Field as="select" name={formName} id={formName} className="form-control">
      <option defaultValue>Seleccionar...</option>
      {list &&
        list.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
    </Field>
    <small className="form-text text-warning">
      <ErrorMessage name={formName} />
    </small>
  </div>
);
