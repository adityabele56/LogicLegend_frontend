import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EduvionLogo from "./components/EduvionLogo";
import MainLayout from "./components/MainLayout";
import AdminLayout from "./pages/AdminDashboard/AdminLayout"
import Mailbox from "./pages/AdminDashboard/Mailbox" 
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard"
import Calender from "./pages/AdminDashboard/Calender"
import AdminProfile from "./pages/AdminDashboard/AdminProfile"
import AdminSettings from "./pages/AdminDashboard/AdminSettings";
import Analytics from "./pages/AdminDashboard/Analytics"
import Courses from "./pages/AdminDashboard/Courses"
import DataTable from "./pages/AdminDashboard/DataTable"
import GroupChat from "./pages/AdminDashboard/GroupChat"
import HelpCenter from "./pages/AdminDashboard/HelpCenter"
import NotificationCenter from "./pages/AdminDashboard/NotificationCenter"
import Security from "./pages/AdminDashboard/Security"
import Widgets from "./pages/AdminDashboard/Widgets"

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
         
        </Route>
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
      </Routes>
    </BrowserRouter>
  );
}
