const request = require("request");

exports.generatePaymentLink = (authtoken, dataFront, total)  => new Promise((resolve, reject) => {
    const {email,first_name, last_name, document_number,document_type,cellphone,description} = dataFront
    const headers = {
      "content-type": "application/json",
      authtoken,
      }; 
    const body = {
        "email":email,
        "first_name":first_name,
        "last_name":last_name,
        "document_number":document_number,
        "document_type":document_type,
        "cellphone":cellphone,
        "description":description,
        "total_value":total,
        "private_api_key": process.env.WENJOY_API_KEY,
    }

    const options = { 
        method: 'POST',
        url: `${process.env.WENJOY_GEN_PAYMENT_LINK_URL}`,
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