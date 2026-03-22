import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets/assets";
import { setPersonalInfo } from "../../../redux/reducers/teacherOnboardingSlice";
const EXPERTISE_OPTIONS = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Machine Learning",
  "Cybersecurity",
  "Digital Marketing",
];

const TeacherOnboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const teacherOnboarding = useSelector((state) => state.teacherOnboarding);

  const [formData, setFormData] = useState({
    country: "",
    profession: "",
    experience: "",
    expertise: [], // ✅ ARRAY
  });

  // Prefill on back navigation
  useEffect(() => {
    setFormData({
      country: teacherOnboarding.country || "",
      profession: teacherOnboarding.profession || "",
      experience: teacherOnboarding.experience || "",
      expertise: teacherOnboarding.expertise || [],
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Add expertise from dropdown
  const handleExpertiseSelect = (e) => {
    const value = e.target.value;
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(value)
        ? prev.expertise
        : [...prev.expertise, value],
    }));
  };

  // ✅ Remove expertise chip
  const removeExpertise = (item) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((x) => x !== item),
    }));
  };

  const handleNext = () => {
    dispatch(
      setPersonalInfo({
        country: formData.country,
        profession: formData.profession,
        experience: formData.experience,
        expertise: formData.expertise, // ✅ array directly
      }),
    );

    navigate("/teaching-preferences");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
      {/* LEFT */}
      <div className="md:w-1/2 w-full bg-[#FFD600] flex items-center justify-center">
        <img
          src={assets.registerInstructor}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Personal & Professional Info
          </h1>

          <div className="space-y-5">
            {/* Country */}
            <div>
              <label className="text-sm font-semibold">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* Profession */}
            <div>
              <label className="text-sm font-semibold">
                Profession / Title
              </label>
              <input
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-semibold">
                Years of Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select experience</option>
                <option value="0-1">0–1</option>
                <option value="1-3">1–3</option>
                <option value="3-5">3–5</option>
                <option value="5+">5+</option>
              </select>
            </div>

            {/* Expertise Dropdown */}
            <div>
              <label className="text-sm font-semibold">Area of Expertise</label>

              <select
                onChange={handleExpertiseSelect}
                className="w-full border rounded-lg p-3 mt-1"
              >
                <option value="">Select expertise</option>
                {EXPERTISE_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {/* Selected expertise chips */}
              {formData.expertise.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.expertise.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-yellow-100 rounded-full"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeExpertise(item)}
                        className="text-gray-600 hover:text-black"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Next */}
            <button
              onClick={handleNext}
              className="w-full bg-yellow-400 font-semibold py-3 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOnboarding;
