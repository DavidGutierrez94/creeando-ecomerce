const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { upload, remove, uploadLogo, removeLogo } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);
router.post("/uploadlogo", uploadLogo);
router.post("/removelogo", removeLogo);

module.exports = router;
