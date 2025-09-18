



import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TeacherEndBatch() {
  const [active, setActive] = useState("Content");
  const tabs = [
    { name: "Content", path: "content" },
    { name: "Problem List", path: "problemslist" },
    { name: "Leaderboard", path: "leaderBoard" },
    { name: "Analytics", path: "analytics" },
  ];
  const navigate = useNavigate();

  return (
    <div className="p-3 z-10">
      {/* Tabs */}
      <div className="w-full border-b border-r border-l border-gray-100 shadow bg-white flex items-center justify-center space-x-4 px-6 py-2 rounded-b-3xl">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.name}
              onClick={() => {
                setActive(tab.name);
                navigate(tab.path);
              }}
              className={`flex items-center rounded-2xl transition px-6 py-3 font-medium
                ${
                  active === tab.name
                    ? "bg-yellow-200 text-yellow-800 shadow-sm"
                    : "text-gray-600 hover:text-yellow-700 hover:bg-yellow-100"
                }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
