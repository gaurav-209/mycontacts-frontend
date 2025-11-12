import React, { useState } from "react";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", form);
      localStorage.setItem("token", data.accessToken);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
   <div className="flex flex-col gap-4">
   <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Welcome to MyContacts App</h1>
      <p className="text-gray-600">Create and manage your personal contact list securely.</p>
    </div>
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h4 className="text-xl font-semibold mb-4 text-center">Demo Login Details</h4>
        <p className="text-gray-600">Email: demo@gmail.com</p>
        <p className="text-gray-600">Password: demo@123</p>
    </div>
   </div>
  );
}

export default Login;
