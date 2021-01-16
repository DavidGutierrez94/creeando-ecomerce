const {calculateMU, generateTokenMU} = require("../service/mensajeros-urbanos");

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