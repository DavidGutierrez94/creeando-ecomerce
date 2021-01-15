import React, { useState } from "react";
import { ErrorMessage } from "formik";

export const FormImage = ({ setField, formName, label }) => {
  const [picture, setPicture] = useState();

  const handlePic = (mode) => {
    setPicture(mode);
    setField(formName, mode);
  };
  return (
    <div className="form-group">
      {picture && (
        <div className="container">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => handlePic(null)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <img
            src={URL.createObjectURL(picture)}
            className="img-thumbnail"
            style={{ maxHeight: "400px" }}
          />
        </div>
      )}
      <label htmlFor={formName} className="btn btn-primary btn-raised mt-3">
        {label}
        <input
          type="file"
          name={formName}
          id={formName}
          className="form-control-file"
          onChange={(e) => handlePic(e.target.files[0])}
          hidden
          accept="images/*"
        />
      </label>
      <small className="form-text text-warning">
        <ErrorMessage name={formName} />
      </small>
    </div>
  );
};
