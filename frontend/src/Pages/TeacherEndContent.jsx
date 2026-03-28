import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Plus,
  BookOpen,
  Library,
  ExternalLink,
  ChevronRight,
  ListTree,
  Eye,
} from "lucide-react";
import {
  loadOutline,
  saveOutline,
  recomputeTopic,
  recomputeAll,
  defaultTopics,
  normalizeOutlineShape,
  displayPlatform,
  platformStyleClass,
} from "../utils/teacherBatchOutline";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const diffBadge = (d) => {
  const base = "text-xs font-semibold px-2 py-0.5 rounded-full shrink-0";
  if (d === "Easy") return `${base} bg-emerald-100 text-emerald-800`;
  if (d === "Medium") return `${base} bg-orange-100 text-orange-800`;
  return `${base} bg-rose-100 text-rose-800`;
};

export default function TeacherEndContent() {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isTeacherBatch =
    Boolean(batchId) && /\/teacher\//i.test(location.pathname);

  const [data, setData] = useState(() => {
    if (batchId) {
      const loaded = loadOutline(batchId);
      if (loaded) return loaded;
      return [];
    }
    return defaultTopics;
  });

  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [newTopicMode, setNewTopicMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [addSubtopicForTopic, setAddSubtopicForTopic] = useState(false);
  const [newSubtopic, setNewSubtopic] = useState({
    title: "",
    notesLink: "",
  });
  /** Which subtopic index under the selected topic is expanded (`null` = all collapsed). */
  const [expandedSubtopicIndex, setExpandedSubtopicIndex] = useState(null);
  const [batchName, setBatchName] = useState(null);

  const persist = useCallback(
    (next) => {
      setData(next);
      if (batchId && isTeacherBatch) {
        saveOutline(batchId, next);
      }
    },
    [batchId, isTeacherBatch]
  );

  useEffect(() => {
    if (!batchId || !isTeacherBatch) return;
    const loaded = loadOutline(batchId);
    if (loaded) {
      normalizeOutlineShape(loaded);
      recomputeAll(loaded);
      setData(loaded);
    }
  }, [batchId, isTeacherBatch, location.key, location.pathname]);

  useEffect(() => {
    if (!batchId || !isTeacherBatch) {
      setBatchName(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get("/teacher/get-batch");
        const list = res.data?.batches ?? [];
        const b = Array.isArray(list)
          ? list.find((x) => String(x?.id) === String(batchId))
          : null;
        if (!cancelled) setBatchName(b?.name ?? null);
      } catch {
        if (!cancelled) setBatchName(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [batchId, isTeacherBatch]);

  useEffect(() => {
    if (data.length === 0) {
      setSelectedTopicIndex(0);
      return;
    }
    setSelectedTopicIndex((i) => Math.min(i, data.length - 1));
  }, [data.length]);

  useEffect(() => {
    setExpandedSubtopicIndex(null);
  }, [selectedTopicIndex]);

  const toggleSubtopicExpanded = (cIndex) => {
    setExpandedSubtopicIndex((prev) => (prev === cIndex ? null : cIndex));
  };

  const addTopic = () => {
    const t = newTopicTitle.trim();
    if (!t) return;
    const next = [
      ...data,
      {
        title: t,
        total: 0,
        completed: 0,
        classes: [],
      },
    ];
    recomputeAll(next);
    persist(next);
    setNewTopicTitle("");
    setNewTopicMode(false);
    setSelectedTopicIndex(next.length - 1);
  };

  const addSubtopic = (tIndex) => {
    const title = newSubtopic.title.trim();
    if (!title) return;
    const next = structuredClone(data);
    next[tIndex].classes.push({
      title,
      notesLink: newSubtopic.notesLink.trim() || "#",
      total: 0,
      completed: 0,
      problems: [],
    });
    recomputeTopic(next[tIndex]);
    recomputeAll(next);
    persist(next);
    setNewSubtopic({ title: "", notesLink: "" });
    setAddSubtopicForTopic(false);
  };

  const goAssignProblems = (topicIndex, subtopicIndex) => {
    if (!batchId) return;
    navigate("/teacher/problems", {
      state: {
        assignMode: true,
        batchId,
        returnPath: `/teacher/${batchId}/content`,
        topicIndex,
        subtopicIndex,
      },
    });
  };

  const topic = data[selectedTopicIndex];
  const topicClasses = topic?.classes ?? [];

  return (
    <div className="min-h-0 bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5 lg:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2 text-amber-800">
              <Library className="h-5 w-5 shrink-0" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Batch workspace
              </span>
              {batchName && (
                <span className="truncate text-sm font-semibold text-slate-800">
                  · {batchName}
                </span>
              )}
            </div>
            {isTeacherBatch && batchId && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/teacher/problems")}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <ListTree className="h-3.5 w-3.5" />
                  My Problem List
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/teacher/${batchId}/problemslist`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Open batch problem list
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-5 lg:px-6">
        {(Boolean(batchId) || data.length > 0) && (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5">
            {/* Topics sidebar */}
            <aside className="w-full shrink-0 lg:w-52 xl:w-56">
              <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                <p className="px-1.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Topics
                </p>
                <nav className="space-y-0.5">
                  {data.map((t, tIdx) => (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => setSelectedTopicIndex(tIdx)}
                      title={`${t.completed}/${t.total} solved · ${t.classes?.length ?? 0} subtopics`}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                        selectedTopicIndex === tIdx
                          ? "bg-amber-50 ring-1 ring-amber-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="min-w-0 flex-1 truncate font-medium text-slate-900">
                        {t.title}
                      </span>
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {t.classes?.length ?? 0} st
                      </span>
                    </button>
                  ))}
                </nav>

                {isTeacherBatch && (
                  <div className="mt-2 border-t border-slate-100 pt-2">
                    {!newTopicMode ? (
                      <button
                        type="button"
                        onClick={() => setNewTopicMode(true)}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2 text-xs font-medium text-slate-700 hover:border-amber-400 hover:bg-amber-50/50"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        New topic
                      </button>
                    ) : (
                      <div className="space-y-2 rounded-lg bg-slate-50 p-2">
                        <input
                          type="text"
                          placeholder="Topic title"
                          className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          autoFocus
                        />
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={addTopic}
                            className="flex-1 rounded-md bg-slate-900 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNewTopicMode(false);
                              setNewTopicTitle("");
                            }}
                            className="rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>

            {/* Main workspace */}
            <main className="min-w-0 flex-1">
              {data.length === 0 && isTeacherBatch && (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 text-center">
                  <BookOpen className="mx-auto h-9 w-9 text-slate-300" />
                  <p className="mt-3 text-base font-medium text-slate-800">No topics yet</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Use <strong>New topic</strong> in the sidebar to start this batch.
                  </p>
                </div>
              )}

              {topic && (
                <>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{topic.title}</h2>
                    </div>
                    {isTeacherBatch && (
                      <button
                        type="button"
                        onClick={() => setAddSubtopicForTopic(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-600"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add subtopic
                      </button>
                    )}
                  </div>

                  {isTeacherBatch && addSubtopicForTopic && (
                    <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <h3 className="text-xs font-semibold text-slate-800">New subtopic</h3>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Name (e.g. Lecture 1: Sorting)"
                          className="rounded-md border border-slate-200 px-2 py-1.5 text-sm sm:col-span-2"
                          value={newSubtopic.title}
                          onChange={(e) =>
                            setNewSubtopic({ ...newSubtopic, title: e.target.value })
                          }
                        />
                        <input
                          type="url"
                          placeholder="Notes URL (optional)"
                          className="rounded-md border border-slate-200 px-2 py-1.5 text-sm sm:col-span-2"
                          value={newSubtopic.notesLink}
                          onChange={(e) =>
                            setNewSubtopic({ ...newSubtopic, notesLink: e.target.value })
                          }
                        />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => addSubtopic(selectedTopicIndex)}
                          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                        >
                          Save subtopic
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAddSubtopicForTopic(false);
                            setNewSubtopic({ title: "", notesLink: "" });
                          }}
                          className="rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {topicClasses.length === 0 && !addSubtopicForTopic && (
                      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-3 py-5 text-center text-xs text-slate-600">
                        No subtopics yet. Add one above, then assign problems from your bank.
                      </p>
                    )}

                    {topicClasses.map((cls, cIndex) => {
                      const expanded = expandedSubtopicIndex === cIndex;
                      return (
                        <section
                          key={cIndex}
                          className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm"
                        >
                          <div className="flex flex-wrap items-stretch gap-2 bg-slate-50/80 px-3 py-2.5 sm:px-4">
                            <div
                              role="button"
                              tabIndex={0}
                              aria-expanded={expanded}
                              onClick={() => toggleSubtopicExpanded(cIndex)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggleSubtopicExpanded(cIndex);
                                }
                              }}
                              className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg outline-none ring-amber-400 focus-visible:ring-2"
                            >
                              <ChevronRight
                                className={`mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                                  expanded ? "rotate-90" : ""
                                }`}
                                aria-hidden
                              />
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {cls.title}
                                </h3>
                                {cls.notesLink && cls.notesLink !== "#" && (
                                  <a
                                    href={cls.notesLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => e.stopPropagation()}
                                  >
                                    Notes
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                            </div>
                            {isTeacherBatch && (
                              <div
                                className="flex shrink-0 items-center border-t border-slate-200/80 pt-3 sm:border-t-0 sm:pt-0 sm:pl-2 sm:border-l sm:border-slate-200/80"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    goAssignProblems(selectedTopicIndex, cIndex)
                                  }
                                  className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200 hover:bg-amber-50"
                                >
                                  Assign from bank
                                </button>
                              </div>
                            )}
                          </div>

                          {expanded && (
                            <div className="border-t border-slate-100 p-3">
                              {cls.problems.length === 0 ? (
                                <p className="py-3 text-center text-xs text-slate-500">
                                  No problems linked. Use{" "}
                                  <strong className="text-slate-700">Assign from bank</strong>.
                                </p>
                              ) : (
                                <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-slate-50/40">
                                  {cls.problems.map((p, pIndex) => (
                                    <li
                                      key={pIndex}
                                      className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm sm:flex-nowrap"
                                    >
                                      <span className={diffBadge(p.difficulty)}>
                                        {p.difficulty}
                                      </span>
                                      <span
                                        className={platformStyleClass(displayPlatform(p))}
                                        title={displayPlatform(p)}
                                      >
                                        {displayPlatform(p)}
                                      </span>
                                      <span className="min-w-0 flex-1 font-medium text-slate-900">
                                        {p.name}
                                      </span>
                                      <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                                      >
                                        Open
                                        <ExternalLink className="h-3.5 w-3.5" />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>
                </>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
