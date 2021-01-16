const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck, brandCheck } = require("../middlewares/auth");

// controllers
const { upload, remove, uploadLogo, removeLogo } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/uploadimages-brand", authCheck, brandCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);
router.post("/removeimage-brand", authCheck, brandCheck, remove);
router.post("/uploadlogo", uploadLogo);
router.post("/removelogo", removeLogo);

module.exports = router;
