import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.purchase_id}</span>
      {" / "}
      <span>
        precio:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>
        Fecha:{" / "}
        {new Date(order.createdAt * 1000).toLocaleString()}
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
