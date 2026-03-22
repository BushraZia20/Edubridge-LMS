import { useState, useEffect } from "react";
import ActiveCourseCard from "./ActiveCourseCard";

const ActiveCourseList = () => {
  const INITIAL_COUNT = 4;

  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      if (!token) {
        console.log("❌ No token found");
        setLoading(false);
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/courses/my-enrolled-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("STATUS:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.log("API ERROR:", errorText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("DATA:", data);

      if (data.success) {
        const formattedCourses = data.courses.map((course) => {
          const totalModules = course.modules.length;

          const overallProgress =
            totalModules === 0
              ? 0
              : Math.floor(
                  course.modules.reduce(
                    (acc, module) => acc + module.progress,
                    0,
                  ) / totalModules,
                );

          return {
            _id: course._id,
            title: course.title,
            image: course.thumbnail,
            instructor: "Instructor",
            progress: overallProgress,
            modules: course.modules,
          };
        });

        setCourses(formattedCourses);
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const showMore = () => setVisible((v) => v + 4);
  const showLess = () => setVisible(INITIAL_COUNT);

  const allVisible = visible >= courses.length;

  if (loading) {
    return (
      <div className="bg-gray-50 px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900">My Active Courses</h2>
        <p className="text-gray-500 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">My Active Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">
        Here’s what you’re currently learning
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, visible).map((course) => (
          <ActiveCourseCard key={course._id} course={course} />
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        {!allVisible && (
          <button
            onClick={showMore}
            className="border border-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-50 transition-all duration-300 text-sm"
          >
            See more
          </button>
        )}

        {allVisible && visible > INITIAL_COUNT && (
          <button
            onClick={showLess}
            className="border border-yellow-400 text-gray-800 px-5 py-2 rounded-lg hover:bg-yellow-50 transition-all duration-300 text-sm"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveCourseList;
