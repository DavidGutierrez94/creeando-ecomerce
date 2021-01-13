import React, { useState, useEffect } from "react";
import { BrandNav } from "../../components/nav/brand-nav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import ProductCreate from "../admin/product/ProductCreate";
export const BrandDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <BrandNav />
        </div>
        <div className="col-md-10">
        </div>
      </div>
    </div>
  );
};
