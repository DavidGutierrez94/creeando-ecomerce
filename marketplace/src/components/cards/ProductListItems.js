import React, { useState } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useEffect } from "react";

const ProductListItems = ({ product, available }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    size,
    quantity,
    sold,
  } = product;

  const [state, setState] = useState()
  const [qua, setQua] = useState(product?.quantity[0]?.num)

  useEffect(()=>{
    setState({
      color: product?.quantity[0]?.color,
      size: product?.quantity[0]?.size
    })
    setQua(product?.quantity[0]?.num)
    console.log("hola")
  },[product])

  

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Precio{" "}
        <span className="label label-default label-pill pull-xs-right">
          {<NumberFormat value={price} displayType="text" thousandSeparator="." decimalSeparator="," prefix="$" />}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Categoría{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categorías
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Envío{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      
      <div style={
                {display: "flex"}
            }>
                <select className="form-control mr-sm-2"
                    style={
                        {margin: 10}
                    }
                    value={state?.color}
                    onChange={(e)=>setState({...state, color: e.target.value})}
                   >
                    <option>Selecciona un color</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Azul">Azul</option>
                    <option value="Verde">Verde</option>
                    <option value="Amarillo">Amarillo</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Negro">Negro</option>

                </select>
                <select 
                value={state?.size} 
                className="form-control mr-sm-2"
                    style={
                        {margin: 10}
                    }
                    onChange={(e)=>setState({...state, size: e.target.value})}
                    >
                    <option>Selecciona una talla</option>
                    <option value="Única">Única</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>

                </select>
                <button type="button"
                    onClick={
                        () => {
                          let tv = 0
                          quantity.map((item, i)=>{
                            if(item.color === state.color && item.size === state.size){
                              tv = item.num
                            }
                          })
                          setQua(tv)
                          available(tv)
                        }
                    }
                    className="btn btn-outline-info">Seleccionar</button>
            </div>
            <li className="list-group-item">
        Disponible{" "}
        <span className="label label-default label-pill pull-xs-right">
          {qua && qua > 0 ? qua : "No hay productos disponibles"}
        </span>
      </li>
      <li className="list-group-item">
        Vendido{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
