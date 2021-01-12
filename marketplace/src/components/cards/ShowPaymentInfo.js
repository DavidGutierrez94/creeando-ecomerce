import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        precio:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>Moneda: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Metodo: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Pago: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Fecha:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
