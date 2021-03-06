import axios from "axios";

export const getBrandsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/brands/${count}`);

  export const getBrands = async (sort, order, page) =>
  await axios.get(`${process.env.REACT_APP_API}/brands`, {
    sort,
    order,
    page,
  });
  

  export const getBrand = async (id) =>
await axios.get(`${process.env.REACT_APP_API}/brand/${id}`, {

});
