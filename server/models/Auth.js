// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["student", "educator"],
//       default: "student",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student",
    },

    about: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    preferredContact: {
      type: String,
      enum: ["Email", "Phone", ""],
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
