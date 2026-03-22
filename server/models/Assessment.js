const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "type"],
    required: true,
  },
  options: [String], // for mcq
  correctAnswer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 1,
  },
});

const assessmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    passPercentage: {
      type: Number,
      default: 40,
    },
    totalMarks: Number,
    isPublished: {
      type: Boolean,
      default: false,
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
