import { 
  useParams,
  useNavigate,
  useInRouterContext,
  MemoryRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Save, PlusCircle, X } from "lucide-react";


const TEACHER_DATA = {
  "1": { teacherId: 1, name: "Dr. Amit Sharma", subject: "Mathematics", batches: ["SOT23B1"], email: "amit@gmail.com" },
  "2": { teacherId: 2, name: "Prof. Neha Verma", subject: "Physics", batches: ["SOT23B2"], email: "neha@gmail.com" },
};

function TeacherDetailsInner() {
  const { id } = useParams(); // teacherId via route param
  const navigate = useNavigate();

  const teacher = TEACHER_DATA[id ?? ""];

  // Guard: unknown teacher
  if (!teacher) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mx-10 my-10 rounded-3xl px-10 py-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Details</h1>
          <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Back</button>
        </div>
        <div className="p-10 text-center text-gray-600">Teacher not found (id: {id})</div>
      </div>
    );
  }

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...teacher });
  const [newBatch, setNewBatch] = useState("");

  const handleSave = () => {
    // TODO: replace with API call
    console.log("Updated Teacher Data:", formData);
    setEditMode(false);
  };

  const handleAddBatch = () => {
    if (!newBatch.trim()) return;
    if (formData.batches.includes(newBatch.trim())) return; // avoid duplicates
    setFormData({ ...formData, batches: [...formData.batches, newBatch.trim()] });
    setNewBatch("");
  };

  const handleRemoveBatch = (batch) => {
    setFormData({ ...formData, batches: formData.batches.filter((b) => b !== batch) });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mx-10 my-10 rounded-3xl px-10 py-8 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Teacher Details</h1>
        {editMode ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Save size={16} /> Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300"
          >
            <Edit size={16} /> Edit
          </button>
        )}
      </div>

      {/* Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-xl shadow p-6 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 mt-1">{formData.name}</div>
            )}
          </div>

          {/* Teacher ID */}
          <div>
            <label className="text-sm text-gray-500">Teacher ID</label>
            <div className="text-lg font-semibold text-gray-800 mt-1">{formData.teacherId}</div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            {editMode ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="text-lg text-gray-700 mt-1">{formData.email}</div>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm text-gray-500">Subject</label>
            {editMode ? (
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="text-lg text-gray-700 mt-1">{formData.subject}</div>
            )}
          </div>
        </div>

        {/* Batches */}
        <div className="mt-6">
          <label className="text-sm text-gray-500">Batches</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.batches.map((batch) => (
              <span key={batch} className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {batch}
                {editMode && (
                  <button aria-label={`remove ${batch}`} onClick={() => handleRemoveBatch(batch)} className="hover:text-green-900">
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>

          {editMode && (
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                placeholder="Add Batch"
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleAddBatch}
                className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-1 hover:bg-green-700"
              >
                <PlusCircle size={16} /> Add
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Back Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>
      </div>
    </div>
  );
}


export default function TeacherDetails() {
  const inRouter = useInRouterContext();
  if (inRouter) return <TeacherDetailsInner />;

  return (
    <MemoryRouter initialEntries={["/teacher/1"]}>
      <div className="p-4 bg-white/70">
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-semibold">Test Harness:</span> This page is running without a Router, so a <code>MemoryRouter</code> is provided. Try:
          <span className="ml-2 inline-flex gap-2">
            <Link className="underline" to="/teacher/1">/teacher/1</Link>
            <Link className="underline" to="/teacher/2">/teacher/2</Link>
          </span>
        </div>
        <Routes>
          <Route path="/teacher/:id" element={<TeacherDetailsInner />} />
          <Route path="*" element={<Navigate to="/teacher/1" replace />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
}
