import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const INITIAL_COUNT = 4;

export default function LatestCourses() {
  const token = localStorage.getItem("token");

  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/courses/my-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data.success) {
          // Sort by updated date (latest first)
          const sorted = data.courses
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((course) => ({
              title: course.title,
              enrollments: course.enrollments || 0,
            }));

          setCourses(sorted);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [token]);

  const visibleCourses = expanded ? courses : courses.slice(0, INITIAL_COUNT);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Latest Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCourses.map((course, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              bg-white
              border border-gray-200
              rounded-xl
              px-5 py-4
              hover:shadow-sm
              transition
            "
          >
            <div>
              <p className="font-medium text-gray-900">{course.title}</p>
              <p className="text-sm text-gray-500 mt-1">
                Enrollments: {course.enrollments}
              </p>
            </div>

            <HiOutlineDotsVertical className="text-gray-400 cursor-pointer" />
          </div>
        ))}
      </div>

      {courses.length > INITIAL_COUNT && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="
            border border-yellow-400
            px-6 py-2
            rounded-lg
            text-sm
            hover:bg-yellow-50
            transition
          "
        >
          {expanded ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
}
