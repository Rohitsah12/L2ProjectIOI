import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Library,
  Plus,
  ExternalLink,
  X,
  ArrowLeft,
  CheckSquare,
  Sparkles,
} from "lucide-react";
import { handleError } from "../utils/notification";
import {
  loadOutline,
  saveOutline,
  recomputeTopic,
  displayPlatform,
  platformStyleClass,
} from "../utils/teacherBatchOutline";

function formatDifficulty(d) {
  if (!d) return "Easy";
  const u = String(d).toUpperCase();
  if (u === "EASY") return "Easy";
  if (u === "MEDIUM") return "Medium";
  if (u === "HARD") return "Hard";
  return d;
}

function difficultyPill(difficulty) {
  const d = formatDifficulty(difficulty);
  const base =
    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums";
  if (d === "Easy") return `${base} bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80`;
  if (d === "Medium") return `${base} bg-amber-50 text-amber-900 ring-1 ring-amber-200/80`;
  return `${base} bg-rose-50 text-rose-800 ring-1 ring-rose-200/80`;
}

export default function TeacherProblemsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const assign = location.state;

  const assignMode = Boolean(assign?.assignMode && assign?.batchId != null);
  const batchId = assign?.batchId;
  const returnPath = assign?.returnPath || "/teacher-dashboard";
  const topicIndex = assign?.topicIndex ?? 0;
  const subtopicIndex = assign?.subtopicIndex ?? 0;

  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProblem, setNewProblem] = useState({
    name: "",
    link: "",
    difficulty: "Easy",
    platform: "LeetCode",
  });

  const toggleProblem = (id) => {
    setSelectedProblems((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAddProblem = (e) => {
    e.preventDefault();
    if (!newProblem.name || !newProblem.link) return;
    const difficultyMap = { Easy: "EASY", Medium: "MEDIUM", Hard: "HARD" };
    const optimistic = {
      id: `local-${Date.now()}`,
      title: newProblem.name,
      link: newProblem.link,
      difficulty: difficultyMap[newProblem.difficulty] || "EASY",
      platform: { name: newProblem.platform },
    };
    setProblems((prev) => [...prev, optimistic]);
    setNewProblem({
      name: "",
      link: "",
      difficulty: "Easy",
      platform: "LeetCode",
    });
    setIsAddModalOpen(false);
  };

  const handleAssign = () => {
    if (!assignMode || !batchId) return;
    if (selectedProblems.length === 0) return;

    const outline = loadOutline(batchId) ?? [];
    if (!outline[topicIndex]?.classes?.[subtopicIndex]) {
      handleError(
        "Could not find this topic/subtopic. Go back to the batch Content tab."
      );
      return;
    }

    const sub = outline[topicIndex].classes[subtopicIndex];
    const existingIds = new Set(
      sub.problems.map((p) => p.problemId).filter(Boolean)
    );

    selectedProblems.forEach((pid) => {
      if (existingIds.has(pid)) return;
      const p = problems.find((x) => x.id === pid);
      if (!p) return;
      sub.problems.push({
        name: p.title,
        difficulty: formatDifficulty(p.difficulty),
        platform: displayPlatform(p),
        solved: false,
        link: p.link || "#",
        starred: false,
        problemId: p.id,
      });
      existingIds.add(pid);
    });

    recomputeTopic(outline[topicIndex]);
    saveOutline(batchId, outline);
    navigate(returnPath, { replace: true, state: { assignDone: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/80 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-amber-800">
              <Library className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Problem bank
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Your problems
            </h1>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {assignMode && (
              <button
                type="button"
                onClick={() => navigate(returnPath)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back to batch
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add problem
            </button>
            {assignMode && (
              <button
                type="button"
                onClick={handleAssign}
                disabled={selectedProblems.length === 0}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
                  selectedProblems.length === 0
                    ? "cursor-not-allowed bg-slate-200 text-slate-500"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                <CheckSquare className="h-4 w-4" aria-hidden />
                Assign
                {selectedProblems.length > 0 && (
                  <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-xs tabular-nums">
                    {selectedProblems.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100">
          {problems.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Sparkles className="h-7 w-7" aria-hidden />
              </div>
              <p className="text-base font-semibold text-slate-800">No problems yet</p>
              <p className="mt-1 max-w-sm text-sm text-slate-600">
                Add your first problem to build a bank you can assign to any batch.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-amber-950 shadow-sm hover:bg-amber-400"
              >
                <Plus className="h-4 w-4" />
                Add problem
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/95">
                    {assignMode && (
                      <th className="w-12 px-3 py-3 text-center text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        <span className="sr-only">Select</span>
                      </th>
                    )}
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      Problem
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      Platform
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      Difficulty
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {problems.map((p) => (
                    <tr
                      key={p.id}
                      className="transition-colors hover:bg-slate-50/90"
                    >
                      {assignMode && (
                        <td className="px-3 py-3 text-center align-middle">
                          <input
                            type="checkbox"
                            checked={selectedProblems.includes(p.id)}
                            onChange={() => toggleProblem(p.id)}
                            className="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                            aria-label={`Select ${p.title}`}
                          />
                        </td>
                      )}
                      <td className="max-w-[220px] px-4 py-3 font-medium text-slate-900">
                        <span className="line-clamp-2" title={p.title}>
                          {p.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span
                          className={platformStyleClass(displayPlatform(p))}
                          title={displayPlatform(p)}
                        >
                          {displayPlatform(p)}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <span className={difficultyPill(p.difficulty)}>
                          {formatDifficulty(p.difficulty)}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          Open
                          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:items-center"
          role="presentation"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-problem-title"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  id="add-problem-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Add problem
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Saved locally for this session until the create API is wired.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProblem} className="mt-5 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="pb-platform"
                  className="mb-1 block text-xs font-semibold text-slate-600"
                >
                  Platform
                </label>
                <select
                  id="pb-platform"
                  value={newProblem.platform}
                  onChange={(e) =>
                    setNewProblem({ ...newProblem, platform: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm font-medium text-slate-900 outline-none ring-amber-200 transition focus:border-amber-400 focus:bg-white focus:ring-2"
                >
                  <option value="GFG">GFG</option>
                  <option value="LeetCode">LeetCode</option>
                  <option value="Codeforces">Codeforces</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="pb-name"
                  className="mb-1 block text-xs font-semibold text-slate-600"
                >
                  Title
                </label>
                <input
                  id="pb-name"
                  type="text"
                  placeholder="e.g. Two Sum"
                  value={newProblem.name}
                  onChange={(e) =>
                    setNewProblem({ ...newProblem, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm outline-none ring-amber-200 transition focus:border-amber-400 focus:bg-white focus:ring-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="pb-link"
                  className="mb-1 block text-xs font-semibold text-slate-600"
                >
                  URL
                </label>
                <input
                  id="pb-link"
                  type="text"
                  placeholder="https://…"
                  value={newProblem.link}
                  onChange={(e) =>
                    setNewProblem({ ...newProblem, link: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm outline-none ring-amber-200 transition focus:border-amber-400 focus:bg-white focus:ring-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="pb-difficulty"
                  className="mb-1 block text-xs font-semibold text-slate-600"
                >
                  Difficulty
                </label>
                <select
                  id="pb-difficulty"
                  value={newProblem.difficulty}
                  onChange={(e) =>
                    setNewProblem({ ...newProblem, difficulty: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm font-medium outline-none ring-amber-200 transition focus:border-amber-400 focus:bg-white focus:ring-2"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
