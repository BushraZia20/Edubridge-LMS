import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

const FALLBACK_DATA = [
  { label: "Jan", value: 20 },
  { label: "Feb", value: 35 },
  { label: "Mar", value: 28 },
  { label: "Apr", value: 45 },
  { label: "May", value: 60 },
  { label: "Jun", value: 40 },
  { label: "Jul", value: 55 },
  { label: "Aug", value: 50 },
  { label: "Sep", value: 70 },
  { label: "Oct", value: 48 },
  { label: "Nov", value: 65 },
  { label: "Dec", value: 52 },
];

const average = (arr) =>
  Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);

const group = (data, size) => {
  const result = [];
  for (let i = 0; i < data.length; i += size) {
    const slice = data.slice(i, i + size);
    result.push({
      label: slice.map((m) => m.label).join("–"),
      value: average(slice.map((m) => m.value)),
    });
  }
  return result;
};

const MonthlyEngagementChart = ({ courses = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const updateData = () => {
      const w = window.innerWidth;

      // 🔥 If no real courses → use fallback demo analytics
      let baseData;

      if (courses.length === 0) {
        baseData = FALLBACK_DATA;
      } else {
        const months = Array(12).fill(0);

        courses.forEach((course) => {
          if (course.createdAt) {
            const m = new Date(course.createdAt).getMonth();
            months[m] += 1;
          }
        });

        baseData = months.map((val, i) => ({
          label: new Date(0, i).toLocaleString("default", {
            month: "short",
          }),
          value: val,
        }));
      }

      if (w <= 425) {
        setChartData([
          {
            label: "Year Avg",
            value: average(baseData.map((d) => d.value)),
          },
        ]);
      } else if (w < 768) {
        setChartData(group(baseData, 3));
      } else {
        setChartData(baseData);
      }
    };

    updateData();
    window.addEventListener("resize", updateData);
    return () => window.removeEventListener("resize", updateData);
  }, [courses]);

  const data = {
    labels: chartData.map((d) => d.label),
    datasets: [
      {
        data: chartData.map((d) => d.value),
        backgroundColor: "#FFD700",
        borderRadius: 6,
        categoryPercentage: 0.9,
        barPercentage: chartData.length === 1 ? 0.4 : 0.95,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10, left: 10, right: 10, bottom: 12 },
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10, color: "#6B7280" },
        grid: {
          color: "#E5E7EB",
          borderDash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-[340px]">
      <h3 className="font-semibold mb-4">Student Monthly Engagement</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyEngagementChart;
