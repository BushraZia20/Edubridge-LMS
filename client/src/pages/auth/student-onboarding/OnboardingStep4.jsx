import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import assets from "../../../assets/assets";
import {
  setEducation,
  resetStudentOnboarding,
} from "../../../redux/reducers/studentOnboardingSlice";
import { saveStudentOnboardingApi } from "../../../apis/saveStudentOnboardingApi";

const EDUCATION = [
  "Less than high school diploma",
  "High school diploma",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate degree",
];

const OnboardingStep4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Fetch all previous data from Redux
  const studentOnboarding = useSelector((state) => state.studentOnboarding);

  const [selected, setSelected] = useState("");

  // ✅ Prefill if user navigates back
  useEffect(() => {
    if (studentOnboarding.education) {
      setSelected(studentOnboarding.education);
    }
  }, [studentOnboarding.education]);

  const handleFinish = async () => {
    // 1️⃣ Save education in Redux
    dispatch(setEducation(selected));

    try {
      // 2️⃣ API call via service
      await saveStudentOnboardingApi({
        ...studentOnboarding,
        education: selected,
      });

      // 3️⃣ Reset onboarding state
      dispatch(resetStudentOnboarding());

      // 4️⃣ Redirect
      navigate("/student-home");
    } catch (error) {
      console.error("Student onboarding failed", error);
    }
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

      {/* PROGRESS */}
      <div className="mt-6 sm:mt-8 flex justify-center px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border text-xs sm:text-sm
                  ${
                    n === 4
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
        <div className="w-full max-w-180 mx-auto flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            What’s your highest level of education?
          </h1>

          <div className="space-y-3">
            {EDUCATION.map((item) => {
              const active = selected === item;

              return (
                <button
                  key={item}
                  onClick={() => setSelected(item)}
                  className={`
                    w-full flex justify-between items-center
                    border rounded-xl px-4 py-3 text-sm transition
                    ${
                      active
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {item}

                  <span
                    className={`
                      h-4 w-4 rounded-full border
                      ${
                        active
                          ? "border-yellow-500 bg-yellow-400"
                          : "border-gray-400"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between px-6 sm:px-10 pb-10 mt-auto">
        <button
          onClick={() => navigate("/onboarding-step-3")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm"
        >
          <FiArrowLeft />
          Back
        </button>

        <button
          disabled={!selected}
          onClick={handleFinish}
          className={`
            flex items-center gap-2 px-6 sm:px-8 py-3 rounded-md font-medium
            ${
              !selected
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }
          `}
        >
          Finished
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep4;
