import React, {useState, useEffect} from "react";
// Forms and validation
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FormInput } from "../forms/form-input";
import { FormSelect } from "../forms/form-select";
// api
import { getCategories, getCategorySubs } from "../../functions/category"

export const BrandProductCreateForm = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCat] = useState([]);

useEffect(() => {
    getCategories().then(list=>{
        console.log("las categorias", list)
    })
    getCategorySubs("5fffcbdf86b8901834114423").then(list=>{
        console.log("las subca", list)
    })
}, [])

  const initialVal = {
    title: "",
    description: "",
    price: "",
    shipping: "",
    quantity: ""
  };

  const schema = yup.object().shape({
    title: yup.string().required("Campo requerido"),
    description: yup.string().required("Campo requerido"),
    price: yup
      .number()
      .min(0, "Debe ingresar un precio valido")
      .required("Debe ingresar un precio"),
    shipping: yup.string().required("Debe seleccionar una opcion"),
    quantity: yup
      .number()
      .min(0, "Debe ingresar una cantidad valida")
      .required("Debe ingresar una cantidad"),
  });

  return (
    <Formik initialValues={initialVal} validationSchema={schema}>
      {({}) => (
        <Form>
          <FormInput formType="text" formName="title" label="Nombre" />
          <FormInput
            formType="text"
            formName="description"
            label="Descripción"
          />
          <FormInput formType="number" formName="price" label="Precio" />
          <FormSelect
            formName="shipping"
            label="Envío Aliados Mensajeros Urbanos"
          />
          <FormInput formType="number" formName="quantity" label="Cantidad" />
          <FormSelect formName="color" label="Color" />
          <FormSelect formName="size" label="Talla" />
          <FormSelect formName="category" label="Categoría" />
        </Form>
      )}
    </Formik>
  );
};
