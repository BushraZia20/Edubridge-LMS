const TeacherOnboarding = require("../models/TeacherOnboarding");

// --- SAVE or UPDATE Teacher Onboarding ---

exports.saveTeacherOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      country,
      profession,
      experience,
      expertise, // array
      defaultLanguage,
      courseFormat, // array
      audience, // array
    } = req.body;

    const onboarding = await TeacherOnboarding.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        country,
        profession,
        experience,
        expertise: expertise || [],
        defaultLanguage,
        courseFormat: courseFormat || [],
        audience: audience || [],
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      action: "Teacher onboardign saved successfully.",
      data: {
        _id: onboarding._id, // document id
        userId: onboarding.user, // user reference
        createdAt: onboarding.createdAt,
        updatedAt: onboarding.updatedAt,
        teacher: {
          profile: {
            country: onboarding.country,
            profession: onboarding.profession,
            experience: onboarding.experience,
          },
          teachingPreferences: {
            expertise: onboarding.expertise,
            defaultLanguage: onboarding.defaultLanguage,
            courseFormat: onboarding.courseFormat,
            audience: onboarding.audience,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to save teacher onboarding details.",
    });
  }
};

/**
 * GET Teacher Onboarding
 */
exports.getTeacherOnboarding = async (req, res) => {
  try {
    const onboarding = await TeacherOnboarding.findOne({
      user: req.user.id,
    });

    if (!onboarding) {
      return res.status(404).json({
        success: false,
        message: "Teacher onboarding not found",
      });
    }

    res.status(200).json({
      success: true,
      action: "Teacher onboarding details fetched successfully.",
      data: {
        _id: onboarding._id,
        userId: onboarding.user,
        createdAt: onboarding.createdAt,
        updatedAt: onboarding.updatedAt,
        teacher: {
          profile: {
            country: onboarding.country,
            profession: onboarding.profession,
            experience: onboarding.experience,
          },
          teachingPreferences: {
            expertise: onboarding.expertise,
            defaultLanguage: onboarding.defaultLanguage,
            courseFormat: onboarding.courseFormat,
            audience: onboarding.audience,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teacher onboarding details.",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const TeacherOnboarding = require("../models/TeacherOnboarding");

// exports.saveTeacherOnboarding = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const onboarding = await TeacherOnboarding.findOneAndUpdate(
//       { user: userId },
//       { user: userId, ...req.body },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Teacher onboarding saved", onboarding });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getTeacherOnboarding = async (req, res) => {
//   try {
//     const onboarding = await TeacherOnboarding.findOne({
//       user: req.user.id,
//     });

//     res.json(onboarding);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
