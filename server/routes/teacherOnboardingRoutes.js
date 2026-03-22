const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  saveTeacherOnboarding,
  getTeacherOnboarding,
} = require("../controllers/teacherOnboardingController");

const router = express.Router();

router.post("/", auth, saveTeacherOnboarding);
router.get("/", auth, getTeacherOnboarding);

module.exports = router;
