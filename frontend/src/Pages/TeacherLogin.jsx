
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router";

// //  Validation Schema without teacherId
// const teacherLoginSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
// });


// function TeacherLogin() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(teacherLoginSchema),
//   });
//   const navigate=useNavigate()

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         email: data.email,
//         password: data.password,
//         role: "TEACHER",
//       };

//       // API call with cookies enabled
//       const res = await axios.post("http://localhost:3000/api/auth/login", payload, {
//         withCredentials: true,
//       });
//       const {user,message}=res.data
//       toast.success(message || "Login Successful", { position: "top-right" });
//       if (user.role === "TEACHER") navigate("/teacher-dashboard");
//         else navigate("/");
//       console.log("Login success:", res.data);
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       {/* Left Side Image */}
//       <div className="hidden md:flex w-1/2 items-center justify-center">
//         <img src="/teacherlogin.png" className="max-w-sm" alt="Teacher Illustration" />
//       </div>

//       {/* Login Card */}
//       <div className="flex w-full md:w-1/2 justify-center items-center">
//         <div className="card w-[300px] lg:w-[450px] shadow-xl bg-base-100 p-6">
//           <img src="/logo.png" className="h-20 w-20 mx-auto" alt="School Logo" />
//           <h2 className="text-2xl font-bold text-center mb-6">Teacher Login</h2>

//           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
//             {/* Email */}
//             <div className="form-control">
//               <input
//                 type="email"
//                 {...register("email")}
//                 className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
//                 placeholder="Teacher Email"
//               />
//               {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
//             </div>

//             {/* Password */}
//             <div className="form-control">
//               <input
//                 type="password"
//                 {...register("password")}
//                 className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
//                 placeholder="Password"
//               />
//               {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
//             </div>

//             {/* Submit */}
//             <div className="form-control mt-4">
//               <button
//                 className="btn bg-sky-500 w-full text-white"
//                 type="submit"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="loading loading-spinner"></span> Logging in...
//                   </>
//                 ) : (
//                   "Login as Teacher"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeacherLogin;







import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "../utils/notification";
import redirectByRole from "../utils/redirectByRole";

//  Validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password should be at least 8 characters" }),
});

//  Axios instance 
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function TeacherLogin() {
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        role: "TEACHER",
      };

      const res = await api.post("/auth/login", payload);
      const { user, message } = res.data;

      if (user?.role) {
        //  Store role & username in cookies
        Cookies.set("role", user.role, { expires: 7 });
        Cookies.set("loggedInUser", user.name, { expires: 7 });
        handleSuccess(message || "Login Successfully");

        redirectByRole(user.role, navigate);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      handleError(err.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
          <img src="/logo.png" className="h-20 w-20 mx-auto" alt="Logo" />
          <h2 className="text-2xl font-bold text-center mb-6">Teacher Login</h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
            {/* Email */}
            <div className="form-control w-full">
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-400"
                placeholder="E-mail"
              />
              {errors.email && (
                <label className="label text-red-500 text-sm">{errors.email.message}</label>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <input
                type="password"
                {...register("password")}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-400"
                placeholder="Password"
              />
              {errors.password && (
                <label className="label text-red-500 text-sm">{errors.password.message}</label>
              )}
            </div>

            {/* Submit */}
            <div className="form-control w-full mt-4">
              <button
                className="btn bg-sky-500 hover:bg-sky-600 text-white w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="/teacherlogin.png" alt="Teacher Login" className="max-w-sm" />
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default TeacherLogin;

