

import React, { useState, useMemo } from "react";

const TableWithScroll = () => {
  const weeks = Array.from({ length: 15 }, (_, i) => `Week ${i + 1}`);
  const students = [
    "2401010001", "2401010004", "2401010005", "2401010007", "2401010008",
    "2401010011", "2401010018", "2401010020", "2401010021", "2401010022",
    "2401010023", "2401010024", "2401010026", "2401010027", "2401010029",
    "2401010030", "2401010031", "2401010032",
  ];

  const getRandomNumber = () => Math.floor(Math.random() * 100);
  const data = weeks.map(() => students.map(() => getRandomNumber()));

  const totals = students.map((_, colIndex) =>
    data.reduce((sum, row) => sum + row[colIndex], 0)
  );

  // === State for filtering and sorting ===
  const [rollFilter, setRollFilter] = useState("");
  const [weekFilter, setWeekFilter] = useState("");
  const [sortByTotal, setSortByTotal] = useState(false);

  // === Apply filtering/sorting ===
  const filteredStudents = useMemo(() => {
    let s = students.map((roll, i) => ({
      roll,
      total: totals[i],
      index: i,
    }));

    if (rollFilter.trim()) {
      s = s.filter((st) => st.roll.includes(rollFilter.trim()));
    }

    if (sortByTotal) {
      s = [...s].sort((a, b) => b.total - a.total);
    }

    return s;
  }, [students, totals, rollFilter, sortByTotal]);

  const filteredWeeks = useMemo(() => {
    if (!weekFilter.trim()) return weeks.map((w, i) => ({ week: w, index: i }));
    return weeks
      .map((w, i) => ({ week: w, index: i }))
      .filter((w) => w.week.toLowerCase().includes(weekFilter.trim().toLowerCase()));
  }, [weeks, weekFilter]);

  return (
    <div className="w-full flex justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-[95%] bg-white rounded-2xl shadow-lg overflow-hidden border">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center py-3 font-bold text-lg">
         Weekly Progress 
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 p-4 border-b bg-gray-50">
          <input
            type="text"
            placeholder="Filter by Roll..."
            value={rollFilter}
            onChange={(e) => setRollFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="text"
            placeholder="Filter by Week..."
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
          />
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
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="min-w-max w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 bg-gray-100 border border-gray-300 px-6 py-3 text-left z-20 w-44 font-semibold">
                  WEEK
                </th>
                {filteredStudents.map((s) => (
                  <th
                    key={s.roll}
                    className="border border-gray-200 px-4 py-2 text-center font-semibold text-gray-700"
                  >
                    {s.roll}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* TOTAL Row */}
              <tr className="bg-emerald-50 font-semibold">
                <td className="sticky left-0 bg-emerald-50 border border-gray-300 px-6 py-2 w-44 z-10">
                  Total
                </td>
                {filteredStudents.map((s) => (
                  <td
                    key={`total-${s.roll}`}
                    className="border border-gray-200 px-4 py-2 text-center text-teal-700 font-bold"
                  >
                    {s.total}
                  </td>
                ))}
              </tr>

              {/* Weeks */}
              {filteredWeeks.map((w, rowIndex) => (
                <tr
                  key={w.week}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="sticky left-0 bg-inherit border border-gray-300 px-6 py-2 w-44 z-10 font-medium text-gray-700">
                    {w.week}
                  </td>
                  {filteredStudents.map((s) => (
                    <td
                      key={`${w.index}-${s.roll}`}
                      className="border border-gray-200 px-4 py-2 text-center"
                    >
                      {data[w.index][s.index]}
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
};

export default TableWithScroll;
