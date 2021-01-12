import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import NumberFormat from "react-number-format";
const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Imagen</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Talla</th>
          <th scope="col">Color</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Enviar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Carrito {cart.length} Productos Seleccionados</h4>

          {!cart.length ? (
            <p>
              No hay productos en el carrito. <Link to="/shop">Continua comprando.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Resumen de tu Orden</h4>
          <hr />
          <p>Productos</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = <NumberFormat value={c.price * c.count} displayType="text" thousandSeparator="." decimalSeparator="," prefix="$"/>
              </p>
            </div>
          ))}
          <hr />
          Total: <b><NumberFormat value={getTotal()} displayType="text" thousandSeparator="." decimalSeparator="," prefix="$"/></b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Finalizar Compra
              </button>
              <br />
              {/* <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pago contra entrega
              </button> */}
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Ingresar para finalizar
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
