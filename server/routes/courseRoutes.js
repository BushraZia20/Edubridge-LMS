
const express = require("express");
const router = express.Router();

const {
  createCourse,
  addModule,
  addLesson,
  publishCourse,
  getTeacherCourses,
  updateCourse,
  addQuiz,
  deleteCourse,
  getSingleCourse,
  deleteQuiz,
  enrollCourse,
  getMyEnrolledCourses,
  getStudentCourse
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

// ============================
// COURSE CREATION & MANAGEMENT
// ============================

// Create course
router.post("/", authMiddleware, createCourse);

// Add module
router.put("/:courseId/add-module", authMiddleware, addModule);

// Add lesson
router.put("/:courseId/:moduleId/add-lesson", authMiddleware, addLesson);

// Add quiz
router.put("/:courseId/:moduleId/add-quiz", authMiddleware, addQuiz);

// Publish course
router.put("/:courseId/publish", authMiddleware, publishCourse);

// Update course
router.put("/:courseId", authMiddleware, updateCourse);

// Delete quiz
router.delete(
  "/:courseId/:moduleId/:quizId/delete-quiz",
  authMiddleware,
  deleteQuiz
);

// Delete course
router.delete("/:courseId", authMiddleware, deleteCourse);

// ============================
// STATIC ROUTES (MUST BE ABOVE :courseId)
// ============================

// Teacher courses
router.get("/my-courses", authMiddleware, getTeacherCourses);

// Student enrolled courses
router.get("/my-enrolled-courses", authMiddleware, getMyEnrolledCourses);

// ============================
// STUDENT ACTIONS
// ============================

// Enroll in course
router.post("/:courseId/enroll", authMiddleware, enrollCourse);
 
// STUDENT COURSE VIEW
router.get(
  "/student/:courseId",
  authMiddleware,
  getStudentCourse
);

// ============================
// DYNAMIC ROUTE (KEEP LAST)
// ============================

// Single course details
router.get("/:courseId", authMiddleware, getSingleCourse);

module.exports = router;
