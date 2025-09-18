import { useState } from "react";

const mockProblems = [
  { id: 1, name: "Two Sum", link: "#", difficulty: "Easy" },
  { id: 2, name: "Merge Intervals", link: "#", difficulty: "Medium" },
  { id: 3, name: "Word Ladder", link: "#", difficulty: "Hard" },
];

const mockBatches = ["SOT23B1", "SOT23B2"];

export default function TeacherProblemsPage() {
  const [problems, setProblems] = useState(mockProblems);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newProblem, setNewProblem] = useState({
    name: "",
    link: "",
    difficulty: "Easy",
  });

  const toggleProblem = (id) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleBatch = (batch) => {
    setSelectedBatches((prev) =>
      prev.includes(batch) ? prev.filter((b) => b !== batch) : [...prev, batch]
    );
  };

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!newProblem.name || !newProblem.link) return;
    setProblems([...problems, { id: problems.length + 1, ...newProblem }]);
    setNewProblem({ name: "", link: "", difficulty: "Easy" });
    setIsAddModalOpen(false);
  };

  const handleAssign = () => {
    alert(
      `Assigned problems ${selectedProblems.join(
        ", "
      )} to batches ${selectedBatches.join(", ")}`
    );
    setIsAssignModalOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-6">Problem List</h1>

      {/* Sticky Buttons */}
      <div className="sticky top-0 bg-white py-2 z-10 flex justify-end gap-4 mb-4 shadow-sm">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500"
        >
          Add Problem
        </button>
        <button
          onClick={() => setIsAssignModalOpen(true)}
          disabled={selectedProblems.length === 0}
          className={`px-4 py-2 rounded-lg font-medium transition 
            ${
              selectedProblems.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          Assign
        </button>
      </div>

      {/* Problems Table */}
      <table className="w-full border rounded-lg overflow-hidden bg-white shadow">
        <thead>
          <tr className="bg-yellow-100 text-left text-black font-medium">
            <th className="p-2">✔</th>
            <th className="p-2">Problem</th>
            <th className="p-2">Difficulty</th>
            <th className="p-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} className="border-t hover:bg-yellow-50">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedProblems.includes(p.id)}
                  onChange={() => toggleProblem(p.id)}
                />
              </td>
              <td className="p-2">{p.name}</td>
              <td
                className={`p-2 ${
                  p.difficulty === "Easy"
                    ? "text-green-600"
                    : p.difficulty === "Medium"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {p.difficulty}
              </td>
              <td className="p-2">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:underline"
                >
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Add New Problem</h3>
            <form onSubmit={handleAddProblem} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Problem Name"
                value={newProblem.name}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, name: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Problem Link"
                value={newProblem.link}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, link: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <select
                value={newProblem.difficulty}
                onChange={(e) =>
                  setNewProblem({ ...newProblem, difficulty: e.target.value })
                }
                className="border rounded px-3 py-2"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {/* {isAssignModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Assign Problems to Batches
            </h3>
            <div className="flex flex-wrap gap-3">
              {mockBatches.map((batch) => (
                <label
                  key={batch}
                  className={`px-3 py-1 border rounded-lg cursor-pointer ${
                    selectedBatches.includes(batch)
                      ? "bg-yellow-100 border-yellow-400"
                      : "bg-gray-50 border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBatches.includes(batch)}
                    onChange={() => toggleBatch(batch)}
                    className="hidden"
                  />
                  {batch}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={selectedBatches.length === 0}
                className={`px-4 py-2 rounded font-medium transition 
                  ${
                    selectedBatches.length === 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
              >
                Confirm Assign
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
