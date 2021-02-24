import axios from "axios";

export const calculateDeliveryBrand = async (body, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/calculateMU`, body, {
    headers: {
      authtoken,
    },
  });

  export const createServiceDispatch = async (body, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/dispatchMU`, body, {
    headers: {
      authtoken,
    },
  });