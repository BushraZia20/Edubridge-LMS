const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getMyCreatedCourses,
} = require("../controllers/profileController");

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.get("/my-courses", authMiddleware, getMyCreatedCourses);

module.exports = router;
