import { useEffect, useState } from "react";
import RecommendedCourseCard from "./RecommendedCourseCard";

const RecommendedCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(4);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/student/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const showMore = () => setVisible((prev) => prev + 2);
  const showLess = () => setVisible(4);

  const allVisible = visible >= courses.length;

  return (
    <div className="bg-gray-50 px-8 py-10">
      <h2 className="text-2xl font-bold text-gray-900">Recommended Courses</h2>

      <p className="text-gray-500 mt-2 mb-8">Courses handpicked for you.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.slice(0, visible).map((course) => (
          <RecommendedCourseCard key={course._id} course={course} />
        ))}
      </div>

      {!allVisible && (
        <button
          onClick={showMore}
          className="mt-6 border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
        >
          See more
        </button>
      )}

      {allVisible && visible > 4 && (
        <button
          onClick={showLess}
          className="mt-6 border border-yellow-400 px-5 py-2 rounded-md text-sm hover:bg-yellow-50"
        >
          Show less
        </button>
      )}
    </div>
  );
};

export default RecommendedCourseList;
