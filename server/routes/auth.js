const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, brandCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateBrand, createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/create-or-update-brand", authCheck, createOrUpdateBrand);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.post("/current-brand", authCheck, brandCheck, currentUser);

module.exports = router;
