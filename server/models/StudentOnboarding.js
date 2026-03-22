const mongoose = require("mongoose");

const studentOnboardingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    purpose: {
      type: [String],     // step 1
      required: true
    },

    interests: {
      type: [String],     // step 2
      required: true
    },

    currentRole: {
      type: String,       // step 3
      required: true
    },

    educationLevel: {
      type: String,       // step 4
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "StudentOnboarding",
  studentOnboardingSchema
);
