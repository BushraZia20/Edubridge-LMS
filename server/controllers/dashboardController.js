const Course = require("../models/Course");
const User = require("../models/Auth");

exports.getTeacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const courses = await Course.find({ createdBy: teacherId });

    const totalStudents = await User.countDocuments({ role: "student" });

    res.status(200).json({
      success: true,
      data: {
        courses,
        totalStudents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
