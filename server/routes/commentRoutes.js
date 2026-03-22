const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createComment,
  getLessonComments,
  deleteComment,
  updateComment
} = require("../controllers/commentController");

router.post("/", auth, createComment);

router.get(
  "/:courseId/:moduleId/:lessonId",
  auth,
  getLessonComments
);

router.put("/:id", auth, updateComment);

router.delete("/:id", auth, deleteComment);

module.exports = router;


