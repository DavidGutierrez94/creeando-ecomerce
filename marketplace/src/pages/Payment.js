import React from "react";

// load stripe outside of components render to avoid recreating stripe object on every render
/* const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY); */

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Terminar Compra</h4>


    </div>
  );
};

export default Payment;
