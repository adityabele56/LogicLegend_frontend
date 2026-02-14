import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "emailOrPhone") {
      // If user typing numbers → treat as phone
      if (/^\d*$/.test(value)) {
        // Stop typing after 10 digits
        if (value.length > 10) return;
      }
    }

    setForm({ ...form, [name]: value });
  };

  // Validation function
  const validate = () => {
    let newErrors = {};

    // Email or Phone validation
    if (!form.emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone is required";
    } else {
      const isNumber = /^\d+$/.test(form.emailOrPhone);

      if (isNumber) {
        // Phone validation
        if (form.emailOrPhone.length !== 10) {
          newErrors.emailOrPhone = "Phone must be exactly 10 digits";
        }
      } else {
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailOrPhone)) {
          newErrors.emailOrPhone = "Enter valid email address";
        }
      }
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = "Must contain 1 uppercase letter";
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = "Must contain 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Login Data:", form);
      alert("Login Successful 🚀");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#062B5B] to-blue-500">

      <div className="w-[900px] bg-white rounded-2xl shadow-2xl flex overflow-hidden">

        {/* LEFT SECTION */}
        <div className="w-1/2 bg-gradient-to-r from-[#062B5B] to-blue-600 text-white flex flex-col justify-center items-center p-10">

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

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL OR PHONE */}
            <div>
              <input
                type="text"
                name="emailOrPhone"
                placeholder="Email or Phone Number"
                value={form.emailOrPhone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />

              {/* Eye button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-[#062B5B] transition"
            >
              Login
            </button>

          </form>

          <p className="text-sm mt-5 text-center">
            Don't have an account?
            <NavLink to={"/Singup"}>
              <button className="ml-2 py-1 text-black rounded-lg">
                Signup
              </button>
            </NavLink>
          </p>
        </div>

      </div>
    </div>
  );
}
