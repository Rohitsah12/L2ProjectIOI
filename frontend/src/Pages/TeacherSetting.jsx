import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, UserCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { email } from "zod";

export default function TeacherSetting() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([
    { teacherId: 1, name: "Dr. Amit Sharma", subject: "Mathematics", batches: ["SOT23B1"] , email:"amit@gmail.com",},
    { teacherId: 2, name: "Prof. Neha Verma", subject: "Physics", batches: ["SOT23B2"], email:"neha@gmail.com" }
  ]);

  const [newTeacher, setNewTeacher] = useState({teacherId: "", name: "", subject: "", batches: "", email:"" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.name && !newTeacher.subject) return;
    setTeachers([...teachers, { ...newTeacher }]);
    setNewTeacher({teacherId: "", name: "", subject: "", batches: "", email:"" });
    setIsModalOpen(false);
  };

  // Brighter green gradients
  const gradients = [
    "from-green-50 to-green-100",
    "from-lime-50 to-lime-100",
    "from-emerald-50 to-emerald-100",
    "from-gray-50 to-gray-100",
    "from-slate-50 to-slate-100"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mx-10 my-10 rounded-3xl px-10 py-5 shadow-md">
      {/* Header */}
      <div className="flex justify-around items-center w-full">
        <div>
          <div className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Teacher <span className="text-black">Management</span>
          </div>
          <div className="text-2xl font-medium text-gray-600">
            Add and Manage Teachers
          </div>
        </div>
        <img src="../public/images/teacherSetting.png" alt="" height={150} width={200} />
      </div>

      {/* Add Teacher Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle size={16} /> Add New Teacher
        </button>
      </div>

      {/* Teacher Cards */}
      <div className="flex flex-wrap gap-5 mx-2 ">
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.teacherId}
            onClick={() => navigate("/teacher/details")}
            whileHover={{ scale: 1.03 }}
            className={`relative bg-gradient-to-br ${gradients[index % gradients.length]} text-gray-800 border border-gray-200 rounded-2xl p-5 hover:shadow-md cursor-pointer transition opacity-0 translate-y-4 animate-fadeInUp w-3xs`}
          >
            <UserCheck
              fill="currentColor"
              strokeWidth={0}
              size={26}
              className="text-green-600 absolute top-2 right-4"
            />
            <div className="font-bold text-lg">{teacher.name}</div>
             <div className="text-sm text-gray-600">Teacher ID : {teacher.teacherId}</div>

          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl shadow-lg w-96 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Teacher</h3>

              <form onSubmit={handleAddTeacher}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Teacher ID"
                  value={newTeacher.teacherId}
                  onChange={(e) => setNewTeacher({ ...newTeacher, teacherId: e.target.value })}
                  className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
                />

                <div className="flex justify-end gap-2 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <PlusCircle size={16} /> Add Teacher
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
