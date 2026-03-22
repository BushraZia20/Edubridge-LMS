import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

const CourseCompletionChart = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [48, 37, 15],
        backgroundColor: ["#0057FF", "#FFD700", "#FF0000"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    // 🔑 keeps pie INSIDE rounded border
    layout: {
      padding: {
        top: 12,
        bottom: 12,
        left: 12,
        right: isMobile ? 12 : 20,
      },
    },

    plugins: {
      legend: {
        position: isMobile ? "bottom" : "right",
        labels: {
          boxWidth: 10,
          padding: 12,
          color: "#374151",
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-[320px] overflow-hidden">
      <h3 className="font-semibold mb-4">Course Completion</h3>

      {/* inner wrapper prevents canvas bleed */}
      <div className="relative h-[240px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CourseCompletionChart;
