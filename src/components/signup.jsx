import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Signup Successful 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#062B5B] to-blue-800">

      {/* MAIN CONTAINER */}
      <div className="w-[900px] bg-white rounded-2xl shadow-2xl flex overflow-hidden">
{/* LEFT SIDE — LMS STUDY IMAGE */}
<div className="w-1/2 bg-gradient-to-r from-[#062B5B] to-blue-600 text-white flex flex-col justify-center items-center p-10 hidden md:flex">

  <img
    src="https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"

    className="w-96 mb-6"
  />

  <h1 className="text-4xl font-bold mb-3">Eduvion</h1>
  <p className="text-center opacity-90">
    Your Smart Learning Management System
  </p>

</div>

        {/* RIGHT SIDE — SIGNUP FORM */}
        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-3xl font-semibold text-center text-[#062B5B] mb-2">
            Join Eduvion
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Start your learning journey today
          </p>

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

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-medium hover:bg-yellow-400 hover:text-[#062B5B] transition"
            >
              Sign Up
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
