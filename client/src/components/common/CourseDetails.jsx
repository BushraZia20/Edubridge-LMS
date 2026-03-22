import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";

const CourseDetails = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH COURSE FROM BACKEND
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/student/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          setCourse(data.course);
        } else {
          navigate("/my-enrolled-courses");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="pt-24 px-10">Loading...</div>;
  if (!course) return <div className="pt-24 px-10">Course not found</div>;

  const activeModule = course.modules.find((m) => m._id === moduleId);
  const activeLesson = activeModule?.lessons.find((l) => l._id === lessonId);

  if (!activeModule || !activeLesson)
    return <div className="pt-24 px-10">Module or Lesson not found</div>;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 flex flex-col">
        <div className="flex flex-1 px-8 lg:px-16 py-10 gap-10">
          {/* LEFT SIDEBAR */}
          <div className="hidden md:block w-64">
            <div className="bg-white border border-gray-200 rounded-xl p-6 max-h-[60vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-6">{course.title}</h2>

              <p className="text-sm text-gray-500 mb-4">Courses Material</p>

              <div className="space-y-3">
                {course.modules.map((module) => (
                  <Link
                    key={module._id}
                    to={`/student-course/${course._id}/${module._id}/${module.lessons[0]?._id}`}
                    className={`block px-4 py-3 rounded-lg text-sm transition ${
                      moduleId === module._id
                        ? "bg-gray-200 font-medium"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {module.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-xl font-semibold">{activeModule.title}</h1>
            </div>

            <div className="space-y-4">
              {[
                ...(activeModule.lessons || []).map((lesson) => ({
                  ...lesson,
                  type: "video",
                })),
                ...(activeModule.quizzes || []).map((quiz) => ({
                  ...quiz,
                  type: "quiz",
                })),
              ].map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-white border border-gray-200 rounded-xl px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center border rounded-md text-sm">
                      {item.type === "quiz" ? "❓" : "▶"}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.type === "quiz"
                          ? "Quiz"
                          : `Video • ${item.duration}`}
                      </p>
                    </div>
                  </div>

                  {/* <Link
                    to={`/student-course/${course._id}/${activeModule._id}/${item._id}`}
                    className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md text-sm font-medium"
                  >
                    Open
                  </Link> */}
                  <Link
                    to={
                      item.type === "quiz"
                        ? `/student-course/${course._id}/${activeModule._id}/${item._id}/quiz`
                        : `/student-course/${course._id}/${activeModule._id}/${item._id}/learn`
                    }
                    className="
                      bg-yellow-400 hover:bg-yellow-500
                      px-6 py-2 rounded-md
                      text-sm font-medium
                    "
                  >
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;
