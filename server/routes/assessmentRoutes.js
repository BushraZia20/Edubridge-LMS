const express = require("express");
const router = express.Router();
const {
  createAssessment,
  getAssessments,
  deleteAssessment,
} = require("../controllers/assessmentController");

router.post("/", createAssessment);
router.get("/", getAssessments);
router.delete("/:id", deleteAssessment);

module.exports = router;
