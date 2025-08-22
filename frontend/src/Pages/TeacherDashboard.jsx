import React from "react";
import Cookies from "js-cookie"

const  TeacherDashboard=() => {
    console.log(Cookies.get());
    
    const name = Cookies.get("loggedInUser") || "Mentor" ;
    return(
         <div className="min-h-screen flex items-center justify-center bg-white">
            <h1 className="text-3xl font-bold">Welcome to Teacher Dashboard, {name}</h1>


        </div>
    )

}
export default TeacherDashboard;