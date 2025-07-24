import React, { useState } from "react";
import { useAdminLoginMutation } from "./loginApiSlice";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const res = await adminLogin(form).unwrap();

      if (res?.token && res?.user) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.user._id);
        localStorage.setItem("isAdmin", JSON.stringify(res.user.isAdmin)); // ✅ fix here

        const isAdmin = JSON.parse(localStorage.getItem("isAdmin")); // ✅ parse it properly
        if (isAdmin) {
          navigate("/adminDashboard");
        } else {
          navigate("/meeting");

        }
      }
      setServerError(res.message)


    } catch (err) {
      console.error("Login failed:", err);
      const message =
        err?.data?.message ||
        err?.error ||
        "Something went wrong. Please try again.";
      setServerError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-black px-4">
      <div className="bg-white border p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Adminn Login 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {serverError && (
            <div className="text-sm text-red-600 text-center">{serverError}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
