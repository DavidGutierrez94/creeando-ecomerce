import React from "react";
import { Link } from "react-router-dom";

export const BrandNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
            <Link to="/brand/dashboard"  className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
            <Link to="/brand/product/"  className="nav-link">Crear Producto</Link>
        </li>
      </ul>
    </nav>
  );
};
