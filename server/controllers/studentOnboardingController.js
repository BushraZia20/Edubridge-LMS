const StudentOnboarding = require("../models/StudentOnboarding");

exports.saveStudentOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const onboarding = await StudentOnboarding.findOneAndUpdate(
      { user: userId },
      { user: userId, ...req.body },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Student onboarding saved successfully.",
      data: {
        _id: onboarding._id,
        userId: onboarding.user,
        createdAt: onboarding.createdAt,
        updatedAt: onboarding.updatedAt,
        student: {
          profile: {
            currentRole: onboarding.currentRole,
            educationLevel: onboarding.educationLevel,
          },
          learningPreferences: {
            interests: onboarding.interests,
            purpose: onboarding.purpose,
          },
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to save student onboarding details." });
  }
};

exports.getStudentOnboarding = async (req, res) => {
  try {
    const onboarding = await StudentOnboarding.findOne({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Student onboarding details fetched successfully.",
      data: {
        _id: onboarding._id,
        userId: onboarding.user,
        createdAt: onboarding.createdAt,
        updatedAt: onboarding.updatedAt,
        student: {
          profile: {
            currentRole: onboarding.currentRole,
            educationLevel: onboarding.educationLevel,
          },
          learningPreferences: {
            interests: onboarding.interests,
            purpose: onboarding.purpose,
          },
        },
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "failed to fetch student onboarding details." });
  }
};

// const StudentOnboarding = require("../models/StudentOnboarding");

// exports.saveStudentOnboarding = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const onboarding = await StudentOnboarding.findOneAndUpdate(
//       { user: userId },
//       { user: userId, ...req.body },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Student onboarding saved", onboarding });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getStudentOnboarding = async (req, res) => {
//   try {
//     const onboarding = await StudentOnboarding.findOne({
//       user: req.user.id,
//     });

//     res.json(onboarding);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
