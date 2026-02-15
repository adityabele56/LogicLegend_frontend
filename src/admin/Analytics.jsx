import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = () => {
  /* ================= LARGE DATA ================= */

  const revenueData = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 210000 },
    { month: "Mar", revenue: 180000 },
    { month: "Apr", revenue: 250000 },
    { month: "May", revenue: 300000 },
    { month: "Jun", revenue: 420000 },
    { month: "Jul", revenue: 390000 },
    { month: "Aug", revenue: 500000 },
    { month: "Sep", revenue: 460000 },
    { month: "Oct", revenue: 600000 },
    { month: "Nov", revenue: 720000 },
    { month: "Dec", revenue: 850000 },
  ];

  const usersData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 240 },
    { month: "Mar", users: 300 },
    { month: "Apr", users: 420 },
    { month: "May", users: 600 },
    { month: "Jun", users: 850 },
    { month: "Jul", users: 1000 },
    { month: "Aug", users: 1300 },
    { month: "Sep", users: 1700 },
    { month: "Oct", users: 2100 },
    { month: "Nov", users: 2600 },
    { month: "Dec", users: 3200 },
  ];

  const courseDistribution = [
    { name: "Development", value: 45 },
    { name: "Design", value: 25 },
    { name: "Marketing", value: 15 },
    { name: "Business", value: 15 },
  ];

  const COLORS = ["#facc15", "#fbbf24", "#f59e0b", "#d97706"];

  /* ================= TOTAL CALCULATION ================= */

  const totalRevenue = useMemo(() => {
    return revenueData.reduce((acc, item) => acc + item.revenue, 0);
  }, []);

  const totalUsers = useMemo(() => {
    return usersData[usersData.length - 1].users;
  }, []);

  const totalCourses = 128;

  return (
    <div className="min-h-screen bg-yellow-50 p-8">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-yellow-700 mb-8">
        Analytics Dashboard
      </h1>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-400">
          <h3 className="text-gray-500 text-sm">Total Courses</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {totalCourses}
          </p>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-yellow-700 mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#facc15" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Growth Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-yellow-700 mb-4">
            Users Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#eab308"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Distribution Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2">
          <h2 className="font-semibold text-yellow-700 mb-4">
            Course Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={courseDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
