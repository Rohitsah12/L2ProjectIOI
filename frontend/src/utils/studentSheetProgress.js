/**
 * Student-side progress for the sheet (solved / starred), separate from mentor outline.
 * Keyed by batch id; uses problemId when present else stable index key.
 */

const storageKey = (batchId) =>
  batchId ? `studentSheetProgress_${batchId}` : "studentSheetProgress_demo";

export function problemProgressKey(problem, tIndex, cIndex, pIndex) {
  if (problem?.problemId) return `id:${problem.problemId}`;
  return `idx:${tIndex}-${cIndex}-${pIndex}`;
}

export function loadStudentProgress(batchId) {
  try {
    const raw = localStorage.getItem(storageKey(batchId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStudentProgress(batchId, progressMap) {
  try {
    localStorage.setItem(storageKey(batchId), JSON.stringify(progressMap));
  } catch {
    /* ignore */
  }
}

export function getProblemState(progressMap, problem, tIndex, cIndex, pIndex) {
  const key = problemProgressKey(problem, tIndex, cIndex, pIndex);
  const entry = progressMap[key];
  return {
    solved: entry?.solved ?? problem.solved ?? false,
    starred: entry?.starred ?? problem.starred ?? false,
  };
}

export function setProblemState(
  progressMap,
  problem,
  tIndex,
  cIndex,
  pIndex,
  patch
) {
  const key = problemProgressKey(problem, tIndex, cIndex, pIndex);
  const prev = progressMap[key] || {};
  return {
    ...progressMap,
    [key]: { ...prev, ...patch },
  };
}
