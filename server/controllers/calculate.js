const {calculateMU, generateTokenMU, dispatchOrderMU} = require("../service/mensajeros-urbanos");

exports.calculateService = async (req, res) => {
    try {
      const {body} = req
      const token = await generateTokenMU();
      const response = await calculateMU(token.access_token, body);
      res.json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: err.message,
      });
    }
  };

exports.disptchService = async (req, res) =>{
  try {
    const {body} = req
    const token = await generateTokenMU();
    const response = await dispatchOrderMU(token.access_token, user, order, delivery);
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};
