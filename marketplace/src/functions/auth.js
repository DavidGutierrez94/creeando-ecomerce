import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const createOrUpdateBrand = async (authtoken, values) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-brand`,
    values,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const currentBrand = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-brand`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
