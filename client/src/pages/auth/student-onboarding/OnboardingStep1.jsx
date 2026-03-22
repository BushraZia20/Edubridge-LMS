import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import assets from "../../../assets/assets";
import { setPurpose } from "../../../redux/reducers/studentOnboardingSlice";

const OPTIONS = [
  "Learn something new",
  "Advance my career",
  "Master a specific skill",
  "Collaborate or network",
  "Support school/university work",
];

const OnboardingStep1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const toggleOption = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else if (selected.length < 2) {
      setSelected([...selected, item]);
    }
  };

  const handleNext = () => {
    dispatch(setPurpose(selected));
    navigate("/onboarding-step-2");
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* ⭐ STARS */}
      <img
        src={assets.starsTop}
        className="hidden md:block absolute right-6 top-0 w-36 pointer-events-none"
        alt=""
      />

      <img
        src={assets.starsTop}
        className="hidden md:block absolute left-6 bottom-10 w-36 pointer-events-none"
        alt=""
      />

      {/* LOGO */}
      <h1 className="absolute top-6 left-6 text-2xl text-yellow-500 font-['Pacifico']! z-10">
        EduBridge
      </h1>

      {/* PROGRESS */}
      <div className="mt-6 flex justify-center px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border text-xs sm:text-sm
                  ${
                    step === 1
                      ? "bg-yellow-400 border-yellow-400 text-black"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {step}
              </div>

              {step !== 4 && <div className="w-8 sm:w-12 h-0.5 bg-gray-300" />}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center text-center mt-8 sm:mt-10 px-5 sm:px-6 flex-1">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-snug">
          What brings you here?
        </h1>

        <p className="text-gray-500 mt-2 text-sm">Select up to 2 options</p>

        {/* OPTIONS */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-3 
            sm:gap-4 
            mt-10 
            sm:mt-14 
            w-full 
            max-w-6xl
          "
        >
          {OPTIONS.map((item) => {
            const active = selected.includes(item);

            return (
              <button
                key={item}
                onClick={() => toggleOption(item)}
                className={`
                  flex items-center gap-3 border rounded-xl 
                  px-4 py-3 sm:px-6 sm:py-4 
                  text-sm transition
                  ${
                    active
                      ? "bg-yellow-50 border-yellow-500"
                      : "bg-white border-yellow-300 hover:bg-yellow-50"
                  }
                `}
              >
                <FiPlus />
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end px-6 sm:px-10 pb-6 sm:pb-10">
        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className={`
            flex items-center gap-2 px-6 sm:px-8 py-3 rounded-md font-medium
            ${
              selected.length === 0
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

export default OnboardingStep1;
