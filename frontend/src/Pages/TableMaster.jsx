


import React, { useEffect, useState, useMemo } from "react";

const DifficultyTag = ({ level }) => {
  const colors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colors[level]}`}
    >
      {level}
    </span>
  );
};

const StatusCell = ({ status }) => {
  return (
    <div
      className={`px-2 py-1 rounded text-xs font-medium text-center ${
        status === "Solved"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </div>
  );
};

export default function BatchTable() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [totals, setTotals] = useState({});

  // === Filters & Sorting States ===
  const [rollFilter, setRollFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortByTotal, setSortByTotal] = useState(false);
  const [sortByCount, setSortByCount] = useState(null); // "asc" | "desc" | null

  useEffect(() => {
    const response = {
      problems: [
        {
          className: "Class 1 : Intro to DS/Algo",
          problemName: "Number of factors",
          countProb: 99,
          link: "#",
          category: "Easy",
          platform: "GeeksForGeeks",
          solvedBy: {
            "2401010001": "Solved",
            "2401010002": "Not Solved",
            "2401010003": "Solved",
            "2401010004": "Solved",
            "2401010005": "Not Solved",
          },
        },
        {
          className: "Class 2 : Loops",
          problemName: "Sum of digits",
          countProb: 50,
          link: "#",
          category: "Easy",
          platform: "Codeforces",
          solvedBy: {
            "2401010001": "Not Solved",
            "2401010002": "Solved",
            "2401010003": "Solved",
            "2401010004": "Solved",
            "2401010005": "Not Solved",
          },
        },
        {
          className: "Class 3 : Arrays",
          problemName: "Second Largest Element in Array",
          countProb: 87,
          link: "#",
          category: "Medium",
          platform: "LeetCode",
          solvedBy: {
            "2401010001": "Solved",
            "2401010002": "Solved",
            "2401010003": "Not Solved",
            "2401010004": "Not Solved",
            "2401010005": "Solved",
          },
        },
        {
          className: "Class 6 : Dynamic Programming",
          problemName: "Knapsack Problem",
          countProb: 150,
          link: "#",
          category: "Hard",
          platform: "GeeksForGeeks",
          solvedBy: {
            "2401010001": "Solved",
            "2401010002": "Solved",
            "2401010003": "Not Solved",
            "2401010004": "Solved",
            "2401010005": "Not Solved",
          },
        },
      ],
    };

    setData(response.problems);
    setStudents(Object.keys(response.problems[0].solvedBy));

    // Calculate totals
    const totalsObj = {};
    Object.keys(response.problems[0].solvedBy).forEach((id) => {
      totalsObj[id] = response.problems.reduce(
        (sum, p) => sum + (p.solvedBy[id] === "Solved" ? 1 : 0),
        0
      );
    });
    setTotals(totalsObj);
  }, []);

  // === Apply Filters & Sorting ===
  const filteredStudents = useMemo(() => {
    let arr = students.map((id) => ({
      id,
      total: totals[id] || 0,
    }));

    if (rollFilter.trim()) {
      arr = arr.filter((s) => s.id.includes(rollFilter.trim()));
    }

    if (sortByTotal) {
      arr = [...arr].sort((a, b) => b.total - a.total);
    }

    return arr;
  }, [students, totals, rollFilter, sortByTotal]);

  const filteredProblems = useMemo(() => {
    let arr = [...data];

    if (textFilter.trim()) {
      arr = arr.filter(
        (p) =>
          p.className.toLowerCase().includes(textFilter.toLowerCase()) ||
          p.problemName.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    if (difficultyFilter !== "All") {
      arr = arr.filter((p) => p.category === difficultyFilter);
    }

    if (sortByCount === "asc") {
      arr.sort((a, b) => a.countProb - b.countProb);
    } else if (sortByCount === "desc") {
      arr.sort((a, b) => b.countProb - a.countProb);
    }

    return arr;
  }, [data, textFilter, difficultyFilter, sortByCount]);

  return (
    <div className="w-full flex justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-[95%] bg-white rounded-2xl shadow-lg overflow-hidden border">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center py-3 font-bold text-lg">
          Master Table
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 p-4 border-b bg-gray-50">
          <input
            type="text"
            placeholder="Filter by Roll..."
            value={rollFilter}
            onChange={(e) => setRollFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="text"
            placeholder="Search Class/Problem..."
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <button
            onClick={() => setSortByTotal((prev) => !prev)}
            className={`px-4 py-2 rounded-md font-semibold ${
              sortByTotal
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {sortByTotal ? "Sorted by Total ↓" : "Sort by Total"}
          </button>
          <button
            onClick={() =>
              setSortByCount((prev) =>
                prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
              )
            }
            className={`px-4 py-2 rounded-md font-semibold ${
              sortByCount
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {sortByCount === "asc"
              ? "Count ↑"
              : sortByCount === "desc"
              ? "Count ↓"
              : "Sort by Count"}
          </button>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="sticky left-0 z-30 bg-white p-3 text-left min-w-[200px] border-r">
                  Class Name
                </th>
                <th className="sticky left-[200px] z-30 bg-white p-3 text-left min-w-[250px] border-r">
                  Problem
                </th>
                <th className="sticky left-[450px] z-30 bg-white p-3 text-center min-w-[80px] border-r">
                  Count
                </th>
                <th className="sticky left-[530px] z-30 bg-white p-3 text-center min-w-[80px] border-r">
                  Link
                </th>
                <th className="p-3 text-center min-w-[100px]">Category</th>
                <th className="p-3 text-center min-w-[120px]">Platform</th>
                {filteredStudents.map((s) => (
                  <th
                    key={s.id}
                    className="p-3 text-center min-w-[120px] border-l font-semibold text-gray-700"
                  >
                    {s.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* TOTAL row */}
              <tr className="bg-emerald-50 font-semibold">
                <td className="sticky left-0 bg-emerald-50 z-20 p-3 min-w-[200px] border-r">
                  TOTAL
                </td>
                <td className="sticky left-[200px] bg-emerald-50 z-20 p-3 min-w-[250px] border-r"></td>
                <td className="sticky left-[450px] bg-emerald-50 z-20 p-3 min-w-[80px] border-r"></td>
                <td className="sticky left-[530px] bg-emerald-50 z-20 p-3 min-w-[80px] border-r"></td>
                <td className="bg-emerald-50"></td>
                <td className="bg-emerald-50"></td>
                {filteredStudents.map((s) => (
                  <td
                    key={`total-${s.id}`}
                    className="p-2 text-center min-w-[120px] text-teal-700 font-bold"
                  >
                    {s.total}
                  </td>
                ))}
              </tr>

              {/* Problem rows */}
              {filteredProblems.map((problem, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="sticky left-0 bg-white z-20 p-3 min-w-[200px] border-r">
                    {problem.className}
                  </td>
                  <td className="sticky left-[200px] bg-white z-20 p-3 min-w-[250px] border-r">
                    {problem.problemName}
                  </td>
                  <td className="sticky left-[450px] bg-white z-20 p-3 text-center min-w-[80px] border-r">
                    {problem.countProb}
                  </td>
                  <td className="sticky left-[530px] bg-white z-20 p-3 text-center min-w-[80px] border-r">
                    <a href={problem.link} className="text-blue-600 underline">
                      Link
                    </a>
                  </td>
                  <td className="p-3 text-center min-w-[100px]">
                    <DifficultyTag level={problem.category} />
                  </td>
                  <td className="p-3 text-center min-w-[120px]">
                    {problem.platform}
                  </td>
                  {filteredStudents.map((s) => (
                    <td
                      key={`${i}-${s.id}`}
                      className="p-2 text-center min-w-[120px]"
                    >
                      <StatusCell status={problem.solvedBy[s.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
