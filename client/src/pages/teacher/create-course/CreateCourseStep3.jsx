import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/teacher/Navbar";
import CreateCourseSteps from "../../../components/teacher/createCourse/CreateCourseSteps";
import Footer from "../../../components/common/Footer";

const CreateCourseStep3 = () => {
  const navigate = useNavigate();
  const courseId = localStorage.getItem("currentCourseId");
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);

  /* ================= FETCH COURSE ================= */
  const fetchCourse = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const current = data.courses.find((c) => c._id === courseId);

      if (current) {
        setCourse(current);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!courseId) navigate("/t-my-courses");
    fetchCourse();
  }, []);

  /* ================= PUBLISH ================= */
  const handlePublish = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${courseId}/publish`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Course Published Successfully 🎉");
        localStorage.removeItem("currentCourseId");
        navigate("/t-my-courses");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DRAFT ================= */
  const handleDraft = async () => {
    try {
      await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: false }),
      });

      alert("Saved as Draft ✅");
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CALCULATIONS ================= */
  const totalModules = course?.modules?.length || 0;

  const totalItems =
    course?.modules?.reduce((total, module) => {
      const lessons = module.lessons?.length || 0;
      const quizzes = module.quizzes?.length || 0;
      return total + lessons + quizzes;
    }, 0) || 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="block md:hidden">
            <CreateCourseSteps currentStep={3} orientation="horizontal" />
          </div>

          <div className="hidden md:block">
            <CreateCourseSteps currentStep={3} orientation="vertical" />
          </div>

          <div className="flex-1 max-w-full lg:max-w-[820px]">
            <h1 className="text-2xl font-semibold text-black">
              Confirm & Publish
            </h1>

            <p className="text-gray-500 mt-2 mb-10 text-sm max-w-[520px]">
              Review your course details before publishing.
            </p>

            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50 mb-12">
              <div className="h-56 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                {course?.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  "Course Preview Image / Summary"
                )}
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Course Title:
                  </span>{" "}
                  {course?.title || "Your Course Title"}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Total Modules:
                  </span>{" "}
                  {totalModules}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    Lessons & Quizzes:
                  </span>{" "}
                  {totalItems} items
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={handleDraft}
                className="border border-gray-300 px-6 py-2 rounded-lg text-sm"
              >
                Save as Draft
              </button>

              <button
                onClick={handlePublish}
                className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCourseStep3;
