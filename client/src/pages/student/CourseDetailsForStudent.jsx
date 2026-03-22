import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiChevronDown, FiBookOpen, FiLock } from "react-icons/fi";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";

const CourseDetailsForStudent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  // ================= FETCH COURSE =================
  const fetchCourse = async () => {
    try {
      setLoading(true);
      let res;

      // Adjusting endpoint based on role
      const url =
        role === "educator"
          ? `http://localhost:5000/api/courses/${courseId}`
          : `http://localhost:5000/api/student/courses/${courseId}`;

      res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setCourse(data.course);

        // ✅ Logic to determine if "Start Learning" should show
        // 1. Check if the backend explicitly sent an isEnrolled flag
        // 2. Or check if the user ID exists in the course's enrolled list
        const alreadyEnrolled =
          data.isEnrolled || data.course.enrolledStudents?.includes(user?.id);

        setIsEnrolled(!!alreadyEnrolled);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!role || !token) {
      navigate("/login");
      return;
    }
    fetchCourse();
  }, [courseId]);

  // ================= ENROLL FUNCTION =================
  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setIsEnrolled(true); // Switch button to "Start Learning" immediately
      } else {
        alert(data.message || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("An error occurred during enrollment.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div className="animate-pulse">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Course not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-10 space-y-10">
        {/* ================= HEADER CARD ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
            <div className="flex gap-6 flex-col sm:flex-row">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full sm:w-64 h-40 object-cover rounded-2xl shadow-inner"
                />
              )}

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {course.title}
                </h1>
                <p className="text-gray-500 max-w-xl text-lg">
                  {course.shortDescription}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                    {course.level}
                  </span>
                  <span className="text-gray-500 py-1">
                    ⏱ {course.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="w-full md:w-auto">
              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-md disabled:opacity-50"
                >
                  {enrolling ? "Processing..." : "Enroll in Course"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    const firstModule = course.modules?.[0];
                    const firstLesson = firstModule?.lessons?.[0];

                    if (!firstModule || !firstLesson) {
                      alert("No content available in this course yet.");
                      return;
                    }

                    navigate(
                      `/student-course/${courseId}/${firstModule._id}/${firstLesson._id}`,
                    );
                  }}
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-md"
                >
                  Start Learning
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= CURRICULUM ================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
            <p className="text-sm text-gray-500">
              {course.modules?.length || 0} Modules Total
            </p>
          </div>

          <div className="grid gap-4">
            {course.modules?.map((module, index) => {
              const isOpen = openModule === module._id;

              return (
                <div
                  key={module._id}
                  className={`bg-white border rounded-2xl transition-all ${
                    isOpen
                      ? "border-yellow-200 ring-1 ring-yellow-100"
                      : "border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : module._id)}
                    className="w-full flex justify-between items-center px-6 py-5 focus:outline-none"
                  >
                    <div className="text-left">
                      <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                        Module {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {module.title}
                      </h3>
                    </div>
                    <FiChevronDown
                      className={`text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 space-y-3 animate-fadeIn">
                      {module.lessons?.map((lesson, i) => (
                        <div
                          key={lesson._id}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                            isEnrolled
                              ? "bg-gray-50 border-gray-100 hover:bg-white"
                              : "bg-gray-50 border-transparent opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {isEnrolled ? (
                              <FiBookOpen className="text-yellow-500 flex-shrink-0" />
                            ) : (
                              <FiLock className="text-gray-400 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">
                                {i + 1}. {lesson.title}
                              </p>
                              <p className="text-xs text-gray-500 uppercase tracking-tight">
                                {lesson.duration || "5 min"}
                              </p>
                            </div>
                          </div>
                          {!isEnrolled && (
                            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold">
                              LOCKED
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsForStudent;
