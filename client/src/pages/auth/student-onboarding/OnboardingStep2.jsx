import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiArrowRight, FiArrowLeft, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import assets from "../../../assets/assets";
import { setInterests } from "../../../redux/reducers/studentOnboardingSlice";

const INTERESTS = {
  Tech: ["Web Dev", "Mobile Dev", "UI/UX", "AI", "Cybersecurity"],
  Business: ["Marketing", "Finance", "Entrepreneurship"],
  Creative: ["Design", "Animation", "Writing"],
  Academic: ["Math", "Science", "Languages"],
};

const OnboardingStep2 = () => {
  const studentOnboarding = useSelector((state) => state.studentOnboarding);
  console.log(studentOnboarding);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((x) => x !== item));
    } else if (selected.length < 5) {
      setSelected([...selected, item]);
    }
  };

  const handleNext = () => {
    dispatch(setInterests(selected));
    navigate("/onboarding-step-3");
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
                    n === 2
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

      {/* ===== MAIN CONTENT ===== */}
      <div className="mt-10 sm:mt-12 w-full flex justify-center px-4">
        <div className="w-full max-w-180 flex flex-col items-center gap-5 sm:gap-6">
          {/* HEADING */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Pick your areas of interest
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Select up to 5 options</p>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full max-w-130 flex items-center border border-yellow-300 rounded-full px-4 py-2 shadow-sm">
            <input
              className="flex-1 outline-none text-sm"
              placeholder="Find an interest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="bg-yellow-400 p-2 rounded-full">
              <FiSearch size={16} />
            </button>
          </div>

          {/* INTEREST LIST */}
          <div className="w-full flex justify-center">
            <div className="max-w-180 text-left space-y-4">
              {Object.entries(INTERESTS).map(([category, list]) => (
                <div key={category} className="space-y-2">
                  <p className="font-medium text-sm">{category}</p>

                  <div className="flex flex-wrap gap-2">
                    {list
                      .filter((x) =>
                        x.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((item) => {
                        const active = selected.includes(item);

                        return (
                          <button
                            key={item}
                            onClick={() => toggle(item)}
                            className={`
                              flex items-center gap-1.5
                              border rounded-lg
                              px-3 py-1.5
                              text-xs transition
                              ${
                                active
                                  ? "border-yellow-500 bg-yellow-50"
                                  : "border-yellow-300 hover:bg-yellow-50"
                              }
                            `}
                          >
                            <FiPlus size={12} />
                            {item}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between px-6 sm:px-10 pb-8 sm:pb-10 mt-auto">
        {/* BACK */}
        <button
          onClick={() => navigate("/onboarding")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* NEXT */}
        <button
          disabled={selected.length === 0}
          onClick={handleNext}
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

export default OnboardingStep2;
