const express = require("express");
const router = express.Router();

// middlewares

// controller
const {
  read,
  list,
} = require("../controllers/brand");

// routes
router.get("/brands", list);
router.get("/brand", read);


module.exports = router;