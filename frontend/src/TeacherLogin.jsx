import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const teacherLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  // Adding teacher-specific field if needed (e.g., teacherId)
  teacherId: z.string().min(1, { message: "Teacher ID is required" }),
});

function TeacherLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(teacherLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('Teacher login data:', data);
      // API call would go here
      // Example: await axios.post('/api/teachers/login', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="/teacherlogin.png" className="max-w-sm" alt="" />
      </div>

      <div className="flex w-full md:w-1/2  justify-center items-center">

        <div className="card  w-[300px] lg:w-[450px] shadow-xl bg-base-100 p-6">
          <img src="/logo.png" className="h-20 w-20 mx-auto" alt="School Logo" />
          <h2 className="text-2xl font-bold text-center mb-6">Teacher Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4">
            {/* Email Field */}
            <div className="form-control w-full">
              <input
                type="email"
                {...register('email')}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
                placeholder="Teacher Email"
              />
              {errors.email && (
                <div className="mt-1 text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control w-full">
              <input
                type="password"
                {...register('password')}
                className="input input-bordered w-full focus:outline-none focus:border-sky-500 hover:border-sky-500"
                placeholder="Password"
              />
              {errors.password && (
                <div className="mt-1 text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control w-full mt-4">
              <button 
                className="btn bg-sky-500 w-full text-white" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : 'Login as Teacher'}
              </button>
            </div>
          </form>

          
        </div>
      </div>
      
    </div>
  );
}

export default TeacherLogin;