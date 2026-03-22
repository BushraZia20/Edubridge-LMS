import { useNavigate } from "react-router-dom";

const RecommendedCourseCard = ({ course }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const handleNavigate = () => {
    navigate(`/CourseDetailsForStudent/${course._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="
        rounded-2xl
        p-4
        bg-white
        border
        border-gray-200
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-44 object-cover rounded-lg"
      />

      <div className="mt-4">
        <p className="text-sm text-gray-500">{course.instructor}</p>

        <h3 className="font-semibold text-gray-900 mt-1">{course.title}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <span className="text-yellow-500">★</span>
          <span>{course.rating}</span>
          <span>•</span>
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCourseCard;
