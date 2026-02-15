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

          {/* <Route path="/singup" element={<Singup/>} />
          */}

          <Route path="/login" element={<Login />} />
          <Route path="/Singup" element={<Signup />} />
          
          <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="mailbox" element={<Mailbox/>}/>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="calendar" element={<Calender/>}/>
            <Route path="chats" element={<GroupChat/>}/>
            <Route path="courses" element={<Courses/>}/>
            <Route path="charts" element={<Analytics/>}/>
            <Route path="tables" element={<DataTable/>}/>
            <Route path="apps" element={<Widgets/>}/>
            <Route path="auth" element={<Security/>}/>
            <Route path="adminprofile" element={<AdminProfile/>}/>
            <Route path="adminsettings" element={<AdminSettings/>}/>
            <Route path="help" element={<HelpCenter/>}/>
            <Route path="notification" element={<NotificationCenter/>}/>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
