// export default function Teachers() {
//     return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Teachers</h2>
//       <div className="overflow-x-auto rounded-xl shadow-lg">
//         <table className="min-w-full border-collapse bg-white">
//           <thead className="bg-orange-500 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold">Profile</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <tr className="hover:bg-blue-50 transition">
//               <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
//               <td className="px-6 py-4 text-sm text-gray-700">Satya Sai Ramakrishnan</td>
//               <td className="px-6 py-4 text-sm text-gray-600">satyasai@pw.live</td>
//               <td className="px-6 py-4 text-sm text-center">
//                 <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
//                   Remove
//                 </button>
//               </td>
              
//             </tr>
//             <tr className="hover:bg-blue-50 transition">
//               <td className="px-6 py-4 text-sm text-gray-700 font-medium">2301010034</td>
//               <td className="px-6 py-4 text-sm text-gray-700">Syed Zabi Ulla</td>
//               <td className="px-6 py-4 text-sm text-gray-600">syedzabi@pw.live</td>
//               <td className="px-6 py-4 text-sm text-center">
//                 <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
//                   Remove
//                 </button>
//               </td>
              
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Teachers() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTeacher, setNewTeacher] = useState({ id: "", name: "", email: "" });

//   const [teachers, setTeachers] = useState([
//     { id: "034", name: "Satya Sai Ramakrishnan", email: "satyasai@pw.live" },
//     { id: "124", name: "Syed Zabi Ulla", email: "syedzabi@pw.live" },
//   ]);

//   const handleAddTeacher = (e) => {
//     e.preventDefault();
//     setTeachers([...teachers, newTeacher]);
//     setNewTeacher({ id: "", name: "", email: "" });
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-6">
//       {/* Header + Add button */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-orange-500 px-3 text-white py-1.5 rounded-xl hover:shadow hover:text-black hover:bg-white hover:transition"
//         >
//           + Add Teacher
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-xl shadow-lg">
//         <table className="min-w-full border-collapse bg-white">
//           <thead className="bg-orange-500 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold">
//                 Profile
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-semibold">
//                 Remove
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {teachers.map((teacher, index) => (
//               <tr className="hover:bg-blue-50 transition" key={index}>
//                 <td className="px-6 py-4 text-sm text-gray-700 font-medium">
//                   {teacher.id}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-700">
//                   {teacher.name}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">
//                   {teacher.email}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-center">
//                   <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
//                     View
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-center">
//                   <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Modal */}
//         <AnimatePresence>
//           {isModalOpen && (
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-gradient-to-br from-gray-900/40 to-gray-600/20 flex justify-center items-center z-50"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <motion.div
//                 key="modal"
//                 initial={{ opacity: 0, scale: 0.9, y: -20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -20 }}
//                 transition={{ duration: 0.2, ease: "easeOut" }}
//                 className="bg-white p-6 rounded-xl shadow-lg w-96"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <h3 className="text-lg font-semibold mb-4">Add New Teacher</h3>
//                 <form onSubmit={handleAddTeacher}>
//                   <input
//                     type="text"
//                     placeholder="ID"
//                     value={newTeacher.id}
//                     onChange={(e) =>
//                       setNewTeacher({ ...newTeacher, id: e.target.value })
//                     }
//                     className="w-full px-3 py-2 mb-2 rounded-lg border"
//                     required
//                   />

//                   <input
//                     type="text"
//                     placeholder="Name"
//                     value={newTeacher.name}
//                     onChange={(e) =>
//                       setNewTeacher({ ...newTeacher, name: e.target.value })
//                     }
//                     className="w-full px-3 py-2 mb-2 rounded-lg border"
//                     required
//                   />

//                   <input
//                     type="email"
//                     placeholder="Email"
//                     value={newTeacher.email}
//                     onChange={(e) =>
//                       setNewTeacher({ ...newTeacher, email: e.target.value })
//                     }
//                     className="w-full px-3 py-2 mb-2 rounded-lg border"
//                     required
//                   />

//                   <div className="flex justify-end gap-1.5 px-3 py-2">
//                     <button
//                       type="button"
//                       onClick={() => setIsModalOpen(false)}
//                       className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
//                     >
//                       Add Teacher
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Teachers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ id: "", name: "", email: "" });

  const [teachers, setTeachers] = useState([
    { id: "034", name: "Satya Sai Ramakrishnan", email: "satyasai@pw.live" },
    { id: "124", name: "Syed Zabi Ulla", email: "syedzabi@pw.live" },
  ]);

  // Add teacher
  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.id || !newTeacher.name || !newTeacher.email) return;
    setTeachers([...teachers, newTeacher]);
    setNewTeacher({ id: "", name: "", email: "" });
    setIsModalOpen(false);
  };

  // Remove teacher
  const handleRemoveTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header + Add button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 px-3 text-white py-1.5 rounded-xl hover:shadow hover:text-black hover:bg-white hover:transition"
        >
          + Add Teacher
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Profile
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Remove
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr className="hover:bg-blue-50 transition" key={teacher.id}>
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {teacher.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <button className="px-3 py-1.5 rounded-lg border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white transition">
                    View
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition" onClick={()=>handleRemoveTeac(teacher.id)}>
                    <Trash2 className="w-4 h-4"  />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-gray-900/40 to-gray-600/20 flex justify-center items-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white p-6 rounded-xl shadow-lg w-96"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Add New Teacher</h3>
                <form onSubmit={handleAddTeacher}>
                  <input
                    type="text"
                    placeholder="ID"
                    value={newTeacher.id}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, id: e.target.value })
                    }
                    className="w-full px-3 py-2 mb-2 rounded-lg border"
                    required
                  />

                  <input
                    type="text"
                    placeholder="Name"
                    value={newTeacher.name}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, name: e.target.value })
                    }
                    className="w-full px-3 py-2 mb-2 rounded-lg border"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={newTeacher.email}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, email: e.target.value })
                    }
                    className="w-full px-3 py-2 mb-2 rounded-lg border"
                    required
                  />

                  <div className="flex justify-end gap-1.5 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Add Teacher
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
