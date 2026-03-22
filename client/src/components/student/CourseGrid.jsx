import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  const INITIAL_COUNT = 4;
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURSES ================= */
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/student/courses");
      const data = await res.json();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
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
      <div className="max-w-7xl mx-auto px-6 mt-8">Loading courses...</div>
    );
  }

  return (
    <>
      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.slice(0, visible).map((item, i) => (
          <div
            key={`${item._id}-${i}`}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-[fadeUp_0.4s_ease-out]"
          >
            <CourseCard {...item} />
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="max-w-7xl mx-auto px-6 flex gap-3">
        {!allVisible && (
          <button
            onClick={showMore}
            className="
              border border-yellow-400 
              text-gray-800 
              px-5 py-2 rounded-lg
              mt-6
              hover:bg-yellow-50
              transition-all duration-300
              text-sm
            "
          >
            See more
          </button>
        )}

        {allVisible && visible > INITIAL_COUNT && (
          <button
            onClick={showLess}
            className="
              border border-yellow-400 
              text-gray-800 
              px-5 py-2 rounded-lg
              mt-6
              hover:bg-yellow-50
              transition-all duration-300
              text-sm
            "
          >
            Show less
          </button>
        )}
      </div>
    </>
  );
}
