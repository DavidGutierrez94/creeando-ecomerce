import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../functions/auth";
import { createOrder, getUserCart, updateUser } from "../functions/user";
import Modal from 'react-modal';
import { createPaymentIntent } from "../functions/stripe";



// load stripe outside of components render to avoid recreating stripe object on every render
/* const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY); */

const Payment = ({history}) => {

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const [form, setForm] = useState({})
  const [modal, setModal] = useState(false)
  const [paymentLink, setPaymentLink] = useState("")
  const [order, setOrder] = useState({})

  useEffect(() => {
    let initFetch = async () => {
      await getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
      })
      await currentUser(user.token).then((d)=>{
        let date = new Date()
        
        setForm({...d.data, description: `${d.data._id} - ${date.toString()}`})
      })
    }

  

  initFetch()


}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  await updateUser(user.token, form)
  await createPaymentIntent(user.token,null,form).then((res)=>{
    setPaymentLink(res.data.payment_url)
    createOrder(res.data, user.token)
  })
  setModal(true)

}

const handleOrder = async () => {
  setModal(false)
  history.push("/user/history")
}

return (
  <div className="container p-5 text-center">

<Modal
          isOpen={modal}>
            <p>Una vez realizado el pago da click en <button onClick={handleOrder} className="btn btn-primary" >Finalizar</button></p>
            
            <iframe style={{height:"80%", width: "100%"}} src={paymentLink} ></iframe>
          </Modal>
    <h4>Terminar Compra</h4>
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
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
