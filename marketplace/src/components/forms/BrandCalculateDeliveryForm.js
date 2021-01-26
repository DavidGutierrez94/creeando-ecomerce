import React, { useState, useEffect } from "react";
// Forms and validation
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
// api
import { useSelector } from "react-redux";
import { calculateDeliveryBrand } from "../../functions/calculate";

const cities = [
  { value: 1, text: "Bogotá D.C.", }];

const roundtrip = [
  { value: 0, text: "solo ida" },
{ value: 1, text: "ida y vuelta" }]


export const BrandCalculateDeliveryForm = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const initialVal = {
    price: 0,
    city: 1,
    coordinates: [],
    addressInitial: "Cra 7 #120-20",
    addressFinish: "calle 19b#6b",
    roundtrip: 0,
  };

  const handleSubmit = (values) => {
    const {addressInitial, addressFinish, ...rest} = values;
    rest.coordinates=[{
      "type": "0",
      "address": addressInitial,
      "city": "bogota"
    },
    {
      "type": "1",
      "address": addressFinish,
      "city": "bogota"
    }]
    if(rest.coordinates.length <= 1){
      return toast.error('necesitas completar las direcciones');
    }
    console.log(rest)
    calculateDeliveryBrand(rest, user.token)
      .then((res) => {
        const {data: dataEndpoint} = res;
        console.log(dataEndpoint);
        toast.success(dataEndpoint.data.total_service);

        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const schema = yup.object().shape({
    price: yup.number().required("Campo requerido"),
    city: yup.number().required("Campo requerido"),
    roundtrip: yup.number().required("Campo requerido"),
    addressInitial: yup.string().required("Campo requerido"),
    addressFinish: yup.string().required("Campo requerido"),
  });

  return (
    <Formik initialValues={initialVal} validationSchema={schema} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form>
          <FormInput formType="number" formName="price" label="Precio" />
          <FormSelect
            formName="city"
            label="ciudades"
            disabled
            list={cities}
          />
          <FormSelect
            formName="roundtrip"
            label="Tipo de viaje"
            disabled
            list={roundtrip}
          />
          <FormInput formType="text" formName="addressInitial" label="Direccion 1" />
          <FormInput formType="text" formName="addressFinish" label="Direccion 2" />

          <button type="submit" className="btn btn-outline-info">Calcular</button>
        </Form>
      )}
    </Formik>
  );
};
