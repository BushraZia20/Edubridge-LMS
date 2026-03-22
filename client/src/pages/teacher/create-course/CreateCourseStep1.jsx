import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../../components/teacher/Navbar";
import CreateCourseSteps from "../../../components/teacher/createCourse/CreateCourseSteps";
import Footer from "../../../components/common/Footer";

const CreateCourseStep1 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const courseId = localStorage.getItem("currentCourseId");
  const isEditMode = !!courseId;

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    category: "",
    level: "",
    duration: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= FETCH COURSE (EDIT MODE) ================= */
  useEffect(() => {
    if (!isEditMode || !token) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          const c = data.course;
          setForm({
            title: c.title || "",
            shortDescription: c.shortDescription || "",
            category: c.category || "",
            level: c.level || "",
            duration: c.duration || "",
            thumbnail: c.thumbnail || "",
          });
        }
      } catch (err) {
        console.error("Prefill error:", err);
      }
    };

    fetchCourse();
  }, [courseId, token, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!form.title || !form.shortDescription) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        // UPDATE COURSE
        await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        // CREATE COURSE
        const response = await fetch("http://localhost:5000/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Something went wrong");
          return;
        }

        localStorage.setItem("currentCourseId", data.course._id);
      }

      navigate("/teacher/create-course/step-2");
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* Steps */}
          <div className="block md:hidden">
            <CreateCourseSteps currentStep={1} orientation="horizontal" />
          </div>

          <div className="hidden md:block">
            <CreateCourseSteps currentStep={1} orientation="vertical" />
          </div>

          {/* Form */}
          <div className="flex-1 max-w-full lg:max-w-[820px]">
            <h1 className="text-2xl font-semibold text-black">Basic Info</h1>
            <p className="text-gray-500 mt-2 mb-8 text-sm max-w-full lg:max-w-[520px]">
              Add the course title, description, category, and a thumbnail to
              introduce your course.
            </p>

            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDE INPUTS */}
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  />

                  <input
                    type="text"
                    name="shortDescription"
                    placeholder="Short Description"
                    value={form.shortDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm"
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600"
                  >
                    <option value="">Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                {/* THUMBNAIL SECTION */}
                <div className="w-full lg:w-[260px]">
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="Paste Thumbnail Image URL"
                    value={form.thumbnail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm mb-3"
                  />

                  {form.thumbnail && (
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-[180px] object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              {/* LEVEL + DURATION */}
              <div className="flex flex-col sm:flex-row gap-6">
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600"
                >
                  <option value="">Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                </select>

                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600"
                >
                  <option value="">Estimated Duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="5 hours">5 hours</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-4 mt-12">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-yellow-400 px-7 py-2 rounded-lg text-sm font-medium"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update & Continue"
                    : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCourseStep1;
