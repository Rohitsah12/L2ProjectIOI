// import React from "react"
// import Cookies from "js-cookie";

// function StudentDashboard() {
//     const name = Cookies.get("loggedInUser") || "Student";

//     return(
//         <div className="min-h-screen flex items-center justify-center bg-white">
//             <h1 className="text-3xl font-bold">Welcome to Student Dashboard, {name}</h1>


//         </div>
//     )
// }
// export default StudentDashboard;


// StudentLanding.jsx
import { useNavigate } from "react-router-dom";

export default function StudentLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome, Student 👋</h1>

      <div className="flex gap-6">
        {/* View Assignments Button */}
        <button
          onClick={() => navigate("/student/assignment")}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition"
        >
          📘 View Assignments
        </button>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/student/profile")}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition"
        >
          👤 Profile
        </button>
      </div>
    </div>
  );
}
