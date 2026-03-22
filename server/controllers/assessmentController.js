const Assessment = require("../models/Assessment");

// CREATE
exports.createAssessment = async (req, res) => {
  try {
    const { questions } = req.body;

    const totalMarks = questions.reduce(
      (acc, q) => acc + Number(q.marks || 0),
      0
    );

    const assessment = await Assessment.create({
      ...req.body,
      totalMarks,
    });

    res.status(201).json({
      success: true,
      assessment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().populate("course");

    res.json({
      success: true,
      assessments,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// DELETE
exports.deleteAssessment = async (req, res) => {
  try {
    await Assessment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
