import { User, Mail, Flame, Trophy, ExternalLink, CheckCircle, XCircle, Zap } from "lucide-react";
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
  easy: { solved: 84, total: 120, color: "#22c55e" },
  medium: { solved: 156, total: 280, color: "#f59e0b" },
  hard: { solved: 42, total: 95, color: "#ef4444" },
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
  { name: "Array", solved: 45, fill: "#3b82f6" },
  { name: "DP", solved: 38, fill: "#8b5cf6" },
  { name: "Graph", solved: 32, fill: "#ec4899" },
  { name: "Tree", solved: 28, fill: "#14b8a6" },
  { name: "Greedy", solved: 41, fill: "#f59e0b" },
  { name: "String", solved: 36, fill: "#22c55e" },
];

const BADGES = [
  { label: "Weekly Top 1", color: "bg-amber-400 text-amber-950", icon: "🏆" },
  { label: "Monthly Star", color: "bg-rose-400 text-rose-950", icon: "⭐" },
  { label: "7-Day Streak", color: "bg-orange-400 text-orange-950", icon: "🔥" },
  { label: "100 Solved", color: "bg-emerald-400 text-emerald-950", icon: "💯" },
  { label: "Guardian", color: "bg-violet-400 text-violet-950", icon: "🛡️" },
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
  { name: "LeetCode", handle: "johndoe", url: "https://leetcode.com/johndoe", color: "bg-amber-500 hover:bg-amber-600" },
  { name: "Codeforces", handle: "john_cf", url: "https://codeforces.com/profile/john_cf", color: "bg-red-500 hover:bg-red-600" },
  { name: "GFG", handle: "john_gfg", url: "https://auth.geeksforgeeks.org/user/john_gfg", color: "bg-green-600 hover:bg-green-700" },
];

// ─── Heatmap custom styles (GitHub-like green) ────────────────────────────────
const heatmapClassForValue = (value) => {
  if (!value || value.count === 0) return "fill-slate-200 dark:fill-slate-700";
  if (value.count === 1) return "fill-emerald-300";
  if (value.count === 2) return "fill-emerald-400";
  if (value.count === 3) return "fill-emerald-500";
  return "fill-emerald-600";
};

export default function StudentProfile() {
  const totalSolved = STATS.easy.solved + STATS.medium.solved + STATS.hard.solved;
  const totalProblems = STATS.easy.total + STATS.medium.total + STATS.hard.total;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ─── Header (profile card) ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-rose-500 text-white shadow-xl">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur border-4 border-white/40 flex items-center justify-center shrink-0 shadow-lg">
              <User className="w-14 h-14" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold truncate">{PROFILE.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-sm font-semibold">
                  {PROFILE.rank}
                </span>
              </div>
              <p className="text-white/90 text-sm sm:text-base truncate">@{PROFILE.username}</p>
              <p className="text-white/80 text-sm mt-0.5 flex items-center gap-1">
                <Mail className="w-4 h-4" /> {PROFILE.email}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {PROFILE.streak > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-sm font-medium">
                    <Flame className="w-4 h-4 text-amber-300" /> {PROFILE.streak} day streak
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/20 text-sm">
                  {PROFILE.batch} · {PROFILE.enrollmentId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 -mt-2 relative z-10">
        {/* ─── Stats strip (Easy / Medium / Hard) ───────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {[
            { label: "Easy", ...STATS.easy },
            { label: "Medium", ...STATS.medium },
            { label: "Hard", ...STATS.hard },
          ].map(({ label, solved, total, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 sm:p-5 shadow-lg border border-white/80 bg-white"
              style={{ borderTopWidth: 4, borderTopColor: color }}
            >
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                {solved}
                <span className="text-slate-400 font-normal text-lg"> / {total}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ─── Left column (2/3): Heatmap + Chart + Recent ────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Solved overview + acceptance */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Total solved</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalSolved}
                    <span className="text-slate-400 font-normal text-lg"> / {totalProblems}</span>
                  </p>
                </div>
                <div className="h-12 w-px bg-slate-200 hidden sm:block" />
                <div>
                  <p className="text-slate-500 text-sm font-medium">Acceptance rate</p>
                  <p className="text-3xl font-bold text-emerald-600">{acceptanceRate}%</p>
                </div>
              </div>
            </div>

            {/* Activity heatmap */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Activity
              </h2>
              <div className="overflow-x-auto">
                <CalendarHeatmap
                  startDate={new Date("2024-09-01")}
                  endDate={new Date("2025-03-17")}
                  values={HEATMAP_VALUES}
                  classForValue={heatmapClassForValue}
                />
              </div>
              <p className="text-slate-500 text-xs mt-2">Submissions in the last 6 months</p>
            </div>

            {/* Solved by topic (bar chart) */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Solved by topic</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={TOPICS} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" fontSize={12} />
                  <YAxis type="category" dataKey="name" width={64} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="solved" radius={[0, 4, 4, 0]}>
                    {TOPICS.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent submissions */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Recent submissions</h2>
              <ul className="divide-y divide-slate-100">
                {RECENT.map((sub, i) => (
                  <li key={i} className="flex items-center justify-between py-3 first:pt-0">
                    <span className="font-medium text-slate-800 truncate pr-2">{sub.title}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span
                        className={
                          sub.status === "Accepted"
                            ? "text-emerald-600 font-semibold text-sm flex items-center gap-1"
                            : "text-rose-600 font-semibold text-sm flex items-center gap-1"
                        }
                      >
                        {sub.status === "Accepted" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {sub.status}
                      </span>
                      <span className="text-slate-400 text-sm w-20 text-right">{sub.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ─── Right sidebar: Badges, Rankings, Handles ────────────────────── */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Badges
              </h2>
              <div className="flex flex-wrap gap-2">
                {BADGES.map((b, i) => (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold ${b.color}`}
                  >
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Rankings */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Rankings</h2>
              <ul className="space-y-2">
                {RANKINGS.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="text-slate-700 font-medium text-sm">{r.label}</span>
                    <span className="font-bold text-violet-600">
                      #{r.rank}
                      <span className="text-slate-400 font-normal text-xs"> / {r.total}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coding profiles */}
            <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" /> Coding profiles
              </h2>
              <div className="flex flex-col gap-2">
                {HANDLES.map((h) => (
                  <a
                    key={h.name}
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${h.color} text-white rounded-xl px-4 py-3 font-semibold text-sm text-center transition flex items-center justify-center gap-2`}
                  >
                    {h.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
