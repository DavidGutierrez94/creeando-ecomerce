import axios from "axios";

export const createPaymentIntent = (authtoken,coupon, body) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { ...body, couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
