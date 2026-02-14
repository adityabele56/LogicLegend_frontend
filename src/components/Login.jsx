import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 👁️ show/hide password state
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.emailOrPhone || !form.password) {
      setError("All fields are required");
      return;
    }

    setError("");
    console.log("Login Data:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#062B5B] to-blue-500">

      <div className="w-[900px] bg-white rounded-2xl shadow-2xl flex overflow-hidden">

        {/* LEFT SECTION — ANIMATED IMAGE */}
<div className="w-1/2 bg-gradient-to-r from-[#062B5B] to-blue-600 text-white flex flex-col justify-center items-center p-10">

  {/* Animated GIF */}
  <img
    src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
    alt="learning animation"
    className="w-72 mb-6"
  />

  <h1 className="text-4xl font-bold mb-3">Eduvion</h1>
  <p className="text-center opacity-90">
    Your Smart Learning Management System
  </p>

</div>


        {/* RIGHT SECTION */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#062B5B] mb-6">
            Login to your account
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL OR PHONE */}
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone Number"
              value={form.emailOrPhone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />

            {/* PASSWORD WITH EYE */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-[#062B5B] transition"
            >
              Login
            </button>

          </form>

          <p className="text-sm mt-5 text-center">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer">
              Signup
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
