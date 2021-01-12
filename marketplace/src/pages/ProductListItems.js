import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const ProductListItems = ({ product }) => {
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

      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Talla{" "}
        <span className="label label-default label-pill pull-xs-right">
          {size}
        </span>
      </li>

      <li className="list-group-item">
        Disponible{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
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
