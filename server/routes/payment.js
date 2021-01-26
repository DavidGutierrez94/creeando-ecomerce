const express = require("express");
const router = express.Router();

const { paymentLink} = require("../controllers/payment");
const { route } = require("./user");
// middleware
const { authCheck } = require("../middlewares/auth");

router.post("/create-payment-intent", authCheck, paymentLink);

module.exports = router;