const User = require("../models/Auth");
const Course = require("../models/Course");
/* ==============================
   GET LOGGED IN USER PROFILE
================================ */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==============================
   UPDATE PROFILE
================================ */
exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      about,
      phone,
      preferredContact,
      location,
      avatar,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (about !== undefined) user.about = about;
    if (phone !== undefined) user.phone = phone;
    if (preferredContact !== undefined)
      user.preferredContact = preferredContact;
    if (location !== undefined) user.location = location;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getMyCreatedCourses = async (req, res) => {
  try {
    // Only educator allowed
    if (req.user.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const courses = await Course.find({
      createdBy: req.user.id,
    })
      .sort({ createdAt: -1 }) // newest first
      .select("title isPublished enrollments createdAt");

    // Format clean response
    const formattedCourses = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      status: course.isPublished ? "Published" : "Draft",
      students: course.enrollments || 0,
      createdAt: course.createdAt,
    }));

    res.status(200).json({
      success: true,
      totalCourses: formattedCourses.length,
      courses: formattedCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};