import React, {useState, useEffect} from "react";
// Forms and validation
import {Formik, Form, ErrorMessage} from "formik";
import * as yup from "yup";
import {toast} from "react-toastify";
import {FormInput} from "../forms/form-input";
import {FormSelect} from "../forms/form-select";
import {FormImage} from "../forms/form-image";
// api
import {getCategories, getCategorySubs} from "../../functions/category";
import {createProductBrand} from "../../functions/product";
import {useSelector} from "react-redux";

const colors = [
    {
        value: "Rojo",
        text: "Rojo"
    },
    {
        value: "Azul",
        text: "Azul"
    },
    {
        value: "Verde",
        text: "Verde"
    },
    {
        value: "Amarillo",
        text: "Amarillo"
    }, {
        value: "Blanco",
        text: "Blanco"
    }, {
        value: "Negro",
        text: "Negro"
    }, {
        value: "otro",
        text: "otro"
    }
];

const size = [
    {
        value: "Única",
        text: "Única"
    },
    {
        value: "XS",
        text: "XS"
    },
    {
        value: "S",
        text: "S"
    },
    {
        value: "M",
        text: "M"
    }, {
        value: "L",
        text: "L"
    }, {
        value: "XL",
        text: "XL"
    }
]


export const BrandProductCreateForm = ({handleSubmit, setValues, values, inv, handleInv}) => {
    const {user} = useSelector((state) => ({
        ...state
    }));
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCat] = useState([]);
    const [inventario, setInventario] = useState([{color: "ROJO", size: "XL", num: 10}])
    const [que, setQue] = useState({})


    useEffect(() => {
        getCategories().then((list) => {
            setCategories(list.data.map((item) => ({value: item._id, text: item.name})));
        });
    }, []);

    const getSubCats = (idcat) => {
        getCategorySubs(idcat).then((list) => {
            setSubCat(list.data.map((item) => ({value: item._id, text: item.name})));
        });
    };

    const initialVal = {
        title: "",
        description: "",
        price: "",
        shipping: "",
        quantity: "",
        category: "",
        subcategory: ""
    };


    const schema = yup.object().shape({ /* title: yup.string().required("Campo requerido"),
    description: yup.string().required("Campo requerido"),
    price: yup
      .number()
      .min(0, "Debe ingresar un precio valido")
      .required("Debe ingresar un precio"),
    shipping: yup.string().required("Debe seleccionar una opcion"),
    quantity: yup
      .number()
      .min(0, "Debe ingresar una cantidad valida")
      .required("Debe ingresar una cantidad"), */
    });

    return (

        <form style={
                {
                    display: "flex",
                    flexDirection: "column"
                }
            }
            onSubmit={handleSubmit}>

            <input className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                placeholder="Nombre"
                label="Nombre"
                onChange={
                    (e) => setValues({
                        ...values,
                        title: e.target.value
                    })
                }/>
            <input className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                placeholder="Descripción"
                label="Nombre"
                onChange={
                    (e) => setValues({
                        ...values,
                        description: e.target.value
                    })
                }/>
            <input className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                placeholder="Precio"
                label="Nombre"
                onChange={
                    (e) => setValues({
                        ...values,
                        price: e.target.value
                    })
                }/>
            <select className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                onChange={
                    (e) => setValues({
                        ...values,
                        shipping: e.target.value
                    })
            }>
                <option>Envío Aliados Mensajeros Urbanos y Coordinadora</option>
                <option value="Yes">Si</option>

                <option value="No">No</option>
            </select>

            <select className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                onChange={
                    (e) => {
                        setValues({
                            ...values,
                            category: e.target.value
                        })
                        getSubCats(e.target.value);
                    }
            }>
                <option>Categoría</option>
                {
                categories.map((item, i) => <option key={i}
                    value={
                        item.value
                }>
                    {
                    item.text
                }</option>)
            } </select>
            <select className="form-control mr-sm-2"
                style={
                    {margin: 10}
                }
                onChange={
                    (e) => setValues({
                        ...values,
                        subcategory: e.target.value
                    })
            }>
                <option>Sub Categorías</option>
                {
                subCategories.map((item, i) => <option key={i}
                    value={
                        item.value
                }>
                    {
                    item.text
                }</option>)
            } </select>
            {/*
          <FormInput formType="number" formName="quantity" label="Cantidad" />
          <FormSelect formName="color" label="Color" list={colors} />
          <FormSelect formName="size" label="Talla" list={size} />
          <div className="form-group">
            <label htmlFor="category"></label>
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
          /> */}
            <p>Rellena tu inventario</p>
            <div style={
                {display: "flex"}
            }>
                <select className="form-control mr-sm-2"
                    style={
                        {margin: 10}
                    }
                    onChange={
                        (e) => setQue({
                            ...que,
                            color: e.target.value
                        })
                }>
                    <option>Selecciona un color</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Azul">Azul</option>
                    <option value="Verde">Verde</option>
                    <option value="Amarillo">Amarillo</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Negro">Negro</option>

                </select>
                <select className="form-control mr-sm-2"
                    style={
                        {margin: 10}
                    }
                    onChange={
                        (e) => setQue({
                            ...que,
                            size: e.target.value
                        })
                }>
                    <option>Selecciona una talla</option>
                    <option value="Única">Única</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>

                </select>
                <input className="form-control mr-sm-2"
                    style={
                        {margin: 10}
                    }
                    placeholder="Cantidad"
                    label="Nombre"
                    onChange={
                        (e) => setQue({
                            ...que,
                            num: e.target.value
                        })
                    }/>
                <button type="button"
                    onClick={
                        () => {
                          let ta = inv
                          ta.push(que)
                          console.log(ta)
                          console.log(inventario)
                          setInventario(ta)
                          handleInv(ta)
                        }
                    }
                    className="btn btn-outline-info">Añadir</button>
            </div>
              {
                inv.map((item,i)=>(
                    <div style={{display:"flex", margin: 5, borderBottom:"1px solid rgb(164, 164, 164)"}} key={i} >
                      <p style={{margin: 10}} >Color: {item.color}</p>
                      <p style={{margin: 10}} >Talla: {item.size}</p>
                      <p style={{margin: 10}}>Cantidad: {item.num}</p>
                    </div>
                  )
                )
              }
            <button type="submit" className="btn btn-outline-info">Guardar</button>
        </form>

    );
};
