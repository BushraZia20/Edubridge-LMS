import { useNavigate } from "react-router-dom";

const CourseCompletionCard = ({ course }) => {
  const navigate = useNavigate();

  if (!course) return null;

  return (
    <div
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
      {/* Image */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="
          w-full 
          h-44 
          object-cover 
          rounded-lg
        "
      />

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 text-base">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>

        {/* Button */}
        <button
          onClick={() => navigate(`/certificate/${course._id}`)}
          className="
            mt-4
            w-full
            bg-yellow-400
            hover:bg-yellow-500
            text-gray-900
            font-medium
            py-2
            rounded-lg
            transition-all
            duration-300
            hover:shadow-sm
          "
        >
          View Certificate
        </button>
      </div>
    </div>
  );
};

export default CourseCompletionCard;
