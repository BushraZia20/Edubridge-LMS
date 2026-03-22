import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  _id,
  thumbnail,
  author = "Course Instructor",
  title = "Course Title",
  rating = "4.8",
  duration = "5h 30m",
  level = "Beginner",
}) {
  const navigate = useNavigate();

  ///
  return (
    <div
      // onClick={() => navigate(`/course-details/${_id}`)}
      onClick={() => navigate(`/CourseDetailsForStudent/${_id}`)}
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
      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={
            thumbnail && thumbnail !== ""
              ? thumbnail
              : "https://picsum.photos/400/300"
          }
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* AUTHOR */}
      <p className="text-gray-500 text-sm mt-3">{author}</p>

      {/* TITLE */}
      <h3 className="font-semibold text-lg mt-1 leading-snug text-gray-900">
        {title}
      </h3>

      {/* META */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
        <AiFillStar className="text-yellow-400 text-base" />
        <span className="font-medium">{rating}</span>
        <span>•</span>
        <span>{duration}</span>
        <span>•</span>
        <span>{level}</span>
      </div>
    </div>
  );
}
