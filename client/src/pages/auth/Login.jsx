import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import assets from "../../assets/assets";
import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
      );

      const data = response.data;

      if (data?.success) {
        // ✅ Store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);

        // ✅ Store user
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Navigate based on role
        if (data.user?.role === "educator") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-home");
        }
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-['Inter']">
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-20">
        <h1 className="absolute top-6 left-6 text-2xl text-yellow-500 font-['Pacifico']!">
          EduBridge
        </h1>

        <div className="max-w-xl w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Login</h2>

          {/* Email */}
          <label className="text-sm text-gray-600">Email</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineMailOutline size={18} />
            </span>
          </div>

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="mt-1 mb-4 relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-lg px-10 py-3.5 text-sm focus:outline-none focus:border-gray-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdOutlineLock size={18} />
            </span>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition">
              <AiOutlineEye size={18} />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden lg:flex h-screen bg-[#FFD900] items-center justify-center">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: `url(${assets.login})` }}
        />
      </div>
    </div>
  );
};

export default Login;
