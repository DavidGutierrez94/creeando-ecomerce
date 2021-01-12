import React from "react";

const BrandCreateForm = (
    handleSubmit,
    handleChange,
    values,
    password,
    setPassword
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
        <input type="email" className="form-control" value={email} onChange={handleChange} placeholder="Email"/>
        <input type="text" className="form-control" placeholder="Nombre del representante"  value={repName} onChange={handleChange} />
        <input type="number" className="form-control" placeholder="Documento del representante" value={repId} onChange={handleChange}/>
        <input type="phone" className="form-control" placeholder="Teléfono de contacto" value={phone} onChange={handleChange} />
        <input type="text" className="form-control" placeholder="Nombre de la Marca"  value={brandName} onChange={handleChange}/>
        <input type="text" className="form-control" placeholder="Descripción de la Marca" value={description} onChange={handleChange} />
        <input type="address" className="form-control" placeholder="Dirección" value={address} onChange={handleChange} />
        <input
          type="text"
          className="form-control"
          value={token}
          onChange={handleChange}
          placeholder="Token de acceso de tu marca"
          autoFocus
        />
    
        <input
          type="password"
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