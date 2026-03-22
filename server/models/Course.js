
const mongoose = require("mongoose");


// ============================
// LESSON SCHEMA
// ============================
// const lessonSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   duration: String,
//   videoUrl: String,
//    completedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ], // YouTube or any video link
// });

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
  videoUrl: String,

  // 🔥 NEW: track progress per user
  progressBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      percent: {
        type: Number,
        default: 0,
      },
    },
  ],

  // Optional: keep this if you want
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});



// ============================
// QUIZ SCHEMA
// ============================
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    default: [],
  },
});


// ============================
// MODULE SCHEMA
// ============================
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: {
    type: [lessonSchema],
    default: [],
  },
  quizzes: {
    type: [quizSchema],
    default: [],
  },
});


// ============================
// COURSE SCHEMA
// ============================
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: String,
    category: String,
    level: String,
    duration: String,
    thumbnail: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    modules: {
      type: [moduleSchema],
      default: [],
    },

    // ✅ NEW: Enrolled Students
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);




module.exports = mongoose.model("Course", courseSchema);
