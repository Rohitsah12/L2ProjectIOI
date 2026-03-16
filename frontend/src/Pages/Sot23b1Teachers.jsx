import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, UserPlus } from "lucide-react";

// Dummy data – no API integration for now
const DUMMY_COLLEGE_TEACHERS = [
  { id: "1", name: "Dr. Amit Sharma", email: "amit@gmail.com", teacherEnrollmentId: "T001" },
  { id: "2", name: "Prof. Neha Verma", email: "neha@gmail.com", teacherEnrollmentId: "T002" },
  { id: "3", name: "Mr. Raj Kumar", email: "raj@gmail.com", teacherEnrollmentId: "T003" },
];

export default function Sot23b1Teachers() {
  const { batchId } = useParams();
  // Dummy: start with 2 teachers in this batch; teacherBatchId for remove key
  const [batchTeachers, setBatchTeachers] = useState([
    { id: "1", name: "Dr. Amit Sharma", email: "amit@gmail.com", teacherEnrollmentId: "T001", teacherBatchId: "tb1" },
    { id: "2", name: "Prof. Neha Verma", email: "neha@gmail.com", teacherEnrollmentId: "T002", teacherBatchId: "tb2" },
  ]);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const alreadyInBatch = batchTeachers.map((t) => t.id);
  const availableToAdd = DUMMY_COLLEGE_TEACHERS.filter((t) => !alreadyInBatch.includes(t.id));

  const handleAssignTeacher = () => {
    if (!selectedTeacherId) return;
    const teacher = DUMMY_COLLEGE_TEACHERS.find((t) => t.id === selectedTeacherId);
    if (teacher) {
      setBatchTeachers((prev) => [
        ...prev,
        { ...teacher, teacherBatchId: `tb-${teacher.id}-${Date.now()}` },
      ]);
    }
    setSelectedTeacherId("");
    setAddDropdownOpen(false);
  };

  const handleRemoveFromBatch = (teacherBatchId) => {
    setBatchTeachers((prev) => prev.filter((t) => t.teacherBatchId !== teacherBatchId));
  };

  return (
    <div className="p-6">
      <p className="text-sm text-gray-500 mb-4">Dummy data – no API. Add/remove only updates local state.</p>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Teachers in this batch</h2>
        <div className="relative">
          <button
            onClick={() => setAddDropdownOpen((o) => !o)}
            className="bg-blue-500 px-3 text-white py-1.5 rounded-xl hover:shadow hover:bg-blue-600 transition flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Teacher
          </button>
          <AnimatePresence>
            {addDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-10"
              >
                <div className="px-3 py-2 text-sm text-gray-500 border-b">
                  Select a teacher from your college
                </div>
                {availableToAdd.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-500">
                    No more teachers to add (dummy list).
                  </div>
                ) : (
                  <>
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="w-full mx-2 mt-2 px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="">Choose teacher…</option>
                      {availableToAdd.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.email})
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-end gap-2 px-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setAddDropdownOpen(false)}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAssignTeacher}
                        disabled={!selectedTeacherId}
                        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm disabled:opacity-50"
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
