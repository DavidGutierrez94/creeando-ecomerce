import React,{useState} from "react";
import ColorPickerModal from "../modal/ColorPickerModal"



const BrandCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    password,
    setPassword,
    handleColor
    }
) =>{

    const {
        repName,
        email,
        repId,
        phone,
        brandName,
        description,
        address,
        token
      } = values;

    
      const [color, setColor] = useState('#fff');
 

      const handleChangeComplete = (c) => {
          setColor(c.hex);
          handleColor(c.hex)
        };
    return(
        <form onSubmit={handleSubmit}>
        <label>Correo eletrónico:</label>
        <input type="email" className="form-control" name="email" value={email} onChange={handleChange} placeholder="Email"/>
        <br />
        <label>Nombre de Representante:</label>
        <input type="text" className="form-control" name="repName" placeholder="Nombre del representante"  value={repName} onChange={handleChange} />
        <br />
        <label>Documento de Representante:</label>
        <input type="number" className="form-control" placeholder="Documento del representante" name="repId" value={repId} onChange={handleChange}/>
        <br />
        <label>Celular:</label>
        <input type="phone" className="form-control" placeholder="Teléfono de contacto" name="phone" value={phone} onChange={handleChange} />
        <br />
        <label>Nombre de la marca:</label>
        <input type="text" className="form-control" placeholder="Nombre de la Marca" name="brandName"  value={brandName} onChange={handleChange}/>
        <br />
        <label>Descripción de la marca:</label>
        <input type="text" className="form-control" placeholder="Descripción de la Marca" name="description" value={description} onChange={handleChange} />
        <br />
        <label>Ciudad principal:</label>
        <select name="city" className="form-control" onChange={handleChange} >
          <option >Selecciona una ciudad</option>
          <option value="1" >Bogota</option>
          <option value="3" >Medellin</option>
          <option value="2" >Cali</option>
          <option value="4" >Barranquilla</option>
        </select>
        <br />
        <label>Dirección de marca:</label>
        <input type="address" className="form-control" placeholder="Dirección" name="address" value={address} onChange={handleChange} />
        <br />
        <label>Dirección de despachos:</label>
        <input type="address" className="form-control" placeholder="Dirección de despacho" name="address" value={address} onChange={handleChange} />
        <br />
        <label>Token personalizado por negocio:</label>
        <input
          type="text"
          className="form-control"
          name="token"
          value={token}
          onChange={handleChange}
          placeholder="Token de acceso de tu marca"
          autoFocus
        />
        <placeholder> Color primario de la marca: {color} </placeholder>
        {ColorPickerModal(color,handleChangeComplete)}
        <br />
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
        />
        <br />
        <button type="submit" className="btn btn-raised">
          Registrar
        </button>
      </form>
    );

    
};

export default BrandCreateForm;