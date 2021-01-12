import React from "react";
import { Select } from "antd";
import NumberFormat from "react-number-format";
import CreateCategoryModal from "../modal/CreateCategoryModal";


const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCatagoryChange,
  subOptions,
  showSub,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    sizes,
    color,
    size,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title.replace(/\b(\w)/g, s => s.toUpperCase())}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Precio</label>   
         <input
          type="number"
          min="1"
          step="any"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
          prefix="$"
        /> 
      </div>

      <div className="form-group">
        <label>Envío Aliados Mensajeros Urbanos</label>
        <select
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Seleccionar...</option>
          <option value="No">No</option>
          <option value="Yes">Si</option>
        </select>
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          min="0"
          step="any"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Seleccionar...</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Talla</label>
        <select name="size" className="form-control" onChange={handleChange}>
          <option>Seleccionar...</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">

        <label>Categoría</label>
        <br/>
        <CreateCategoryModal />
        <select
          name="category"
          className="form-control"
          onChange={handleCatagoryChange}
        >
          <option>Seleccionar...</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
       
      </div>

      {showSub && (
        <div>
          <label>Sub Categorías</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <br />
      <button className="btn btn-outline-info">Guardar</button>
    </form>
  );
};

export default ProductCreateForm;
