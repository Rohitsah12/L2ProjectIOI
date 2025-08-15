import React from "react"
import Cookies from "js-cookie";

function StudentDashboard() {
    const name = Cookies.get("loggedInUser") || "Student";

    return(
        <div className="min-h-screen flex items-center justify-center bg-white">
            <h1 className="text-3xl font-bold">Welcome to Student Dashboard, {name}</h1>


        </div>
    )
}
export default StudentDashboard;