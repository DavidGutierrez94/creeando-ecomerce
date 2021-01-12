import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Producto
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Productos
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Categorías
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Categorías
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Cupones
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Contraseña
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
