const Comment = require("../models/Comment");

// ================= CREATE COMMENT =================
exports.createComment = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId, message, parentComment } = req.body;

    const comment = await Comment.create({
      courseId,
      moduleId,
      lessonId,
      message,
      parentComment: parentComment || null,
      userId: req.user.id,
      role: req.user.role,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET LESSON COMMENTS =================
exports.getLessonComments = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.params;

    const comments = await Comment.find({
      courseId,
      moduleId,
      lessonId,
    })
      .populate("userId", "fullName role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE COMMENT =================
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // 🔒 Only owner can delete
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Only owner can edit
    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    comment.message = req.body.message;
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
