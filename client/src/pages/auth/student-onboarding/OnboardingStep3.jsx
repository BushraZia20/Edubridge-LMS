import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiArrowRight, FiArrowLeft, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import assets from "../../../assets/assets";
import { setRole } from "../../../redux/reducers/studentOnboardingSlice";

const ROLES = [
  "Student",
  "Working Professional",
  "Intern / Trainee",
  "Freelancer / Self-employed",
  "Job Seeker",
  "Other",
];

const OnboardingStep3 = () => {
  // ✅ KEEPING THIS AS REQUESTED
  const studentOnboarding = useSelector((state) => state.studentOnboarding);
  console.log(studentOnboarding);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  const handleSelect = (role) => {
    if (selected === role) setSelected("");
    else setSelected(role);
  };

  const handleNext = () => {
    dispatch(setRole(selected));
    navigate("/onboarding-step-4");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* ⭐ STARS */}
      <img
        src={assets.starsTop}
        className="hidden lg:block absolute right-6 top-0 w-36"
        alt=""
      />

      {/* LOGO */}
      <h1 className="absolute top-6 left-6 text-2xl text-yellow-500 font-['Pacifico']! z-10">
        EduBridge
      </h1>

      {/* PROGRESS BAR */}
      <div className="mt-6 sm:mt-8 flex justify-center px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border text-xs sm:text-sm
                  ${
                    n === 3
                      ? "bg-yellow-400 border-yellow-400 text-black"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {n}
              </div>
              {n !== 4 && <div className="w-8 sm:w-12 h-0.5 bg-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-10 sm:mt-12 w-full flex justify-center px-4">
        <div className="w-full max-w-180 flex flex-col items-center gap-6">
          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Your Current Role
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Select 1 option</p>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full max-w-130 flex items-center border border-yellow-300 rounded-full px-4 py-2 shadow-sm">
            <input
              className="flex-1 outline-none text-sm"
              placeholder="Find a role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-yellow-400 p-2 rounded-full">
              <FiSearch size={16} />
            </button>
          </div>

          {/* ROLE OPTIONS */}
          <div className="w-full flex flex-wrap justify-center gap-3 mt-4">
            {ROLES.filter((r) =>
              r.toLowerCase().includes(search.toLowerCase()),
            ).map((role) => {
              const active = selected === role;

              return (
                <button
                  key={role}
                  onClick={() => handleSelect(role)}
                  className={`
                    flex items-center gap-2 border rounded-xl px-5 py-3
                    text-sm transition
                    ${
                      active
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-yellow-300 hover:bg-yellow-50"
                    }
                  `}
                >
                  <FiPlus size={14} />
                  {role}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between px-6 sm:px-10 pb-10 mt-auto">
        <button
          onClick={() => navigate("/onboarding-step-2")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm"
        >
          <FiArrowLeft />
          Back
        </button>

        <button
          disabled={!selected}
          onClick={handleNext}
          className={`
            flex items-center gap-2 px-6 sm:px-8 py-3 rounded-md font-medium
            ${
              !selected
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }
          `}
        >
          Next
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
