import { useEffect, useState } from "react";
import Navbar from "../../components/teacher/Navbar";
import Hero from "../../components/teacher/Hero";
import MonthlyEngagementChart from "../../components/common/charts/MonthlyEngagementChart";
import CourseCompletionChart from "../../components/common/charts/CourseCompletionChart";
import StudentGrowthChart from "../../components/common/charts/StudentGrowthChart";
import LatestCourses from "../../components/teacher/LatestCourses";
import Footer from "../../components/common/Footer";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard/teacher", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setCourses(data.data.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      <section className="px-6 md:px-10 pb-16 mt-10 space-y-14">
        <MonthlyEngagementChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CourseCompletionChart courses={courses} />
          <StudentGrowthChart />
        </div>
        <LatestCourses courses={courses} />
      </section>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
