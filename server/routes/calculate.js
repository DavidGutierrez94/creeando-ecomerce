const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

const { calculateService } = require("../controllers/calculate");
const { dispatchOrderMU } = require("../service/mensajeros-urbanos");

// routes
router.post("/calculateMU", calculateService);
router.post("/dispatchMU", dispatchOrderMU);

module.exports = router;
