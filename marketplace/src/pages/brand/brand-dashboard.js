
import { BrandNav } from "../../components/nav/brand-nav";
import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus, getOrdersBrand } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { createServiceDispatch} from "../../functions/calculate"

export const BrandDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
  getOrdersBrand(user.token).then((res) => {
      let ta = []
      let ta2 = []
      res.data.map((item, i)=>{
          item.products.map((it, ind)=>{

            console.log(it.product)
            console.log(user._id)

            if(it.product.brandId == user._id && !ta.includes(item)){
              console.log("hola")
            }
          })
      })

      ta2.map((item, i) => {
        console.log(item)
      })

      console.log(ta2)
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus, ord) => {

    if(orderStatus == "Despachada"){
      let body = {
        products: ord, user: user,
      }
      createServiceDispatch()

    }
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <BrandNav />
        </div>

        <div className="col-md-10">
          <h4>Brand Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};
