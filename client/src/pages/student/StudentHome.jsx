import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/student/Navbar";
import Hero from "../../components/student/Hero";
import SectionTitle from "../../components/student/SectionTitle";
import CourseGrid from "../../components/student/CourseGrid";
import CategoryCard from "../../components/student/CategoryCard";
import TestimonialCard from "../../components/student/TestimonialCard";
import Footer from "../../components/common/Footer";

export default function StudentHome() {
  const recommendedRef = useRef(null);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/courses/my-enrolled-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setEnrolledCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <Hero
        hasCourses={enrolledCourses.length > 0}
        scrollToRecommended={() =>
          recommendedRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      />

      {/* Recommended */}
      <div ref={recommendedRef} className="scroll-mt-24">
        <SectionTitle
          title="Recommended Courses"
          subtitle="Courses handpicked for you, John"
        />
      </div>

      <CourseGrid />

      {/* Trending */}
      <SectionTitle
        title="Trending Now"
        subtitle="Start learning what's popular today"
      />

      <CourseGrid />

      {/* Categories */}
      <SectionTitle
        title="Category Explorer"
        subtitle="Browse courses by learning area"
      />

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { title: "UI/UX Design" },
          { title: "Web Development" },
          { title: "AI & Machine Learning" },
          { title: "Business & Marketing" },
          { title: "Finance" },
          { title: "Personal Development" },
          { title: "Languages" },
          { title: "Education & Teaching" },
        ].map((c) => (
          <CategoryCard key={c.title} {...c} />
        ))}
      </div>

      {/* New */}
      <SectionTitle
        title="New Courses"
        subtitle="Recently added — start exploring!"
      />

      <CourseGrid />

      {/* Testimonials */}
      <SectionTitle title="Testimonials" />

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {[1, 2, 3].map((i) => (
          <TestimonialCard key={i} />
        ))}
      </div>

      <Footer />
    </>
  );
}
