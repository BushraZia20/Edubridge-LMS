import { AiFillStar } from "react-icons/ai";

export default function TestimonialCard({
  name = "Student",
  course = "Course Name",
  text = "Amazing learning experience!",
  time = "2D",
  avatar = "https://i.pravatar.cc/100",
}) {
  return (
    <div
      className="
        rounded-2xl
        p-6
        bg-white
        border
        border-gray-200
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]
        hover:-translate-y-[4px]
        transition-all
        duration-300
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img
            src={avatar}
            alt={name}
            className="w-11 h-11 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-gray-500 text-sm">{course}</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{time}</p>
      </div>

      {/* TEXT */}
      <p className="text-gray-600 mt-4 leading-7">{text}</p>

      {/* RATING */}
      <div className="flex text-yellow-400 text-lg mt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <AiFillStar key={i} />
        ))}
      </div>
    </div>
  );
}
