import { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiBell, FiChevronDown } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  /* ================= ACTIVE ROUTE ================= */
  const isActive = (path) => location.pathname.startsWith(path);

  /* ================= CLOSE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentCourseId");
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between">
        {/* LOGO */}
        <h1
          className="text-2xl text-yellow-500 font-['Pacifico']!"
          onClick={() => navigate("/teacher-dashboard")}
        >
          EduBridge
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex gap-8 text-sm font-medium text-gray-500">
            <Link
              to="/teacher-dashboard"
              className={`transition ${
                isActive("/teacher-dashboard")
                  ? "text-yellow-500"
                  : "hover:text-yellow-500"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/t-my-courses"
              className={`transition ${
                isActive("/t-my-courses")
                  ? "text-yellow-500"
                  : "hover:text-yellow-500"
              }`}
            >
              My Courses
            </Link>

            <Link
              to="/teacher/students"
              className={`transition ${
                isActive("/teacher/students")
                  ? "text-yellow-500"
                  : "hover:text-yellow-500"
              }`}
            >
              Students
            </Link>

            {/* ✅ Assessment now properly routed */}
            <Link
              to="/teacher/assessment"
              className={`transition ${
                isActive("/teacher/assessment")
                  ? "text-yellow-500"
                  : "hover:text-yellow-500"
              }`}
            >
              Assessment
            </Link>
          </nav>

          <FiBell className="text-gray-500 hover:text-yellow-500 cursor-pointer transition" />

          {/* PROFILE DROPDOWN */}
          <div ref={menuRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-200"
              />
              <FiChevronDown
                className={`transition duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-50">
                <ul className="text-sm py-2">
                  {/* ✅ My Profile fixed */}
                  <li
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/teacher-profile");
                    }}
                  >
                    My Profile
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    Settings
                  </li>

                  <hr className="my-1 border-gray-100" />

                  <li
                    className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <FiMenu
          className="text-2xl cursor-pointer md:hidden"
          onClick={() => setMobileOpen(true)}
        />
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
          <h1
            className="text-2xl text-yellow-500 font-['Pacifico']!"
            onClick={() => {
              navigate("/teacher-dashboard");
              setMobileOpen(false);
            }}
          >
            EduBridge
          </h1>
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <nav className="flex flex-col gap-6 px-6 py-8 text-gray-600 font-medium text-sm">
          <Link
            to="/teacher-dashboard"
            onClick={() => setMobileOpen(false)}
            className={
              isActive("/teacher-dashboard")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            }
          >
            Dashboard
          </Link>

          <Link
            to="/t-my-courses"
            onClick={() => setMobileOpen(false)}
            className={
              isActive("/t-my-courses")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            }
          >
            My Courses
          </Link>

          <Link
            to="/teacher/students"
            onClick={() => setMobileOpen(false)}
            className={
              isActive("/teacher/students")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            }
          >
            Students
          </Link>

          {/* ✅ Assessment mobile route fixed */}
          <Link
            to="/teacher/assessment"
            onClick={() => setMobileOpen(false)}
            className={
              isActive("/teacher/assessment")
                ? "text-yellow-500"
                : "hover:text-yellow-500"
            }
          >
            Assessment
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
