const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getTeacherDashboard } = require("../controllers/dashboardController");

router.get("/teacher", authMiddleware, getTeacherDashboard);

module.exports = router;
