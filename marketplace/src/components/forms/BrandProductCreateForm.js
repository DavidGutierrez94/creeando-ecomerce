import React, { useState, useEffect } from "react";
// Forms and validation
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FormInput } from "../forms/form-input";
import { FormSelect } from "../forms/form-select";
import { FormImage } from "../forms/form-image";
// api
import { getCategories, getCategorySubs } from "../../functions/category";
import { createProductBrand } from "../../functions/product";
import { useSelector } from "react-redux";

const colors = [
  { value: "Rojo", text: "Rojo", },
  { value: "Azul", text: "Azul" },
  { value: "Verde", text: "Verde" },
  { value: "Amarillo", text: "Amarillo" },
  { value: "Blanco", text: "Blanco" },
  { value: "Negro", text: "Negro" },
  { value: "otro", text: "otro" }];

const size = [
  { value: "Única", text: "Única" },
{ value: "XS", text: "XS" },
{ value: "S", text: "S" },
{ value: "M", text: "M" },
{ value: "L", text: "L" },
{ value: "XL", text: "XL" }]


export const BrandProductCreateForm = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCat] = useState([]);

  useEffect(() => {
    getCategories().then((list) => {
      setCategories(
        list.data.map((item) => ({
          value: item._id,
          text: item.name,
        }))
      );
    });
  }, []);

  const getSubCats = (idcat) => {
    getCategorySubs(idcat).then((list) => {
      setSubCat(
        list.data.map((item) => ({
          value: item._id,
          text: item.name,
        }))
      );
    });
  };

  const initialVal = {
    title: "",
    description: "",
    price: "",
    shipping: "",
    quantity: "",
    picture: null,
    category: "",
    subcategory: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    createProductBrand(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" se ha creado.`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
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
    <Formik initialValues={initialVal} validationSchema={schema} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form>
          <FormImage
            setField={setFieldValue}
            formName="picture"
            label="Elegir archivo"
          />
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
            list={[{ value: 'No', text: 'No' }, { value: 'Yes', text: 'Si' }]}
          />
          <FormInput formType="number" formName="quantity" label="Cantidad" />
          <FormSelect formName="color" label="Color" list={colors} />
          <FormSelect formName="size" label="Talla" list={size} />
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              name="category"
              id="category"
              className="form-control"
              onChange={(e) => {
                setFieldValue("category", e.target.value);
                getSubCats(e.target.value);
              }}
            >
              <option defaultValue>Seleccionar...</option>
              {categories &&
                categories.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.text}
                  </option>
                ))}
            </select>
            <small className="form-text text-warning">
              <ErrorMessage name="category" />
            </small>
          </div>
          <FormSelect
            formName="subcategory"
            label="Sub Categorías"
            list={subCategories}
          />
          <button type="submit" className="btn btn-outline-info">Guardar</button>
        </Form>
      )}
    </Formik>
  );
};
