import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";

const QuizPage = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [quizScore, setQuizScore] = useState(null);

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/student/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();

        if (data.success) {
          setCourse(data.course);
        } else {
          navigate("/s-enrolled-courses");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [courseId]);

  // ================= FETCH QUIZ SCORE =================
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${courseId}/${moduleId}/${lessonId}/quiz-score`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();

        if (data.success && data.score !== null && data.score !== undefined) {
          setQuizScore(data.score);
        } else {
          // fallback: check localStorage
          const storageKey = `quiz-score-${courseId}-${moduleId}-${lessonId}`;
          const saved = localStorage.getItem(storageKey);
          if (saved !== null) setQuizScore(saved);
        }
      } catch (err) {
        // fallback: check localStorage
        const storageKey = `quiz-score-${courseId}-${moduleId}-${lessonId}`;
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) setQuizScore(saved);
      }
    };

    fetchScore();
  }, [courseId, moduleId, lessonId]);

  if (!course) return <div className="pt-24 px-10">Loading...</div>;

  const moduleIndex = course.modules.findIndex((m) => m._id === moduleId);
  const module = course.modules[moduleIndex];
  if (!module) return <div className="pt-24 px-10">Module not found</div>;

  // ✅ Merge lessons + quizzes
  const combinedLessons = [
    ...module.lessons.map((l) => ({ ...l, type: "video" })),
    ...module.quizzes.map((q) => ({
      ...q,
      type: "quiz",
      duration: "Quiz",
    })),
  ];

  const lessonIndex = combinedLessons.findIndex((l) => l._id === lessonId);
  const lesson = combinedLessons[lessonIndex];

  if (!lesson) return <div className="pt-24 px-10">Quiz not found</div>;

  // ================= NEXT / PREV =================
  let nextLesson = null;
  let nextModuleId = moduleId;
  let prevLesson = null;
  let prevModuleId = moduleId;

  if (lessonIndex < combinedLessons.length - 1) {
    nextLesson = combinedLessons[lessonIndex + 1];
    nextModuleId = moduleId;
  } else if (moduleIndex < course.modules.length - 1) {
    const nextModule = course.modules[moduleIndex + 1];
    const nextCombined = [
      ...nextModule.lessons.map((l) => ({ ...l, type: "video" })),
      ...nextModule.quizzes.map((q) => ({ ...q, type: "quiz" })),
    ];
    nextLesson = nextCombined[0] || null;
    nextModuleId = nextModule._id;
  }

  if (lessonIndex > 0) {
    prevLesson = combinedLessons[lessonIndex - 1];
    prevModuleId = moduleId;
  } else if (moduleIndex > 0) {
    const prevModule = course.modules[moduleIndex - 1];
    const prevCombined = [
      ...prevModule.lessons.map((l) => ({ ...l, type: "video" })),
      ...prevModule.quizzes.map((q) => ({ ...q, type: "quiz" })),
    ];
    prevLesson = prevCombined[prevCombined.length - 1] || null;
    prevModuleId = prevModule._id;
  }

  const getLessonPath = (l, mId) =>
    l.type === "quiz"
      ? `/student-course/${course._id}/${mId}/${l._id}/quiz`
      : `/student-course/${course._id}/${mId}/${l._id}/learn`;

  const totalQuestions = lesson.questions?.length || 0;

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-12">
          {/* ================= SIDEBAR ================= */}
          <div className="hidden md:block w-72">
            <div className="bg-white border border-gray-200 rounded-xl p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {course.title}
              </h2>

              {/* All modules */}
              <div className="space-y-6">
                {course.modules.map((mod, modIdx) => {
                  const modCombined = [
                    ...mod.lessons.map((l) => ({ ...l, type: "video" })),
                    ...mod.quizzes.map((q) => ({
                      ...q,
                      type: "quiz",
                      duration: "Quiz",
                    })),
                  ];
                  return (
                    <div key={mod._id}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                        Module {modIdx + 1}: {mod.title}
                      </p>
                      <div className="space-y-2">
                        {modCombined.map((l) => {
                          const isActive =
                            l._id === lesson._id && mod._id === moduleId;
                          return (
                            <Link
                              key={l._id}
                              to={getLessonPath(l, mod._id)}
                              className={`block rounded-lg p-4 border transition-all ${
                                isActive
                                  ? "bg-gray-200 border-gray-300"
                                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 flex items-center justify-center border border-gray-400 rounded flex-shrink-0">
                                  {l.type === "video" ? "▶" : "≡"}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {l.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {l.duration}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Grades</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex-1">
            <div className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{lesson.title}</h1>

              <div className="flex gap-6 text-sm">
                {prevLesson && (
                  <Link
                    to={getLessonPath(prevLesson, prevModuleId)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ← Previous
                  </Link>
                )}

                {nextLesson && (
                  <Link
                    to={getLessonPath(nextLesson, nextModuleId)}
                    className="text-yellow-500 hover:text-yellow-600 font-medium"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>

            {/* QUIZ INFO CARD */}
            <div className="bg-white border border-yellow-400 rounded-2xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  {totalQuestions > 0 ? `${totalQuestions} Questions` : "Quiz"}{" "}
                  {lesson.duration && lesson.duration !== "Quiz"
                    ? `• ${lesson.duration}`
                    : ""}
                </p>
              </div>

              <Link
                to={`/student-course/${course._id}/${module._id}/${lesson._id}/quiz/attempt`}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md font-medium"
              >
                {quizScore !== null ? "Retake" : "Start"}
              </Link>
            </div>

            {/* GRADE CARD */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="font-medium">Your grade</h3>

              {quizScore !== null ? (
                <p className="text-sm text-gray-700 mt-2">
                  You scored <span className="font-semibold">{quizScore}</span>{" "}
                  {totalQuestions > 0 ? `out of ${totalQuestions}` : ""}
                </p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  You haven't submitted this yet. We keep your highest score.
                </p>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default QuizPage;
