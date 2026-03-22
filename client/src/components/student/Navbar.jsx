import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import {
  FiBell,
  FiChevronDown,
  FiArrowRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentCourseId");
    navigate("/");
  };

  // close profile dropdown on outside click
  useEffect(() => {
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", handle);
    return () => window.removeEventListener("mousedown", handle);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-white px-6 md:px-10 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/student-home">
          <h1 className="text-2xl text-yellow-500 font-['Pacifico']!">
            EduBridge
          </h1>
        </Link>

        {/* SEARCH — ONLY DESKTOP */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center w-[60%] rounded-full px-5 py-2 bg-white border border-yellow-300">
            <input
              placeholder="What do you want to learn"
              className="flex-1 outline-none text-sm"
            />
            <button className="bg-yellow-400 p-2 rounded-full">
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-10">
          {/* NAVIGATION */}
          <nav className="flex gap-8 text-sm text-gray-500">
            <NavLink
              to="/student-home"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/s-enrolled-courses"
              className={({ isActive }) =>
                `cursor-pointer ${isActive ? "text-black font-medium" : ""}`
              }
            >
              My Courses
            </NavLink>
          </nav>

          <FiBell className="text-lg cursor-pointer" />

          {/* PROFILE DROPDOWN */}
          <div ref={menuRef} className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <img
                src="https://i.pravatar.cc/100"
                className="w-9 h-9 rounded-full cursor-pointer"
                alt="profile"
              />
              <FiChevronDown
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </div>

            {open && (
              <div className="absolute z-50 right-0 mt-3 bg-white shadow-2xl rounded-2xl w-48">
                <ul className="p-2 text-sm">
                  <li>
                    <Link
                      to="/student-profile"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 hover:bg-gray-100 rounded-lg"
                    >
                      My Profile
                    </Link>
                  </li>

                  {/* <li className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    Settings
                  </li> */}

                  <hr className="my-1" />

                  <li
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
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
          onClick={() => setMobileMenu(true)}
        />
      </header>

      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50
        rounded-l-3xl shadow-xl
        transform transition-transform duration-300 ease-in-out md:hidden
        ${mobileMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex justify-between items-center px-6 py-5">
          <h1 className="text-2xl font-['Pacifico'] text-yellow-400">
            EduBridge
          </h1>
          <FiX
            className="text-2xl cursor-pointer text-gray-700"
            onClick={() => setMobileMenu(false)}
          />
        </div>

        {/* MOBILE NAV */}
        <nav className="flex flex-col gap-5 px-6 py-6 text-gray-700 text-[15px] font-medium">
          <NavLink to="/student-home" onClick={() => setMobileMenu(false)}>
            Home
          </NavLink>

          <NavLink to="/student-dashboard" onClick={() => setMobileMenu(false)}>
            Dashboard
          </NavLink>

          <NavLink to="/t-my-courses" onClick={() => setMobileMenu(false)}>
            My Courses
          </NavLink>
        </nav>
      </div>
    </>
  );
}
