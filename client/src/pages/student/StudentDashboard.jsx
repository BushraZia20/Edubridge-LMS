import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";
import StudentDashboardHero from "../../components/student/dashboard/StudentDashboardHero";
import ActiveCourseList from "../../components/student/dashboard/ActiveCourseList";
import CourseCompletionList from "../../components/student/dashboard/CourseCompletionList";
import RecommendedCourseList from "../../components/student/dashboard/RecommendedCourseList";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <StudentDashboardHero />

      {/* DASHBOARD CONTENT */}
      <section className="px-6 md:px-10 pb-16 mt-10 space-y-14">
        {/* 🔥 Latest / New Courses (inside dashboard) */}
        <ActiveCourseList />
        <CourseCompletionList />
        <RecommendedCourseList />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentDashboard;
