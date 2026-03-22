
const Course = require("../models/Course");



/* ======================================================
   1️⃣ GET ALL PUBLISHED COURSES (WITH USER PROGRESS)
====================================================== */
exports.getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    const formattedCourses = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      shortDescription: course.shortDescription,
      thumbnail: course.thumbnail,
      category: course.category,
      level: course.level,
      duration: course.duration,

      modules: course.modules.map((module) => {
        const totalLessons = module.lessons.length;

        const completedLessons = module.lessons.filter((lesson) =>
          lesson.completedBy.some(
            (userId) => userId.toString() === req.user?.id
          )
        ).length;

        const progress =
          totalLessons === 0
            ? 0
            : Math.floor((completedLessons / totalLessons) * 100);

        return {
          _id: module._id,
          title: module.title,
          progress,

          lessons: [
            // 🎥 VIDEO LESSONS
            ...module.lessons.map((lesson) => ({
              _id: lesson._id,
              type: "video",
              title: lesson.title,
              duration: lesson.duration,
              videoUrl: lesson.videoUrl,
              completed: lesson.completedBy.some(
                (userId) => userId.toString() === req.user?.id
              ),
            })),

            // 📝 QUIZZES
            ...module.quizzes.map((quiz) => ({
              _id: quiz._id,
              type: "quiz",
              title: quiz.title,
              duration: 0,
              completed: false,
            })),
          ],
        };
      }),
    }));

    res.status(200).json({
      success: true,
      courses: formattedCourses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ======================================================
   2️⃣ GET SINGLE PUBLISHED COURSE
====================================================== */
exports.getSinglePublishedCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ======================================================
   3️⃣ UPDATE LESSON PROGRESS (LIVE TRACKING SUPPORT)
====================================================== */







exports.updateLessonProgress = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.params;
    const { progress } = req.body;

    const course = await Course.findOne({
      _id: courseId,
      enrolledStudents: req.user.id,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not enrolled",
      });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }

    const lesson = module.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // ================= UPDATE progressBy =================
    const existingProgress = lesson.progressBy.find(
      (p) => p.userId.toString() === req.user.id
    );

    if (existingProgress) {
      existingProgress.percent = progress >= 95 ? 100 : progress;
    } else {
      lesson.progressBy.push({
        userId: req.user.id,
        percent: progress >= 95 ? 100 : progress,
      });
    }

    // ================= MARK COMPLETED =================
    if (progress >= 95) {
      const alreadyCompleted = lesson.completedBy.some(
        (userId) => userId.toString() === req.user.id
      );

      if (!alreadyCompleted) {
        lesson.completedBy.push(req.user.id);
      }
    }

    await course.save();

    res.status(200).json({
      success: true,
      progress: progress >= 95 ? 100 : progress,
      courseId,
      moduleId,
      lessonId,
      completed: progress >= 95,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ======================================================
   4️⃣ GET COMPLETED COURSES (ENROLLED + FULLY DONE)
====================================================== */

/* ======================================================
   4️⃣ GET COMPLETED COURSES 
   (ENROLLED + ALL LESSONS 100%)
====================================================== */

exports.getCompletedCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔒 Only courses where user is enrolled
    const courses = await Course.find({
      enrolledStudents: userId,
      isPublished: true,
    });

    const completedCourses = [];

    for (const course of courses) {

      let courseComplete = true;

      const formattedModules = [];

      for (const module of course.modules) {

        let moduleComplete = true;
        const formattedLessons = [];

        for (const lesson of module.lessons) {

          // 🔎 Find user progress
          const userProgress = lesson.progressBy.find(
            (p) => p.userId.toString() === userId
          );

          const percent = userProgress ? userProgress.percent : 0;

          if (percent < 100) {
            moduleComplete = false;
            courseComplete = false;
          }

          formattedLessons.push({
            _id: lesson._id,
          });
        }

        formattedModules.push({
          _id: module._id,
          title: module.title,
          progress: moduleComplete ? 100 : 0,
          lessons: formattedLessons,
        });
      }

      // ✅ If ALL modules 100 → Course complete
      if (courseComplete && course.modules.length > 0) {
        completedCourses.push({
          _id: course._id,
          title: course.title,
          duration: course.duration,
          progress: 100,
          modules: formattedModules,
        });
      }
    }

    res.status(200).json({
      success: true,
      completedCourses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};