const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { generateCertificate } = require("../controllers/certificateController");

router.get("/:courseId", auth, generateCertificate);

module.exports = router;