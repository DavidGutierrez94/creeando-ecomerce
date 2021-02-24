const request = require("request");

exports.generateTokenMU = () => new Promise((resolve, reject) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    client_id: process.env.CLIENT_ID_MU,
    client_secret: process.env.CLIENT_SECRET_MU,
  };
  const options = { 
    method: 'POST',
    url: `${process.env.URL_MU}/oauth/token`,
    headers,
    form: {
          'grant_type': 'client_credentials'
        }

}
  request({...options}, (error, response, body) => {
    if (error) {
      console.log(error)
      reject(error)
    }
    else{
      console.log("-------------------------------")
      resolve(JSON.parse(body))   
    }
  });
});
exports.calculateMU = (token, dataFront)  => new Promise((resolve, reject) => {
    const {roundtrip, city, coordinates, price, surcharge} = dataFront
    const headers = {
      "content-type": "application/json",
        access_token: token,
      }; 
    const body = {
        "id_user": process.env.USER_ID_MU,
        "type_service": 4,
        "roundtrip": roundtrip || 0, //Ida y vuelta 1=si; 0:No
        "city":city || 1,//1->Bogotá 2->Cali 3->Medellín 4->Barranquilla 5-Villavicencio
        "declared_value": price,
        "coordinates": coordinates,
        "parking_surcharge": surcharge || 0,
        // "coordinates": [
        //     {
        //         "type": "0",//0->Recogida,1->Entrega
        //         "id_point": "1",//Id del  punto
        //         "lng": "-74.050461658",
        //         "lat": "4.6762105880001",
        //         "address": "cra 14b 112 45",
        //         "city":"bogota",
        //     }, {
        //         "type": "1",
        //         "address": "cra 15 127 ",
        //         "city":"bogota",
        //     }
        // ]
    }
    const options = { 
      method: 'POST',
      url: `${process.env.URL_MU}/calculate`,
      body,
      headers,
      json: true,
  }
  request(options, (error, response, body) => {
    if (error) {
      console.log(error)
      reject(error)
    }
    else{
      console.log("-------------------------------")
      resolve(body)   
    }
  });
});
 
exports.dispatchOrderMU=({token, order, delivery })=>{

  let nows = new Date()
  const headers = {
    "content-type": "application/json",
      access_token: token,
    }; 
  let bodySend = {
    "id_user": process.env.USER_ID_MU,//ID de usuario
    "type_service": 4, //Tipo de servicio
    "roundtrip": 0, //Ida y vuelta 1=si; 0:No
    "declared_value": 10000, //Valor declarado
    "city":1,//1->Bogotá 2->Cali 3->Medellín 4->Barranquilla 5-Villavicencio
    "start_date": nows.toDateString(), //Fecha Inicio
    "start_time": nows.toTimeString().split(" ")[0],//Hora Inicio
    "user_payment_type":3, 
    "type_segmentation":1,
    "type_task_cargo_id":2,//Tipo de sevicio, 2->Normal
     "coordinates": [
              ... order.coordinates,
             {"products": products}
         
     ]
 }
 
const options = { 
  method: 'POST',
  url: `${process.env.URL_MU}/Create-services`,
  headers,
  form: {
        'grant_type': 'client_credentials'
      }

}
request({...options}, (error, response, body) => {
  if (error) {
    console.log(error)
    reject(error)
  }
  else{
    console.log("-------------------------------")
    resolve(JSON.parse(body))   
  }
});
}
 