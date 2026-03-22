const User = require("../models/Auth");

/* =============================
   GET ALL STUDENTS (Teacher)
============================= */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =============================
   DELETE STUDENT (Teacher)
============================= */
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Only educator can delete
    if (req.user.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Only educators can delete students",
      });
    }

    const student = await User.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "You can only delete students",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =============================
   GET SINGLE STUDENT
============================= */
exports.getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id).select("-password");

    if (!student || student.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
