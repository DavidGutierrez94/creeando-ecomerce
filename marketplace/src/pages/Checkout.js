import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import axios from 'axios';
import NumberFormat from "react-number-format";
import { add } from "lodash";



const getBrand = async (id) =>
await axios.get(`${process.env.REACT_APP_API}/brand/${id}`, {

});


const Checkout = ({ history }) => {
  // const shippingInfo = {
  //   price: total,
  //   city: 1,
  //   coordinates: [],
  //   addressInitial: "Cra 7 #120-20",
  //   addressFinish: "calle 19b#6b",
  //   roundtrip: 0,
  // };
  const [loading,setLoading] = useState(false);
  const[shipping,setShipping] =useState(0);
  const [products, setProducts] = useState([]);
  const [brand,setBrand] = useState("");
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD} = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const distinct = (value, index, self) =>{
    return self.indexOf(value)===index;
  }
const findBrands = () =>{
  const brands = [];
  products.map((p)=>{
    brands.push(p.product.brandId)
  });
  const distinctBrands = brands.filter(distinct);
  if ( distinctBrands.length > 1 ){
    distinctBrands.map((b)=>{
      console.log(b);
      getBrand(b).then((res)=>{
        console.log(" brand", JSON.stringify(res.data, null, 4));
      })
    })
    


  }

}
  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("el carrito esta vacio");
    });
  };

  const saveAddressToDb = () => {

    findBrands();
   
    // // console.log(address);
    // calculateDeliveryBrand(shippingInfo, user.token)
    // .then((res) => {
    //   const {data: dataEndpoint} = res;
    //   console.log(dataEndpoint);
    //   toast.success(dataEndpoint.data.total_service);

    // //  window.location.reload();
    // })
    // .catch((err) => {
    //   console.log(err);
    //   if (err.response.status === 400) toast.error(err.response.data);
    //   toast.error(err.response.data.err);
    // });

    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <input 
      className="form-control" 
      type="text"
     
        value={address} onChange={(e) => {
          setAddress(e.target.value);
        }}/>
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Guardar
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          <NumberFormat value={p.product.price * p.count} displayType="text" thousandSeparator="." decimalSeparator="," prefix="$"/>
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Aplicar
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="row p-5" >
      
      <div className="col-md-6 container">
        <h4>Dirección de entrega</h4>
        <br />
        <br />
        {showAddress()}
        {address.length < 1?
         <label className="text-danger">*agrega tu dirección para calcular el costo de envio.</label>
         :<br />
         }
        <hr />
        <h4>¿Tienes un Cúpon de Descuento?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6 container">
        <h4>Resumen de tu Orden</h4>
        <hr />
        <p>Productos: {products.length}</p>
        <hr />
        {showProductSummary()}
       
        <hr />
        <p>Total: <NumberFormat value={total}  displayType="text" thousandSeparator="." decimalSeparator="," prefix="$"/></p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Descuento: <NumberFormat value={total-totalAfterDiscount}  displayType="text" thousandSeparator="." decimalSeparator="," prefix="$"/>
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Colocar Orden
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Colocar Orden
              </button>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Checkout;
