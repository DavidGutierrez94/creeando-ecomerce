import React, { useState } from "react";
import { ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import axios from "axios";
import { removeImageBack, resizeImageAndUpload } from "../../helpers/upload-image";

export const FormImage = ({ setField, formName, label }) => {
  const [picture, setPicture] = useState();
  const { user } = useSelector((state) => ({ ...state }));

  const callbackHandle = (imageData) => {
    setPicture(imageData)
    setField(formName, imageData);
  }
  const handlePic = async (mode) => {
    await resizeImageAndUpload(mode, callbackHandle, user && user.token)
    
  };
  const handleRemovePic = async () => {
    await removeImageBack(picture.url, callbackHandle, user && user.token)

  };
  return (
    <div className="form-group">
      {picture && (
        <div className="container">
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleRemovePic}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Avatar
            src={picture.url}
            // className="img-thumbnail"
            size={100}
                shape="square"
                className="ml-3"
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
