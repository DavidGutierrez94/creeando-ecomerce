import React from "react";
import { BrandNav } from "../../../components/nav/brand-nav";
import { BrandCalculateDeliveryForm } from "../../../components/forms/BrandCalculateDeliveryForm";

export const CalculateDelivery = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <BrandNav />
        </div>
        <div className="col-md-10">
          <h4>Calcular Envio</h4>
          <div className="p-3">
          </div>
          <div className="container-fluid">
            <BrandCalculateDeliveryForm/>
          </div>
        </div>
      </div>
    </div>
  );
};
