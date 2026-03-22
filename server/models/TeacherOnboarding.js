const mongoose = require("mongoose");

const teacherOnboardingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Personal & Professional
    country: String,
    profession: String,
    experience: String,
    expertise: [String], // ✅ array

    // Teaching Preferences
    defaultLanguage: String,
    courseFormat: [String], // ✅ array
    audience: [String], // ✅ array
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherOnboarding", teacherOnboardingSchema);

