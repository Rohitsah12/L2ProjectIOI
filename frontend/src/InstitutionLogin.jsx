import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const institutionLoginSchema = z.object({
  institutionId: z.string().min(1, { message: "Institution ID is required" }),
  email: z.string().email({ message: "Invalid admin email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function InstitutionLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(institutionLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Institution Login Data", data);
    } catch (err) {
      console.log("Login Error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="card w-[300px] lg:w-[450px] max-w-xl shadow-xl bg-white/20 p-6">
        <img src="/logo.png" className="h-24 w-24 mx-auto mb-4" alt="Institution Login" />
        <h2 className="text-2xl font-bold text-center mb-4">Institution Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Admin Email */}
          <div className="form-control">
            
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="admin@institution.edu"
            />
            {errors.email && (
              <div className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            
            <input
              type="password"
              {...register("password")}
              className="input input-bordered w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Enter Password"
            />
            {errors.password && (
              <div className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn bg-sky-500 hover:bg-sky-600 text-white w-full"
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

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="/institutionlogin.png" alt="" className="max-w-sm"/>

      </div>
    </div>
  );
}
