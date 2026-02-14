import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EduvionLogo from "./components/EduvionLogo";
import MainLayout from "./components/MainLayout";

// Pages

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/signup";


export default function App() {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 3200); // logo animation time

    return () => clearTimeout(timer);
  }, []);

  // 🔥 Splash Screen
  if (!showApp) {
    return <EduvionLogo />;
  }

  // 🔥 Actual Website
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Singup" element={<Signup />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
