import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import Navbar from "../../components/teacher/Navbar";
import Footer from "../../components/common/Footer";

const StudentProfile = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [student, setStudent] = useState(null);

  /* ================= FETCH STUDENT ================= */
  const fetchStudent = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();

      if (data.success) {
        setStudent(data.student);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 py-12 space-y-8">
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <img
              src={`https://ui-avatars.com/api/?name=${student.fullName}&background=FACC15&color=000&size=120`}
              alt="avatar"
              className="w-24 h-24 rounded-full"
            />

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {student.fullName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">{student.email}</p>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <FiMapPin />
                <span>Registered User</span>
              </div>
            </div>
          </div>

          {/* <button className="bg-yellow-400 hover:bg-yellow-500 transition px-5 py-2 rounded-lg text-sm font-medium">
            Edit Profile
          </button> */}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-xl font-semibold text-gray-900 capitalize mt-2">
              {student.role}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-xl font-semibold text-gray-900 mt-2">
              {new Date(student.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-xl font-semibold text-green-600 mt-2">Active</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="text-xl font-semibold text-gray-900 mt-2">
              {student._id.slice(-6)}
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This student registered on{" "}
            {new Date(student.createdAt).toLocaleDateString()} and is currently
            enrolled in the platform.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentProfile;
