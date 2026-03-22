const PDFDocument = require("pdfkit");
const Course = require("../models/Course");
const User = require("../models/Auth");




exports.generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({
        success: false,
        message: "Course or User not found",
      });
    }

    // ===== Check Completion =====
    let allCompleted = true;

    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        const progress = lesson.progressBy.find(
          (p) => p.userId.toString() === userId
        );
        if (!progress || progress.percent < 100) {
          allCompleted = false;
        }
      });
    });

    if (!allCompleted) {
      return res.status(400).json({
        success: false,
        message: "Complete all modules to get certificate",
      });
    }

    // ===== Create PDF =====
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 0,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${course.title}-certificate.pdf`
    );

    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // ===== Soft Watercolor Background Effect =====
    doc
      .rect(0, 0, pageWidth, pageHeight)
      .fill("#f8fafc");

    doc
      .circle(pageWidth - 200, pageHeight - 150, 200)
      .fillOpacity(0.15)
      .fill("#93c5fd")
      .fillOpacity(1);

    doc
      .circle(pageWidth - 150, pageHeight - 80, 120)
      .fillOpacity(0.1)
      .fill("#60a5fa")
      .fillOpacity(1);

    // ===== Outer Border =====
    doc
      .lineWidth(3)
      .strokeColor("#1e293b")
      .rect(40, 40, pageWidth - 80, pageHeight - 80)
      .stroke();

    // ===== Main Title =====
    doc
      .font("Helvetica-Bold")
      .fontSize(48)
      .fillColor("#1e3a8a")
      .text("C E R T I F I C A T E", 0, 120, {
        align: "center",
      });

    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#334155")
      .text("OF ACHIEVEMENT", {
        align: "center",
      });

    // ===== Presented To =====
    doc
      .moveDown(3)
      .fontSize(18)
      .fillColor("#475569")
      .text("This is proudly presented to", {
        align: "center",
      });

    // ===== Student Name =====
    doc
      .moveDown(0.8)
      .font("Times-BoldItalic")
      .fontSize(42)
      .fillColor("#0f172a")
      .text(user.fullName, {
        align: "center",
      });

    // ===== Completion Text =====
    doc
      .moveDown(1.5)
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#475569")
      .text("For successfully completing the course", {
        align: "center",
      });

    // ===== Course Name =====
    doc
      .moveDown(0.8)
      .font("Helvetica-Bold")
      .fontSize(28)
      .fillColor("#1e293b")
      .text(course.title, {
        align: "center",
      });

    // ===== Date & Signature =====
    const footerY = pageHeight - 140;

    doc
      .fontSize(14)
      .fillColor("#334155")
      .text(`DATE`, 120, footerY);

    doc
      .moveTo(120, footerY + 20)
      .lineTo(250, footerY + 20)
      .strokeColor("#64748b")
      .stroke();

    doc
      .fontSize(12)
      .text(new Date().toLocaleDateString(), 120, footerY + 30);

    doc
      .fontSize(14)
      .text("SIGNATURE", pageWidth - 250, footerY);

    doc
      .moveTo(pageWidth - 250, footerY + 20)
      .lineTo(pageWidth - 120, footerY + 20)
      .stroke();

    doc
      .fontSize(12)
      .text("Authorized Signature", pageWidth - 250, footerY + 30);

    // ===== Gold Seal =====
    const sealX = pageWidth - 180;
    const sealY = pageHeight - 180;

    doc
      .circle(sealX, sealY, 60)
      .fillColor("#fbbf24")
      .fill();

    doc
      .circle(sealX, sealY, 45)
      .fillColor("#facc15")
      .fill();

    doc
      .fillColor("#78350f")
      .fontSize(10)
      .text("CERTIFIED", sealX - 25, sealY - 5);

    doc.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};