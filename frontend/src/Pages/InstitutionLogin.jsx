// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";


// const institutionLoginSchema = z.object({
//   institutionId: z.string().min(1, { message: "Institution ID is required" }),
//   email: z.string().email({ message: "Invalid admin email address" }),
//   password: z.string().min(8, { message: "Password must be at least 8 characters" }),
// });

// export default function InstitutionLogin() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(institutionLoginSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       console.log("Institution Login Data", data);
//     } catch (err) {
//       console.log("Login Error", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="card w-[300px] lg:w-[450px] max-w-xl shadow-xl bg-white/20 p-6">
//         <img src="/logo.png" className="h-24 w-24 mx-auto mb-4" alt="Institution Login" />
//         <h2 className="text-2xl font-bold text-center mb-4">Institution Admin Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Admin Email */}
//           <div className="form-control">
            
//             <input
//               type="email"
//               {...register("email")}
//               className="input input-bordered w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
//               placeholder="admin@institution.edu"
//             />
//             {errors.email && (
//               <div className="text-sm text-red-500 mt-1">
//                 {errors.email.message}
//               </div>
//             )}
//           </div>

//           {/* Password */}
//           <div className="form-control">
            
//             <input
//               type="password"
//               {...register("password")}
//               className="input input-bordered w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
//               placeholder="Enter Password"
//             />
//             {errors.password && (
//               <div className="text-sm text-red-500 mt-1">
//                 {errors.password.message}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="form-control mt-4">
//             <button
//               type="submit"
//               className="btn bg-sky-500 hover:bg-sky-600 text-white w-full"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <>
//                   <span className="loading loading-spinner"></span>
//                   Authenticating...
//                 </>
//               ) : (
//                 "Login as Admin"
//               )}
//             </button>
//           </div>
//         </form>

        
//       </div>

//       <div className="hidden md:flex w-1/2 items-center justify-center">
//         <img src="/institutionlogin.png" alt="" className="max-w-sm"/>

//       </div>
//     </div>
//   );
// }
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Validation schema without institutionId
const institutionLoginSchema = z.object({
  email: z.string().email({ message: "Invalid admin email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function InstitutionLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(institutionLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        role: "COLLEGE",
      };

      const res = await axios.post("http://localhost:3000/api/auth/login", payload, {
        withCredentials: true,
      });

      const { user, message } = res.data;

      if (user?.role) {
        Cookies.set("role", user.role, { expires: 7 });
        Cookies.set("loggedInUser", user.name, { expires: 7 });

        toast.success(message || "Login Successful", { position: "top-right" });

        if (user.role === "COLLEGE") navigate("/institution-dashboard");
        else navigate("/");
      } else {
        toast.error(message || "Login failed", { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid login credentials!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="/institutionlogin.png" className="max-w-sm" alt="Institution Login" />
      </div>

      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="card w-[300px] lg:w-[450px] shadow-xl bg-base-100 p-6">
          <img src="/logo.png" className="h-20 w-20 mx-auto" alt="Institution Logo" />
          <h2 className="text-2xl font-bold text-center mb-6">Institution Admin Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4">
            {/* Email Field */}
            <div className="form-control w-full">
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
                placeholder="Admin Email"
              />
              {errors.email && (
                <div className="mt-1 text-red-500 text-sm">{errors.email.message}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <input
                type="password"
                {...register("password")}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
                placeholder="Password"
              />
              {errors.password && (
                <div className="mt-1 text-red-500 text-sm">{errors.password.message}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control w-full mt-4">
              <button
                className="btn bg-sky-500 w-full text-white hover:bg-sky-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  "Login as Admin"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
