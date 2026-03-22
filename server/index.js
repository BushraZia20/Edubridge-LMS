// ===== Load ENV first =====
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentOnboardingRoutes = require("./routes/studentOnboardingRoutes");
const teacherOnboardingRoutes = require("./routes/teacherOnboardingRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const studentRoutes = require("./routes/studentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const certificateRoutes = require("./routes/certificate");

const app = express();


// ===== Middleware =====
app.use(cors());
app.use(express.json());


// ===== Routes =====

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/student-onboarding", studentOnboardingRoutes);
app.use("/api/teacher-onboarding", teacherOnboardingRoutes);
app.use("/api/courses", courseRoutes);

app.use("/api/assessment", assessmentRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/student", studentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/certificate", certificateRoutes);
// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.send("Backend API working 🚀");
});


// ===== Database Connection =====
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.log("❌ ERROR: MONGODB_URI missing in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("====================================");
    console.log("🟢 MongoDB Connected Successfully");
    console.log(`📂 Database: ${mongoose.connection.name}`);
    console.log("====================================");

    // Start server ONLY after DB connected
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("====================================");
      console.log(`🚀 Server Started Successfully`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log("====================================");
    });
  })
  .catch((err) => {
    console.log("====================================");
    console.log("🔴 MongoDB Connection Failed");
    console.log("Reason:", err.message);
    console.log("====================================");
    process.exit(1);
  });
