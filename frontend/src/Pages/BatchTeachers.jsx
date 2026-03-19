import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, UserPlus } from "lucide-react";
import axios from "axios";
import { handleSuccess } from "../utils/notification";

// Dummy data – no API integration for now
const DUMMY_COLLEGE_TEACHERS = [
  { id: "1", name: "Dr. Amit Sharma", email: "amit@gmail.com", teacherEnrollmentId: "T001" },
  { id: "2", name: "Prof. Neha Verma", email: "neha@gmail.com", teacherEnrollmentId: "T002" },
  { id: "3", name: "Mr. Raj Kumar", email: "raj@gmail.com", teacherEnrollmentId: "T003" },
];

const api = axios.create({
  baseURL :"http://localhost:3000/api",
  withCredentials: true,
  headers: {"Content-Type": "application/json"}
})



export default function BatchTeachers() {
  const { batchId } = useParams();
  const [batchTeachers, setBatchTeachers] = useState([]);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [dropdownTeacher, setDropdownTeacher] = useState([]);




  
  // Fetch all college teachers for the "Add teacher" dropdown
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get("/teacher/get");
        const t = res.data?.teachers;
        if (t) setDropdownTeacher(t);
      } catch (error) {
        console.error("Fetch teachers:", error.response?.data?.msg ?? error.message);
      }
    };
    fetchTeachers();
  }, []);

  // Fetch teachers already in this batch (so table is correct on load/refresh)
  useEffect(() => {
    if (!batchId) return;
    const fetchBatchTeachers = async () => {
      try {
        const res = await api.get(`/batch/get/${batchId}/teachers`);
        const teachers = res.data?.teachers;
        if (Array.isArray(teachers)) setBatchTeachers(teachers);
      } catch (error) {
        console.error("Fetch batch teachers:", error.response?.data?.msg ?? error.message);
      }
    };
    fetchBatchTeachers();
  }, [batchId]);


  

  const availableToAdd = dropdownTeacher.filter((t) => !batchTeachers.some((b)=> b.id === t.id));


  const handleCloseAddModal = () => {
    setSelectedTeacherId("");
    setIsAddTeacherModalOpen(false);
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacherId) return;
    if (!batchId) {
      console.error("batchId is missing (check route params, e.g. /batch/:batchId/teachers)");
      return;
    }
    try {
      await api.post("/batch/createTeacher", {
        batchId,
        teacherId: selectedTeacherId,
      });
      handleSuccess("Teacher added to batch.");
      setBatchTeachers((prev) => {
        const teacher = dropdownTeacher.find((t) => t.id === selectedTeacherId);
        return teacher
          ? [...prev, { ...teacher, teacherBatchId: `tb-${teacher.id}-${Date.now()}` }]
          : prev;
      });
      handleCloseAddModal();
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || "Failed to add teacher.";
      console.error(msg);
    }
  };

  

  const handleRemoveFromBatch = async (teacherBatchId) => {
    if (!teacherBatchId) return;
    try {
 

      await api.delete(`/batch/deleteTeacher${teacherBatchId}`);
      handleSuccess("Teacher removed from the batch");
      setBatchTeachers((prev) =>prev.filter((t) => t.id!==teacherBatchId))
    } catch (err) {
      const msg = err.response?.data?.msg || err.message || "Failed to remove teacher.";
      console.error(msg);
    }
  };

  return (
    <div className="p-6">
      <p className="text-sm text-gray-500 mb-4">Dummy data – no API. Add/remove only updates local state.</p>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Teachers in this batch</h2>
        <button
          onClick={() => setIsAddTeacherModalOpen(true)}
          className="bg-blue-500 px-3 text-white py-1.5 rounded-xl hover:shadow hover:bg-blue-600 transition flex items-center gap-2"
        >
          <UserPlus size={18} /> Add Teacher
        </button>
      </div>

      {/* Add Teacher Modal - same pattern as BatchSetting, Sot23b1Students, etc. */}
      <AnimatePresence>
        {isAddTeacherModalOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={handleCloseAddModal}
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
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Teacher</h3>

              {availableToAdd.length === 0 ? (
                <p className="text-sm text-gray-500 mb-4">No more teachers to add from your college.</p>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select a teacher</label>
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="w-full px-3 py-2 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Choose teacher…</option>
                    {availableToAdd.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.email})
                      </option>
                    ))}
                  </select>
                </>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAssignTeacher}
                  disabled={!selectedTeacherId}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <UserPlus size={16} /> Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Enrollment ID</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Remove from batch</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batchTeachers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No teachers in this batch. Click &quot;Add Teacher&quot; to assign (dummy).
                </td>
              </tr>
            ) : (
              batchTeachers.map((teacher) => (
                <tr className="hover:bg-blue-50 transition" key={teacher.teacherBatchId || teacher.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{teacher.teacherEnrollmentId || "—"}</td>
                  <td className="px-6 py-4 text-sm text-center">
                    <button
                      onClick={() => handleRemoveFromBatch(teacher.teacherBatchId)}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
                      title="Remove from batch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
