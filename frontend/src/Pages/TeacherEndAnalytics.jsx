import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function TeacherEndAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisual, setIsVisual] = useState(true);

  // Sync with current path
  useEffect(() => {
    if (location.pathname.endsWith("visual")) {
      setIsVisual(true);
    } else if (location.pathname.endsWith("tables")) {
      setIsVisual(false);
    }
  }, [location.pathname]);

  const toggle = (choice) => {
    if (choice === "visual") {
      navigate("visual");
      setIsVisual(true);
    } else {
      navigate("tables");
      setIsVisual(false);
    }
  };

  return (
    <div className="mt-3">
      {/* Segmented Toggle */}
      <div className="relative w-40 h-10 flex items-center bg-gray-200 rounded-full cursor-pointer">
        {/* Sliding knob */}
        <div
          className={`absolute top-1 bottom-1 w-[50%] rounded-full bg-white shadow-md transform transition-transform ${
            isVisual ? "translate-x-0" : "translate-x-full"
          }`}
        />
        {/* Options */}
        <div className="flex justify-between w-full text-gray-700 font-medium z-10">
          <button
            className={`flex-1 text-center ${
              isVisual ? "text-gray-900" : "text-gray-500"
            }`}
            onClick={() => toggle("visual")}
          >
            Visual
          </button>
          <button
            className={`flex-1 text-center ${
              !isVisual ? "text-gray-900" : "text-gray-500"
            }`}
            onClick={() => toggle("tables")}
          >
            Tabular
          </button>
        </div>
      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
