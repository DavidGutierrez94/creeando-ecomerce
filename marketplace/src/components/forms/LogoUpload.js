import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { Avatar, Badge } from "antd";

const LogoUpload = ({ values, setValues, setLoading }) => {


  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.logo;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadlogo`,
                { image: uri },
                {
                    headers:{},
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, logo: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleLogoRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removelogo`,
        { public_id },
        {
            headers:{},
        }
      )
      .then((res) => {
        setLoading(false);
        const { logo } = values;
        let filteredImages = logo.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, logo: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
     <div className="col">
        <label className="btn btn-primary btn-raised mt-3">
          Elegir archivo
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
    </div>
    <div className="col">
        {values.logo &&
          values.logo.map((logo) => (
            <Badge
              count="X"
              key={logo.public_id}
              onClick={() => handleLogoRemove(logo.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={logo.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
    </div>
    </>
  );
};

export default LogoUpload;
