import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Star } from "lucide-react";

const topics = [
  {
    title: "Step 1: Learn the basics",
    // notesLink: "#",
    total: 31,
    completed: 0,
    classes: [{
        title: "Lec 1: Sorting-I",
        notesLink: "#",
        total: 3,
        completed: 0,
        problems: [
          { name: "Selection Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Bubble Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Insertion Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
        ],
      },{
        title: "Lec 1: Sorting-II",
        notesLink: "#",
        total: 28,
        completed: 0,
        problems: [
          { name: "Selection Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Bubble Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Insertion Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
        ],
      },

    ],
  },
  {
    title: "Step 2: Learn Important Sorting Techniques",
    // notesLink: "#",
    total: 7,
    completed: 0,
    classes: [
      {
        title: "Lec 1: Sorting-I",
        notesLink: "#",
        total: 3,
        completed: 0,
        problems: [
          { name: "Selection Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Bubble Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
          { name: "Insertion Sort", difficulty: "Easy", solved: false, link: "#", starred: false },
        ],
      },
    ],
  },
];

function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : (completed / total) * 100;
  return (
    <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-green-500 transition-all"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default function ProblemList() {
  const [openTopics, setOpenTopics] = useState({});
  const [openClass, setOpenClass] = useState({});
  const [data, setData] = useState(topics);

  const toggleTopic = (index) => {
    setOpenTopics((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleClass = (tIndex, cIndex) => {
    const key = `${tIndex}-${cIndex}`;
    setOpenClass((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleProblem = (tIndex, cIndex, pIndex) => {
    const newData = [...data];
    const problem = newData[tIndex].classes[cIndex].problems[pIndex];
    problem.solved = !problem.solved;

    const completedProblems = newData[tIndex].classes[cIndex].problems.filter(
      (p) => p.solved
    ).length;
    newData[tIndex].classes[cIndex].completed = completedProblems;

    let totalCompleted = 0;
    newData[tIndex].classes.forEach((c) => (totalCompleted += c.completed));
    newData[tIndex].completed = totalCompleted;

    setData(newData);
  };

  const toggleStar = (tIndex, cIndex, pIndex) => {
    const newData = [...data];
    const problem = newData[tIndex].classes[cIndex].problems[pIndex];
    problem.starred = !problem.starred;
    setData(newData);
  };

  return (
    <div className="p-6  min-h-screen text-gray-900 mt-2">
      {/* Header Progress Section */}
      <div className="mb-6 flex justify-between py-4 px-4 mt-2 border items-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">Total Progress 0 / 455</h1>
        <div className="flex gap-6">
          <div className="flex flex-col items-center bg-white px-4 py-2 rounded-xl border shadow-sm">
            <span className="text-emerald-700 font-semibold">Easy</span>
            <span className="text-sm text-gray-700 font-medium">0 / 131</span>
          </div>
          <div className="flex flex-col items-center bg-white px-4 py-2 rounded-xl border shadow-sm">
            <span className="text-orange-700 font-semibold">Medium</span>
            <span className="text-sm text-gray-700 font-medium">0 / 187</span>
          </div>
          <div className="flex flex-col items-center bg-white px-4 py-2 rounded-xl border shadow-sm">
            <span className="text-rose-700 font-semibold">Hard</span>
            <span className="text-sm text-gray-700 font-medium">0 / 136</span>
          </div>
        </div>
      </div>

      {/* Topics Section */}
      {data.map((topic, tIndex) => (
        <Card key={tIndex} className="mb-4 bg-white text-gray-900 border shadow-sm">
          <CardContent className="">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTopic(tIndex)}
            >
              <div className="flex items-center gap-2">
                {openTopics[tIndex] ? (
                  <ChevronDown size={20} className="text-gray-700" />
                ) : (
                  <ChevronRight size={20} className="text-gray-700" />
                )}
                <h2 className="text-lg font-semibold text-gray-900">{topic.title}</h2>
                {/* {topic.notesLink && (
                  <a
                    href={topic.notesLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm ml-2 hover:underline"
                  >
                    Notes
                  </a>
                )} */}
              </div>
              <div className="flex items-center gap-3">
                <ProgressBar completed={topic.completed} total={topic.total} />
                <span className="text-gray-700 text-sm font-medium">
                  {topic.completed} / {topic.total}
                </span>
              </div>
            </div>

            {openTopics[tIndex] && (
              <div className="ml-6 mt-3 space-y-3">
                {topic.classes.map((classItem, cIndex) => (
                  <div key={cIndex}>
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleClass(tIndex, cIndex)}
                    >
                      <div className="flex items-center gap-2">
                        {openClass[`${tIndex}-${cIndex}`] ? (
                          <ChevronDown size={16} className="text-gray-700" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-700" />
                        )}
                        <h3 className="font-medium text-gray-900">{classItem.title}</h3>
                        {topic.notesLink && (
                        <a
                          href={classItem.notesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 text-sm ml-2 hover:underline"
                        >
                          Notes
                        </a>
                      )}
                      </div>
                      <div className="flex items-center gap-3">
                        <ProgressBar completed={classItem.completed} total={classItem.total} />
                        <span className="text-gray-700 text-sm font-medium">
                          {classItem.completed} / {classItem.total}
                        </span>
                      </div>
                    </div>

                    {openClass[`${tIndex}-${cIndex}`] && classItem.problems.length > 0 && (
                      <table className="w-full mt-2 text-sm border rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-gray-50 text-left text-gray-800 font-medium">
                            <th className="p-2">✔</th>
                            <th className="p-2">Problem</th>
                            <th className="p-2">Difficulty</th>
                            <th className="p-2">Link</th>
                            <th className="p-2">★</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classItem.problems.map((p, pIndex) => (
                            <tr key={pIndex} className="border-t hover:bg-gray-50">
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  checked={p.solved}
                                  onChange={() => toggleProblem(tIndex, cIndex, pIndex)}
                                />
                              </td>
                              <td className="p-2 text-gray-900">{p.name}</td>
                              <td
                                className={`p-2 font-medium ${
                                  p.difficulty === "Easy"
                                    ? "text-emerald-700"
                                    : p.difficulty === "Medium"
                                    ? "text-orange-700"
                                    : "text-rose-700"
                                }`}
                              >
                                {p.difficulty}
                              </td>
                              <td className="p-2">
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:underline"
                                >
                                  Link
                                </a>
                              </td>
                              <td className="p-2">
                                <button onClick={() => toggleStar(tIndex, cIndex, pIndex)}>
                                  <Star
                                    size={16}
                                    className={p.starred ? "text-yellow-500" : "text-gray-400"}
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
