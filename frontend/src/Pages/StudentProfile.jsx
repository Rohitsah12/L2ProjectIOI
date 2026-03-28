import {
  Mail,
  Flame,
  Trophy,
  ExternalLink,
  CheckCircle,
  XCircle,
  Zap,
  Medal,
} from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ─── Dummy data (no backend) ─────────────────────────────────────────────────
const PROFILE = {
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@college.com",
  enrollmentId: "STU2024001",
  streak: 12,
  rank: "Guardian",
  batch: "SOT23B1",
};

const STATS = {
  easy: { solved: 84, total: 120 },
  medium: { solved: 156, total: 280 },
  hard: { solved: 42, total: 95 },
};
const acceptanceRate = 72;

const HEATMAP_VALUES = (() => {
  const out = [];
  for (let w = 0; w < 26; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date("2024-09-01");
      date.setDate(date.getDate() + w * 7 + d);
      const count = Math.random() > 0.4 ? Math.floor(Math.random() * 5) + 1 : 0;
      if (count) out.push({ date: date.toISOString().slice(0, 10), count });
    }
  }
  return out;
})();

const TOPICS = [
  { name: "Array", solved: 45, fill: "#334155" },
  { name: "DP", solved: 38, fill: "#475569" },
  { name: "Graph", solved: 32, fill: "#64748b" },
  { name: "Tree", solved: 28, fill: "#94a3b8" },
  { name: "Greedy", solved: 41, fill: "#0f766e" },
  { name: "String", solved: 36, fill: "#0ea5a2" },
];

const BADGES = [
  { label: "Weekly Top 1", tone: "slate", icon: "🏆" },
  { label: "Monthly Star", tone: "zinc", icon: "⭐" },
  { label: "7-Day Streak", tone: "stone", icon: "🔥" },
  { label: "100 Solved", tone: "teal", icon: "💯" },
  { label: "Guardian", tone: "slate", icon: "🛡️" },
];

const RECENT = [
  { title: "Two Sum", status: "Accepted", time: "2 min ago" },
  { title: "LRU Cache", status: "Accepted", time: "1 hr ago" },
  { title: "Longest Palindromic Substring", status: "Wrong Answer", time: "3 hr ago" },
  { title: "Merge Intervals", status: "Accepted", time: "Yesterday" },
  { title: "Course Schedule", status: "Accepted", time: "2 days ago" },
];

const RANKINGS = [
  { label: "Batch (Weekly)", rank: 1, total: 48 },
  { label: "Batch (Monthly)", rank: 2, total: 48 },
  { label: "College", rank: 12, total: 320 },
];

const HANDLES = [
  { name: "LeetCode", handle: "johndoe", url: "https://leetcode.com/johndoe" },
  { name: "Codeforces", handle: "john_cf", url: "https://codeforces.com/profile/john_cf" },
  { name: "GFG", handle: "john_gfg", url: "https://auth.geeksforgeeks.org/user/john_gfg" },
];

const badgeClassByTone = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  zinc: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  stone: "bg-stone-100 text-stone-700 ring-stone-200",
  teal: "bg-teal-100 text-teal-700 ring-teal-200",
};

// ─── Heatmap custom styles (GitHub-like green) ────────────────────────────────
const heatmapClassForValue = (value) => {
  if (!value || value.count === 0) return "fill-slate-200";
  if (value.count === 1) return "fill-teal-200";
  if (value.count === 2) return "fill-teal-300";
  if (value.count === 3) return "fill-teal-400";
  return "fill-teal-500";
};

export default function StudentProfile() {
  const totalSolved = STATS.easy.solved + STATS.medium.solved + STATS.hard.solved;
  const totalProblems = STATS.easy.total + STATS.medium.total + STATS.hard.total;
  const difficultyStats = [
    { key: "easy", label: "Easy", ...STATS.easy },
    { key: "medium", label: "Medium", ...STATS.medium },
    { key: "hard", label: "Hard", ...STATS.hard },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          {/* Left rail */}
          <aside className="space-y-5 xl:col-span-4">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-bold text-slate-700 ring-1 ring-slate-200">
                  {PROFILE.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="truncate text-xl font-semibold text-slate-900">{PROFILE.name}</h1>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      {PROFILE.rank}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-slate-500">@{PROFILE.username}</p>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                    <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {PROFILE.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Batch</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{PROFILE.batch}</p>
                </div>
                <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">Enrollment</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{PROFILE.enrollmentId}</p>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 ring-1 ring-teal-100">
                <Flame className="h-4 w-4" aria-hidden />
                {PROFILE.streak} day streak
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Trophy className="h-4.5 w-4.5 text-slate-600" aria-hidden />
                Badges
              </h2>
              <div className="flex flex-wrap gap-2">
                {BADGES.map((b, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 ${
                      badgeClassByTone[b.tone]
                    }`}
                  >
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Rankings</h2>
              <ul className="space-y-2">
                {RANKINGS.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <span className="text-sm text-slate-700">{r.label}</span>
                    <span className="text-sm font-semibold tabular-nums text-slate-800">
                      #{r.rank}
                      <span className="font-normal text-slate-400"> / {r.total}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Main column */}
          <main className="space-y-5 xl:col-span-8">
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total solved</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">
                  {totalSolved}
                  <span className="text-lg font-medium text-slate-400"> / {totalProblems}</span>
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Acceptance rate</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-teal-700">{acceptanceRate}%</p>
              </div>
              {difficultyStats.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                    {stat.solved}
                    <span className="text-base font-medium text-slate-400"> / {stat.total}</span>
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Zap className="h-4.5 w-4.5 text-slate-600" aria-hidden />
                Activity (last 6 months)
              </h2>
              <div className="overflow-x-auto">
                <CalendarHeatmap
                  startDate={new Date("2024-09-01")}
                  endDate={new Date("2025-03-17")}
                  values={HEATMAP_VALUES}
                  classForValue={heatmapClassForValue}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-slate-900">Solved by topic</h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={TOPICS} layout="vertical" margin={{ left: 6, right: 10 }}>
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={70}
                    tick={{ fontSize: 12, fill: "#475569" }}
                  />
                  <Tooltip cursor={{ fill: "rgba(226,232,240,0.45)" }} />
                  <Bar dataKey="solved" radius={[0, 4, 4, 0]}>
                    {TOPICS.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </section>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 text-base font-semibold text-slate-900">Recent submissions</h2>
                <ul className="divide-y divide-slate-100">
                  {RECENT.map((sub, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5 first:pt-0">
                      <span className="truncate pr-2 text-sm font-medium text-slate-800">{sub.title}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span
                          className={
                            sub.status === "Accepted"
                              ? "inline-flex items-center gap-1 text-sm font-medium text-teal-700"
                              : "inline-flex items-center gap-1 text-sm font-medium text-rose-700"
                          }
                        >
                          {sub.status === "Accepted" ? (
                            <CheckCircle className="h-4 w-4" aria-hidden />
                          ) : (
                            <XCircle className="h-4 w-4" aria-hidden />
                          )}
                          {sub.status}
                        </span>
                        <span className="w-20 text-right text-xs text-slate-400">{sub.time}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Medal className="h-4.5 w-4.5 text-slate-600" aria-hidden />
                  Coding profiles
                </h2>
                <div className="space-y-2">
                  {HANDLES.map((h) => (
                    <a
                      key={h.name}
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-white"
                    >
                      <span className="font-medium">{h.name}</span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        {h.handle}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
