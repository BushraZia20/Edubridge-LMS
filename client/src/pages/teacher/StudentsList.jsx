import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiTrash2, FiExternalLink } from "react-icons/fi";
import Navbar from "../../components/teacher/Navbar";
import Footer from "../../components/common/Footer";

const StudentsList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 6;

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/students", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE STUDENT ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/students/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();

      if (data.success) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= VIEW PROFILE ================= */
  const handleViewProfile = (id) => {
    navigate(`/teacher/students/${id}`);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 md:px-12 py-12">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Students
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Manage and monitor your enrolled learners
            </p>
          </div>

          <div className="text-sm text-gray-500 font-medium">
            {students.length} Total
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5 text-left">Student</th>
                  <th className="px-8 py-5 text-left">Email</th>
                  <th className="px-8 py-5 text-left">Role</th>
                  <th className="px-8 py-5 text-left">Joined</th>
                  <th className="px-8 py-5 text-left">Status</th>
                  <th className="px-8 py-5 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={`https://ui-avatars.com/api/?name=${student.fullName}&background=FACC15&color=000`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.fullName}
                            </p>
                            <p className="text-xs text-gray-400">
                              ID: {student._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-gray-700">
                        {student.email}
                      </td>

                      <td className="px-8 py-6 capitalize text-gray-700">
                        {student.role}
                      </td>

                      <td className="px-8 py-6 text-gray-500">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-8 py-6">
                        <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                          Active
                        </span>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          {/* ✅ PROFILE VIEW BUTTON */}
                          <FiExternalLink
                            onClick={() => handleViewProfile(student._id)}
                            className="text-gray-400 hover:text-yellow-500 cursor-pointer transition"
                          />

                          {/* DELETE BUTTON */}
                          <FiTrash2
                            onClick={() => handleDelete(student._id)}
                            className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-20 text-gray-400">
                      No students available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-lg transition font-medium disabled:opacity-40"
            >
              ← Prev
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-gray-100 hover:bg-yellow-400 hover:text-black text-sm rounded-lg transition font-medium disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StudentsList;
