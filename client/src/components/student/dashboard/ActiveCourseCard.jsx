import { useNavigate } from "react-router-dom";

const ActiveCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!course.modules || course.modules.length === 0) return;

    let targetModule = null;
    let targetLesson = null;

    // Find first incomplete lesson
    for (const module of course.modules) {
      if (!module.lessons || module.lessons.length === 0) continue;

      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          targetModule = module;
          targetLesson = lesson;
          break;
        }
      }

      if (targetLesson) break;
    }

    // If all lessons completed → go to last lesson
    if (!targetLesson) {
      const lastModule = course.modules[course.modules.length - 1];
      const lastLesson = lastModule.lessons[lastModule.lessons.length - 1];

      targetModule = lastModule;
      targetLesson = lastLesson;
    }

    if (!targetModule || !targetLesson) return;

    navigate(
      `/student-course/${course._id}/${targetModule._id}/${targetLesson._id}/learn`,
    );
  };

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
      <div className="overflow-hidden rounded-xl">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <p className="text-gray-500 text-sm mt-3">{course.instructor}</p>

      <h3 className="font-semibold text-lg mt-1 text-gray-900 leading-snug">
        {course.title}
      </h3>

      <p className="text-sm text-gray-600 mt-3">{course.progress}% Complete</p>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-700"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <button
        onClick={handleContinue}
        className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-lg transition-all duration-300"
      >
        Continue
      </button>
    </div>
  );
};

export default ActiveCourseCard;
