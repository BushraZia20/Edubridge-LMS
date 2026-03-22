import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets/assets";

import {
  setTeachingPreferences,
  resetTeacherOnboarding,
} from "../../../redux/reducers/teacherOnboardingSlice";

import { saveTeacherOnboardingApi } from "../../../apis/saveTeacherOnboardingApi";

const COURSE_FORMAT_OPTIONS = [
  "Video Lectures",
  "Live Classes",
  "Text & Notes",
  "Interactive / Quiz Based",
];

const AUDIENCE_OPTIONS = [
  "School Students",
  "College Students",
  "Working Professionals",
  "Beginners",
  "Advanced Learners",
];

const TeachingPreferences = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ KEEP THIS
  const teacherOnboarding = useSelector((state) => state.teacherOnboarding);
  console.log(teacherOnboarding);

  const [preferences, setPreferences] = useState({
    language: "",
    courseFormat: [], // ✅ ARRAY
    audience: [], // ✅ ARRAY
  });

  // ✅ Prefill on back navigation
  useEffect(() => {
    setPreferences({
      language: teacherOnboarding.defaultLanguage || "",
      courseFormat: teacherOnboarding.courseFormat || [],
      audience: teacherOnboarding.audience || [],
    });
  }, []);

  // Language (single)
  const handleLanguageChange = (e) => {
    setPreferences({
      ...preferences,
      language: e.target.value,
    });
  };

  // Multi-select handler (reusable)
  const handleMultiSelect = (key, value) => {
    if (!value) return;

    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key] : [...prev[key], value],
    }));
  };

  const removeItem = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key].filter((x) => x !== value),
    }));
  };

  const handleFinish = async () => {
    // 1️⃣ Save to Redux
    dispatch(
      setTeachingPreferences({
        defaultLanguage: preferences.language,
        courseFormat: preferences.courseFormat,
        audience: preferences.audience,
      }),
    );

    try {
      // 2️⃣ API call
      await saveTeacherOnboardingApi({
        ...teacherOnboarding,
        defaultLanguage: preferences.language,
        courseFormat: preferences.courseFormat,
        audience: preferences.audience,
      });

      // 3️⃣ Reset Redux
      dispatch(resetTeacherOnboarding());

      // 4️⃣ Navigate
      navigate("/teacher-dashboard");
    } catch (error) {
      console.error("Teacher onboarding failed", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      {/* LEFT IMAGE */}
      <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center p-0">
        <img
          src={assets.registerInstructor}
          alt="Illustration"
          className="w-full h-full object-contain max-h-screen"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Teaching Preferences
          </h1>

          <div className="space-y-6">
            {/* Default Language */}
            <div>
              <label className="text-sm font-semibold">Default language</label>
              <select
                value={preferences.language}
                onChange={handleLanguageChange}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select your language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Course Format (Multi-select) */}
            <div>
              <label className="text-sm font-semibold">
                Preferred course format
              </label>

              <select
                onChange={(e) =>
                  handleMultiSelect("courseFormat", e.target.value)
                }
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Choose course format</option>
                {COURSE_FORMAT_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Selected course formats */}
              {preferences.courseFormat.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {preferences.courseFormat.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-100 rounded-full"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeItem("courseFormat", item)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Audience (Multi-select) */}
            <div>
              <label className="text-sm font-semibold">Intended audience</label>

              <select
                onChange={(e) => handleMultiSelect("audience", e.target.value)}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select audience type</option>
                {AUDIENCE_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Selected audience */}
              {preferences.audience.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {preferences.audience.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-100 rounded-full"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeItem("audience", item)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* FINISH */}
            <button
              onClick={handleFinish}
              className="w-full bg-[#FFD600] text-black font-semibold py-3 rounded-lg"
            >
              Finished
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingPreferences;
