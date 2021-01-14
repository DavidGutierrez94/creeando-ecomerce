import React from "react";
import { BrandNav } from "../../../components/nav/brand-nav";
import { BrandProductCreateForm } from "../../../components/forms/BrandProductCreateForm"
export const ProductCreateBrand = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <BrandNav />
        </div>
        <div className="col-md-10">
          <h4>Crear Producto</h4>
          <div className="p-3">
            {/*  <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            /> */}
          </div>
          <div className="container-fluid">
            <BrandProductCreateForm/>
          </div>
        </div>
      </div>
    </div>
  );
};
