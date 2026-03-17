import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart2,
  Users,
  BookOpen,
  Settings,
  LogOut,
  School,
} from "lucide-react";

export default function BatchDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="min-h-screen w-25 bg-white shadow-md flex flex-col justify-start items-center p-4">
        <img
          src="../public/images/c.png"
          alt=""
        />
        <div className="flex flex-col justify-between h-120 px-5 ">
          <nav className="flex flex-col gap-9 text-gray-600 mt-8">
            <NavLink to="dashboard"
              end
              className={({ isActive }) => isActive ? "text-blue-600"  : "text-gray-600"} >
              <BarChart2
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />
            </NavLink>
            <NavLink to="students" className={({isActive})=>isActive?"text-blue-600":"text-gray-600"}>
              <Users
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />
            </NavLink>
            <NavLink to="teachers"  className={({ isActive }) => isActive ? "text-blue-600"  : "text-gray-600"}>
              <School
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />
            </NavLink>

            <NavLink to="content"  className={({ isActive }) => isActive ? "text-blue-600"  : "text-gray-600"}>
              <BookOpen
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />
            </NavLink>
          </nav>
          <div className="flex flex-col gap-4 pb-0">
            <NavLink to="settings" >
              <Settings
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />{" "}
            </NavLink>
            <NavLink to="logout">
              <LogOut
                size={30}
                className="flex items-center gap-2 hover:text-blue-600"
              />
            </NavLink>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow ">
          <div>
            <div className="text-2xl font-extrabold z-10">SOT23B1</div>
          </div>
        </header>
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
