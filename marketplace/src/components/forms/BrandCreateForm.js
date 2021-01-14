import React from "react";

const BrandCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    password,
    setPassword
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

    return(
        <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" name="email" value={email} onChange={handleChange} placeholder="Email"/>
        <input type="text" className="form-control" name="repName" placeholder="Nombre del representante"  value={repName} onChange={handleChange} />
        <input type="number" className="form-control" placeholder="Documento del representante" name="repId" value={repId} onChange={handleChange}/>
        <input type="phone" className="form-control" placeholder="Teléfono de contacto" name="phone" value={phone} onChange={handleChange} />
        <input type="text" className="form-control" placeholder="Nombre de la Marca" name="brandName"  value={brandName} onChange={handleChange}/>
        <input type="text" className="form-control" placeholder="Descripción de la Marca" name="description" value={description} onChange={handleChange} />
        <input type="address" className="form-control" placeholder="Dirección" name="address" value={address} onChange={handleChange} />
        <input
          type="text"
          className="form-control"
          name="token"
          value={token}
          onChange={handleChange}
          placeholder="Token de acceso de tu marca"
          autoFocus
        />
    
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