const express = require("express");
const router = express.Router();

const { getAllStudents,deleteStudent, getSingleStudent } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/students", authMiddleware, getAllStudents);

router.delete("/students/:id", authMiddleware, deleteStudent);

router.get("/students/:id", authMiddleware, getSingleStudent);


module.exports = router;
