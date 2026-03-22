import { useEffect, useState } from "react";

import { FiEdit2 } from "react-icons/fi";
import Navbar from "../../components/teacher/Navbar";
import Footer from "../../components/common/Footer";

const TeacherProfile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [about, setAbout] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    preferred: "",
  });

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
        setAbout(data.user.about || "");
        setContact({
          email: data.user.email || "",
          phone: data.user.phone || "",
          preferred: data.user.preferredContact || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH COURSES ================= */
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          about,
          phone: contact.phone,
          preferredContact: contact.preferred,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setProfile(data.user);
        setIsEditingAbout(false);
        alert("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return;

    Promise.all([fetchProfile(), fetchCourses()]).finally(() =>
      setLoading(false),
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  /* ================= CALCULATED STATS ================= */
  const totalPublished = courses.filter((c) => c.status === "Published").length;

  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);

  const mostPopular =
    courses.length > 0
      ? courses.reduce((max, c) => (c.students > max.students ? c : max)).title
      : "-";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 py-10 space-y-8">
        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <h2 className="text-lg font-semibold">{profile?.fullName}</h2>
              <p className="text-sm text-gray-500">
                {profile?.role === "educator" ? "Instructor" : profile?.role}
              </p>
              <p className="text-xs text-gray-400">
                {profile?.location || "Location not set"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Courses Published" value={totalPublished} />
          <StatCard
            title="Total Enrolled Students"
            value={totalStudents.toLocaleString()}
          />
          <StatCard
            title="Teaching Since"
            value={
              profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "-"
            }
          />
          <StatCard title="Most Popular Course" value={mostPopular} />
        </div>

        {/* ================= ABOUT ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 relative">
          <h3 className="font-semibold mb-3">About Us</h3>

          {!isEditingAbout ? (
            <p className="text-sm text-gray-600">
              {about || "No description added yet."}
            </p>
          ) : (
            <textarea
              className="w-full border border-gray-200 rounded-lg p-3 text-sm"
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          )}

          <div
            className="absolute top-6 right-6 bg-yellow-400 p-2 rounded-full cursor-pointer"
            onClick={() => setIsEditingAbout(!isEditingAbout)}
          >
            <FiEdit2 size={14} />
          </div>

          {isEditingAbout && (
            <button
              onClick={handleSave}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-lg text-sm font-medium"
            >
              Save
            </button>
          )}
        </div>

        {/* ================= COURSES CREATED ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
          <h3 className="font-semibold">Courses created</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((course) => (
              <div
                key={course._id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{course.title}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      course.status === "Published"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  {course.students} students
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className="text-lg font-semibold mt-2">{value}</h2>
    </div>
  );
};

export default TeacherProfile;
