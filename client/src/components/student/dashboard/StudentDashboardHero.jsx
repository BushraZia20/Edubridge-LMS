import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Courses Completed", value: "2", change: "5% increase" },
  { title: "Time Spent Learning", value: "15h 20m", change: "3% increase" },
  { title: "Learning Streak", value: "10 days", change: "10% increase" },
  { title: "Goal Progress", value: "80%", change: "2% increase" },
];

const StudentDashboardHero = () => {
  const navigate = useNavigate();
  const progress = 60; // 🔥 Just change this dynamically later

  return (
    <section className="px-10 pt-10 ">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>

          <p className="text-gray-600 mt-3 text-sm">
            You’ve completed 3 out of 5 courses this month. Keep it up!
          </p>

          <button
            onClick={() => navigate("/s-enrolled-courses")}
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-lg font-semibold text-sm"
          >
            Continue Last Course
          </button>
        </div>

        {/* RIGHT SIDE - PROGRESS BAR */}
        <div className="mt-10 lg:mt-0 w-32 h-32">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              pathColor: "#facc15", // yellow
              textColor: "#000",
              trailColor: "#e5e7eb", // gray background
              textSize: "18px",
            })}
          />
          <p className="text-center text-xs text-gray-600 mt-2">Completed</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
        {stats.map((item) => (
          <div
            key={item.title}
            className="border border-yellow-300 rounded-xl p-6 bg-white"
          >
            <p className="text-sm text-gray-700">{item.title}</p>

            <h2 className="text-3xl font-bold mt-4">{item.value}</h2>

            <p className="text-blue-500 text-xs mt-3">{item.change}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentDashboardHero;
