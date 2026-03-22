
const express = require("express");
const router = express.Router();

const {
  getAllPublishedCourses,
  getSinglePublishedCourse,
  updateLessonProgress,
  getCompletedCourses
} = require("../controllers/studentController");

const auth = require("../middleware/authMiddleware");


router.get(
  "/courses",
  // 🔒 Required for progress calculation
  getAllPublishedCourses
);


/* ======================================================
   GET SINGLE PUBLISHED COURSE
====================================================== */
router.get(
  "/courses/:courseId",
 // 🔒 Keep protected for consistency
  getSinglePublishedCourse
);


/* ======================================================
   UPDATE LESSON PROGRESS (LIVE TRACKING)
====================================================== */
router.put(
  "/courses/:courseId/:moduleId/:lessonId/progress",
  auth,
  updateLessonProgress
);


router.get("/completed-courses", auth, getCompletedCourses);

module.exports = router;
