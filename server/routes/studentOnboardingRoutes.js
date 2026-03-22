const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  saveStudentOnboarding,
  getStudentOnboarding
} = require("../controllers/studentOnboardingController");

const router = express.Router();

router.post("/", auth, saveStudentOnboarding);
router.get("/", auth, getStudentOnboarding);

module.exports = router;
