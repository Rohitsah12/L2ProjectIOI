// StudentProfile.jsx
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentProfile() {
  // Mock Data
  const student = {
    name: "John Doe",
    batch: "2023",
    studentId: "STU12345",
    codeforces: "john_d_cf",
    leetcode: "john_lee",
    gfg: "john_gfg",
  };

  const problems = {
    total: 120,
    assigned: 150,
    easy: 60,
    medium: 40,
    hard: 20,
  };

  const badges = ["🏆 Weekly Top 1", "🥇 Monthly Top 1", "🔥 All Time Performer"];

  const topics = [
    { name: "DP", value: 30 },
    { name: "Graphs", value: 25 },
    { name: "Trees", value: 20 },
    { name: "Greedy", value: 15 },
    { name: "Math", value: 30 },
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"];

  const recentSubmissions = [
    { title: "Two Sum", status: "Accepted", date: "2025-09-10" },
    { title: "Longest Subarray", status: "Wrong Answer", date: "2025-09-09" },
    { title: "Graph Traversal", status: "Accepted", date: "2025-09-07" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Side - Main Content */}
      <div className="col-span-3 space-y-6">
        {/* Problem Stats */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-2">📊 Problem Solving Stats</h2>
          <p>
            Solved <span className="font-bold">{problems.total}</span> /{" "}
            {problems.assigned}
          </p>
          <div className="flex gap-6 mt-4">
            <div>✅ Easy: {problems.easy}</div>
            <div>⚡ Medium: {problems.medium}</div>
            <div>🔥 Hard: {problems.hard}</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-2">🏅 Badges</h2>
          <div className="flex gap-4">
            {badges.map((b, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-full text-sm font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Topic Distribution (Pie Chart) */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-2">📂 Problems by Topic</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topics}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {topics.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-2">🔥 Practice Heatmap</h2>
          <CalendarHeatmap
            startDate={new Date("2025-01-01")}
            endDate={new Date("2025-12-31")}
            values={[
              { date: "2025-09-01", count: 2 },
              { date: "2025-09-02", count: 4 },
              { date: "2025-09-03", count: 1 },
              { date: "2025-09-07", count: 3 },
            ]}
            classForValue={(value) => {
              if (!value) return "color-empty";
              return `color-scale-${value.count}`;
            }}
          />
        </div>

        {/* Recent Submissions */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-bold mb-2">📝 Recent Submissions</h2>
          <ul>
            {recentSubmissions.map((sub, i) => (
              <li
                key={i}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>{sub.title}</span>
                <span
                  className={`${
                    sub.status === "Accepted" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {sub.status}
                </span>
                <span className="text-gray-500">{sub.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Sidebar - Student Details */}
      <div className="col-span-1 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-2">👤 Student Details</h2>
        <p>
          <span className="font-medium">Name:</span> {student.name}
        </p>
        <p>
          <span className="font-medium">Batch:</span> {student.batch}
        </p>
        <p>
          <span className="font-medium">ID:</span> {student.studentId}
        </p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">🌐 Handles</h3>
          <ul className="text-blue-600 underline">
            <li>
              <a href={`https://codeforces.com/profile/${student.codeforces}`}>
                Codeforces: {student.codeforces}
              </a>
            </li>
            <li>
              <a href={`https://leetcode.com/${student.leetcode}`}>
                LeetCode: {student.leetcode}
              </a>
            </li>
            <li>
              <a href={`https://auth.geeksforgeeks.org/user/${student.gfg}`}>
                GFG: {student.gfg}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
