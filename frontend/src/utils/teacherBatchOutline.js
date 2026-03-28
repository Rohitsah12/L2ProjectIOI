/** Session outline for a batch: topics → subtopics (classes) → problems. */

export const outlineKey = (batchId) => `teacherBatchProblemOutline_${batchId}`;

/** Label for UI: outline uses string `platform`; bank rows may use `platform.name`. */
export function displayPlatform(problem) {
  if (!problem) return "—";
  if (typeof problem.platform === "string" && problem.platform.trim()) {
    return problem.platform.trim();
  }
  if (problem.platform?.name) return String(problem.platform.name);
  return "—";
}

/** Ensure nested arrays exist so UI never crashes on old/corrupt session data. */
export function normalizeOutlineShape(topics) {
  if (!Array.isArray(topics)) return [];
  topics.forEach((topic) => {
    if (!Array.isArray(topic.classes)) topic.classes = [];
    topic.classes.forEach((cls) => {
      if (!Array.isArray(cls.problems)) cls.problems = [];
      cls.problems.forEach((p) => {
        p.platform = displayPlatform(p);
      });
    });
  });
  return topics;
}

/** Tailwind classes for a compact platform pill (GFG / LeetCode / Codeforces / …). */
export function platformStyleClass(platformLabel) {
  const u = String(platformLabel || "")
    .trim()
    .toLowerCase();
  const base =
    "inline-flex max-w-[7.5rem] truncate rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1";
  if (u.includes("leetcode")) return `${base} bg-orange-50 text-orange-900 ring-orange-200/80`;
  if (u.includes("gfg") || u.includes("geeksforgeeks") || u === "geeks")
    return `${base} bg-emerald-50 text-emerald-900 ring-emerald-200/80`;
  if (u.includes("codeforces") || u === "cf")
    return `${base} bg-sky-50 text-sky-900 ring-sky-200/80`;
  if (u === "—" || u === "" || u === "-")
    return `${base} bg-slate-50 text-slate-500 ring-slate-200/70`;
  return `${base} bg-violet-50 text-violet-900 ring-violet-200/80`;
}

export function recomputeTopic(topic) {
  if (!Array.isArray(topic.classes)) topic.classes = [];
  let tDone = 0;
  let tAll = 0;
  topic.classes.forEach((c) => {
    let cDone = 0;
    c.problems.forEach((p) => {
      if (p.solved) cDone++;
    });
    c.completed = cDone;
    c.total = c.problems.length;
    tDone += cDone;
    tAll += c.problems.length;
  });
  topic.completed = tDone;
  topic.total = tAll;
}

export function recomputeAll(topics) {
  topics.forEach(recomputeTopic);
}

export function loadOutline(batchId) {
  if (!batchId) return null;
  try {
    const raw = sessionStorage.getItem(outlineKey(batchId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        normalizeOutlineShape(parsed);
        recomputeAll(parsed);
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function saveOutline(batchId, topics) {
  if (!batchId) return;
  try {
    sessionStorage.setItem(outlineKey(batchId), JSON.stringify(topics));
  } catch {
    /* ignore */
  }
}

/** Demo data for routes without a batch id (e.g. student assignment preview). */
export const defaultTopics = [
  {
    title: "Step 1: Learn the basics",
    total: 31,
    completed: 0,
    classes: [
      {
        title: "Lec 1: Sorting-I",
        notesLink: "#",
        total: 3,
        completed: 0,
        problems: [
          {
            name: "Selection Sort",
            difficulty: "Easy",
            platform: "GFG",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Bubble Sort",
            difficulty: "Easy",
            platform: "LeetCode",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Insertion Sort",
            difficulty: "Easy",
            platform: "Codeforces",
            solved: false,
            link: "#",
            starred: false,
          },
        ],
      },
      {
        title: "Lec 1: Sorting-II",
        notesLink: "#",
        total: 28,
        completed: 0,
        problems: [
          {
            name: "Selection Sort",
            difficulty: "Easy",
            platform: "LeetCode",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Bubble Sort",
            difficulty: "Easy",
            platform: "Codeforces",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Insertion Sort",
            difficulty: "Easy",
            platform: "GFG",
            solved: false,
            link: "#",
            starred: false,
          },
        ],
      },
    ],
  },
  {
    title: "Step 2: Learn Important Sorting Techniques",
    total: 7,
    completed: 0,
    classes: [
      {
        title: "Lec 1: Sorting-I",
        notesLink: "#",
        total: 3,
        completed: 0,
        problems: [
          {
            name: "Selection Sort",
            difficulty: "Easy",
            platform: "Codeforces",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Bubble Sort",
            difficulty: "Easy",
            platform: "GFG",
            solved: false,
            link: "#",
            starred: false,
          },
          {
            name: "Insertion Sort",
            difficulty: "Easy",
            platform: "LeetCode",
            solved: false,
            link: "#",
            starred: false,
          },
        ],
      },
    ],
  },
];
