import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Signup Successful 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#062B5B] to-blue-800 px-4">

      {/* FORM CARD */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-center text-[#062B5B] mb-2">
          Join Eduvion
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Start your learning journey today
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-xl font-medium hover:bg-yellow-400 hover:text-[#062B5B] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
