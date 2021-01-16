const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

const { calculateService } = require("../controllers/calculate");

// routes
router.post("/calculateMU", calculateService);

module.exports = router;
