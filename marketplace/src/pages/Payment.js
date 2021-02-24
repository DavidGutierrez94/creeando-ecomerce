import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../functions/auth";
import { getUserCart } from "../functions/user";


// load stripe outside of components render to avoid recreating stripe object on every render
/* const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY); */

const Payment = () => {

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const [form, setForm] = useState({})

  useEffect(() => {
    let initFetch = async () => {
      await getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
      })
      await currentUser(user.token).then((d)=>{
        console.log(d)
        setForm(d.data)
      })
    }

  

  initFetch()


}, [])

return (
  <div className="container p-5 text-center">
    <h4>Terminar Compra</h4>
    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
      <input
        className="form-control"
        style={{ width: 400 }}
        type="text"
        placeholder="Primer nombre"
        value={form.first_name}

        onChange={(e)=>setForm({...form, first_name: e.target.value})}
      />

      <br/>

      <input
        className="form-control"
        style={{ width: 400 }}
        type="text"
        placeholder="Primer apellido"
        value={form.last_name}

        onChange={(e)=>setForm({...form, last_name: e.target.value})}

      />
      <br/>

      <input
        className="form-control"
        style={{ width: 400 }}
        type="text"
        placeholder="Email"
        value={form.email}
        onChange={(e)=>setForm({...form, email: e.target.value})}

      />
      <br/>

      <select
        onChange={(e)=>setForm({...form, document_type: e.target.value})}
  value={form.document_type}
      >
        <option>Selecciona un tipo de documento</option>
        <option value="0">CC</option>
        <option value="1">CE</option>
        <option value="2">PA</option>
      </select>
      <br/>

      <input
        className="form-control"
        style={{ width: 400 }}
        type="text"
        placeholder="Numero de documento"
  value={form.document_number}

        onChange={(e)=>setForm({...form, document_number: e.target.value})}

      />

<br/>


      <input
        className="form-control"
        style={{ width: 400 }}
        type="text"
        placeholder="Teléfono"
        onChange={(e)=>setForm({...form, cellphone: e.target.value})}
        value={form.cellphone}

      />
      <br/>

      <button className="btn btn-primary" >Pagar</button>

    </form>
  </div>
);
};

export default Payment;
