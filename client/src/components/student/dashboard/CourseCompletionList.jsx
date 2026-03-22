import { useState, useEffect } from "react";
import CourseCompletionCard from "./CourseCompletionCard";

const CourseCompletionList = () => {
  const INITIAL_COUNT = 4;

  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const showMore = () => setVisible((prev) => prev + 2);
  const showLess = () => setVisible(INITIAL_COUNT);

  const allVisible = visible >= courses.length;

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/student/completed-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          setCourses(data.completedCourses);
        }
      } catch (error) {
        console.error("Failed to fetch completed courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  }, []);

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">Completed Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">
        You've finished these. Great job!
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500">No completed courses yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, visible).map((course) => (
              <CourseCompletionCard key={course._id} course={course} />
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            {!allVisible && (
              <button
                onClick={showMore}
                className="border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
              >
                See more
              </button>
            )}

            {allVisible && visible > INITIAL_COUNT && (
              <button
                onClick={showLess}
                className="border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
              >
                Show less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseCompletionList;
