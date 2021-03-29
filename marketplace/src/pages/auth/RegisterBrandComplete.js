import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateBrand } from "../../functions/auth";
import BrandCreateForm from '../../components/forms/BrandCreateForm';
import LogoUpload from "../../components/forms/LogoUpload";

const RegisterBrandComplete = ({ history }) => {
  const initialState = {
    repName:"asd",
   email:"10test@gmail.com",
    categories:[],
    subs:[],
    repId:"123456789",
    phone:"12345678",
    brandName: "10test",
    description:"awdawd awdawdaw awdadw  awdawd",
    address:"calle 21 # 3-1",
    logo:[],
    token:"2qa67QwvqHfJWnNVDBLY",
  };
  const [values, setValues] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("123123");



  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value, e.target)
    setValues({...values, [e.target.name]: e.target.value });
  //console.log(e.target.name, " ----- ", e.target.value);
  };
  //destructure

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!values.email || !password) {
      toast.error("Email y Contraseña son necesarios");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      
      const result = await auth.createUserWithEmailAndPassword(
        values.email,
        password
      );

       console.log("RESULT", result);
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult, values);

        // createOrUpdateUser(idTokenResult.token)
        //   .then((res) => {
        //     console.log(res, 'user')
            // dispatch({
            //   type: "LOGGED_IN_USER",
            //   payload: {
            //     name: res.data.name,
            //     email: res.data.email,
            //     token: idTokenResult.token,
            //     role: res.data.role,
            //     _id: res.data._id,
            //   },
            // });
          // })
          // .catch((err) => console.log(err));
        
          createOrUpdateBrand(idTokenResult.token, values)
          .then((res) => {
            console.log(res, 'brand')
            // dispatch({
            //   type: "LOGGED_IN_BRAND",
            //   payload: {
            //   values,
            //   },
            // });
          })
          .catch((err) => console.log(err, 'custom-error'));


        // redirect
        history.push("/login");
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

return (
  <div className="container p-2">
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h4>Registra tu Marca 💪 </h4>
        <div className="container p-2" >
      <div className= "row">
        <div className="col-sm-10">
        <label className="text-secondary"> Subir Logo: </label>
          <div className="row">
            <div className="col-sm-8">
            <LogoUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}

                className="text-secondary"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
        <BrandCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleColor={(e)=>setValues({...values,color: e})}
              values={values}
              password={password}
              setPassword={setPassword}
        />
      </div>
    </div>
  </div>
);


  
   
};

export default RegisterBrandComplete;
