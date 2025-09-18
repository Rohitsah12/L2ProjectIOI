

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StickyNote,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Trash2,
  Eye,
  Edit3,
  X,
} from "lucide-react";

const categoryColors = {
  Easy: "text-emerald-700 font-medium",
  Medium: "text-orange-700 font-medium",
  Hard: "text-rose-700 font-medium",
};

const ScheduleCards = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([
    {
      topic: "Algorithms Basics",
      classes: [
        {
          date: "2024-10-07",
          className: "Class 1 : Intro to Algorithms and Optimisations",
          contentCovered: [
            "DS / Algo Intro with Dijkstras",
            "Factors count",
            "Rotate arr[] by k times and optimisation",
          ],
          problems: [
            {
              name: "Number of factors",
              link: "https://www.geeksforgeeks.org/",
              category: "Easy",
              platform: "Geeks for Geeks",
              hidden: false,
            },
            {
              name: "Rotate Array",
              link: "https://leetcode.com/",
              category: "Medium",
              platform: "LeetCode",
              hidden: false,
            },
          ],
          notes: [{ name: "Class1 Notes", link: "https://example.com/class1" }],
        },
      ],
    },
  ]);

  const [openTopics, setOpenTopics] = useState([]);
  const [newTopicMode, setNewTopicMode] = useState(false);
  const [addClassMode, setAddClassMode] = useState(null);
  const [editClassMode, setEditClassMode] = useState(null); // [topicIndex, classIndex]

  const [newTopic, setNewTopic] = useState({ topic: "", classes: [] });
  const [newClass, setNewClass] = useState({
    date: "",
    className: "",
    contentCovered: [""],
    problems: [
      { name: "", link: "", category: "", platform: "", hidden: false },
    ],
    notes: [{ name: "", link: "" }],
  });

  // Topic Toggle
  const toggleTopic = (tIdx) => {
    setOpenTopics((prev) =>
      prev.includes(tIdx) ? prev.filter((i) => i !== tIdx) : [...prev, tIdx]
    );
  };

  const expandAll = () => {
    setOpenTopics(
      openTopics.length === topics.length ? [] : topics.map((_, i) => i)
    );
  };

  // Toggle problem visibility
  const toggleProblemVisibility = (tIdx, clsIdx, pIdx) => {
    const updated = [...topics];
    updated[tIdx].classes[clsIdx].problems[pIdx].hidden =
      !updated[tIdx].classes[clsIdx].problems[pIdx].hidden;
    setTopics(updated);
  };

  // Add Topic
  const addNewTopic = () => {
    if (newTopic.topic.trim() !== "") {
      setTopics([...topics, { ...newTopic, classes: [] }]);
      resetNewTopic();
    }
  };

  const resetNewTopic = () => {
    setNewTopic({ topic: "", classes: [] });
    setNewTopicMode(false);
  };

  // Add Class
  const addClassToTopic = (tIdx) => {
    setAddClassMode(tIdx);
    if (!openTopics.includes(tIdx)) {
      setOpenTopics([...openTopics, tIdx]);
    }
  };

  const saveNewClass = () => {
    if (addClassMode !== null) {
      const updated = [...topics];
      updated[addClassMode].classes.push({ ...newClass });
      setTopics(updated);
      resetNewClass();
    }
  };

  const resetNewClass = () => {
    setNewClass({
      date: "",
      className: "",
      contentCovered: [""],
      problems: [
        { name: "", link: "", category: "", platform: "", hidden: false },
      ],
      notes: [{ name: "", link: "" }],
    });
    setAddClassMode(null);
  };

  // Edit Class
  const startEditingClass = (tIdx, clsIdx) => {
    const cls = topics[tIdx].classes[clsIdx];
    setEditClassMode([tIdx, clsIdx]);
    setNewClass({...cls});
  };

  const saveEditedClass = () => {
    if (editClassMode) {
      const [tIdx, clsIdx] = editClassMode;
      const updated = [...topics];
      updated[tIdx].classes[clsIdx] = { ...newClass };
      setTopics(updated);
      cancelEditing();
    }
  };

  const cancelEditing = () => {
    setEditClassMode(null);
    setNewClass({
      date: "",
      className: "",
      contentCovered: [""],
      problems: [
        { name: "", link: "", category: "", platform: "", hidden: false },
      ],
      notes: [{ name: "", link: "" }],
    });
  };

  // Delete Note from class
  const deleteNote = (tIdx, clsIdx, noteIdx) => {
    const updated = [...topics];
    updated[tIdx].classes[clsIdx].notes.splice(noteIdx, 1);
    setTopics(updated);
  };

  // Delete Problem from class
  const deleteProblem = (tIdx, clsIdx, problemIdx) => {
    const updated = [...topics];
    updated[tIdx].classes[clsIdx].problems.splice(problemIdx, 1);
    setTopics(updated);
  };

  return (
    <div className="p-2 min-h-screen mt-2">

      <div className="flex justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Content
          </h1>
        </div>
        <div className="flex gap-1"> 
          <button
            onClick={expandAll}
            className="px-5 py-2 bg-yellow-200 text-black rounded shadow hover:bg-yellow-300 transition"
          >
            {openTopics.length === topics.length ? "Collapse All" : "Expand All"}
          </button>
          <button
            onClick={() => setNewTopicMode(true)}
            className="px-5 py-2 bg-yellow-200 text-black rounded shadow hover:bg-yellow-300 transition flex items-center gap-2"
          >
            <Plus size={16} /> Add Topic
          </button>
        </div>
      </div>

      {/* New Topic Form */}
      {newTopicMode && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">New Topic</h2>
          <input
            type="text"
            placeholder="Topic Name"
            className="w-full p-2 border rounded mb-4"
            value={newTopic.topic}
            onChange={(e) => setNewTopic({ ...newTopic, topic: e.target.value })}
          />

          <div className="flex gap-2">
            <button
              onClick={addNewTopic}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center gap-2"
            >
              <Save size={16} /> Save Topic
            </button>
            <button
              onClick={resetNewTopic}
              className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Topics */}
      <div className="space-y-6">
        {topics.map((topic, tIdx) => (
          <div
            key={tIdx}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            {/* Topic Header */}
            <button
              onClick={() => toggleTopic(tIdx)}
              className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 text-gray-800 font-semibold text-lg hover:bg-gray-200 transition"
            >
              {topic.topic}
              {openTopics.includes(tIdx) ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Classes */}
            {openTopics.includes(tIdx) && (
              <div className="p-6 space-y-6">
                {topic.classes.map((cls, clsIdx) => {
                  const isEditing = editClassMode && editClassMode[0] === tIdx && editClassMode[1] === clsIdx;
                  
                  return (
                    <div
                      key={clsIdx}
                      className="bg-white border shadow-sm rounded-lg p-6 flex flex-col md:flex-row items-start md:items-stretch hover:shadow-md transition relative"
                    >
                      {/* Edit Button */}
                      {!isEditing && (
                        <button
                          onClick={() => startEditingClass(tIdx, clsIdx)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-blue-600"
                        >
                          <Edit3 size={18} />
                        </button>
                      )}

                      {isEditing ? (
                        // Edit Mode
                        <div className="w-full">
                          <h3 className="text-lg font-semibold mb-4">Edit Class</h3>

                          <div className="space-y-3">
                            <input
                              type="date"
                              className="p-2 border rounded w-full"
                              value={newClass.date}
                              onChange={(e) =>
                                setNewClass({ ...newClass, date: e.target.value })
                              }
                            />

                            <input
                              type="text"
                              placeholder="Class Name"
                              className="p-2 border rounded w-full"
                              value={newClass.className || cls.className}
                              onChange={(e) =>
                                setNewClass({ ...newClass, className: e.target.value })
                              }
                            />

                            <textarea
                              placeholder="Content Covered (comma separated)"
                              className="p-2 border rounded w-full"
                              value={newClass.contentCovered.join(", ") || cls.contentCovered.join(", ")}
                              onChange={(e) =>
                                setNewClass({
                                  ...newClass,
                                  contentCovered: e.target.value
                                    .split(",")
                                    .map((item) => item.trim()),
                                })
                              }
                            ></textarea>

                            {/* Notes */}
                            <h4 className="font-medium text-gray-700">Notes</h4>
                            {cls.notes.map((note, nIdx) => (
                              <div key={nIdx} className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  placeholder="Note Name"
                                  className="p-2 border rounded w-1/2"
                                  value={note.name}
                                  onChange={(e) => {
                                    const updatedNotes = [...cls.notes];
                                    updatedNotes[nIdx].name = e.target.value;
                                    setNewClass({ ...newClass, notes: updatedNotes });
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Link"
                                  className="p-2 border rounded w-1/2"
                                  value={note.link}
                                  onChange={(e) => {
                                    const updatedNotes = [...cls.notes];
                                    updatedNotes[nIdx].link = e.target.value;
                                    setNewClass({ ...newClass, notes: updatedNotes });
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => deleteNote(tIdx, clsIdx, nIdx)}
                                  className="text-red-500"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                setNewClass({
                                  ...newClass,
                                  notes: [...cls.notes, { name: "", link: "" }],
                                })
                              }
                              className="text-indigo-600 text-sm"
                            >
                              + Add Note
                            </button>

                            {/* Problems */}
                            <h4 className="font-medium text-gray-700">Problems</h4>
                            {cls.problems.map((prob, pIdx) => (
                              <div key={pIdx} className="flex gap-2 mb-2 items-center">
                                <input
                                  type="text"
                                  placeholder="Problem Name"
                                  className="p-2 border rounded w-1/5"
                                  value={prob.name}
                                  onChange={(e) => {
                                    const updatedProblems = [...cls.problems];
                                    updatedProblems[pIdx].name = e.target.value;
                                    setNewClass({
                                      ...newClass,
                                      problems: updatedProblems,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Link"
                                  className="p-2 border rounded w-1/5"
                                  value={prob.link}
                                  onChange={(e) => {
                                    const updatedProblems = [...cls.problems];
                                    updatedProblems[pIdx].link = e.target.value;
                                    setNewClass({
                                      ...newClass,
                                      problems: updatedProblems,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Category"
                                  className="p-2 border rounded w-1/5"
                                  value={prob.category}
                                  onChange={(e) => {
                                    const updatedProblems = [...cls.problems];
                                    updatedProblems[pIdx].category = e.target.value;
                                    setNewClass({
                                      ...newClass,
                                      problems: updatedProblems,
                                    });
                                  }}
                                />
                                <input
                                  type="text"
                                  placeholder="Platform"
                                  className="p-2 border rounded w-1/5"
                                  value={prob.platform}
                                  onChange={(e) => {
                                    const updatedProblems = [...cls.problems];
                                    updatedProblems[pIdx].platform = e.target.value;
                                    setNewClass({
                                      ...newClass,
                                      problems: updatedProblems,
                                    });
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => deleteProblem(tIdx, clsIdx, pIdx)}
                                  className="text-red-500"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                setNewClass({
                                  ...newClass,
                                  problems: [
                                    ...cls.problems,
                                    {
                                      name: "",
                                      link: "",
                                      category: "",
                                      platform: "",
                                      hidden: false,
                                    },
                                  ],
                                })
                              }
                              className="text-indigo-600 text-sm"
                            >
                              + Add Problem
                            </button>
                            <button 
                              type="button"
                              className="text-blue-600 text-sm ml-1"
                              onClick={()=>navigate('/teacher/problems')}>
                              + Add Existing Problem
                            </button>
                            
                          </div>

                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={saveEditedClass}
                              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center gap-2"
                            >
                              <Save size={16} /> Save Changes
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 flex items-center gap-2"
                            >
                              <X size={16} /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          {/* Left side */}
                          <div className="md:w-1/3 pr-4 border-b md:border-b-0 md:border-r mb-4 md:mb-0">
                            <div className="text-gray-600 text-sm mb-1">
                              {cls.date}
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                              {cls.className}
                            </h2>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                              Content Covered:
                            </h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {cls.contentCovered.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Right side */}
                          <div className="md:w-2/3 pl-0 md:pl-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                              Problems:
                            </h3>
                            <div className="space-y-2">
                              {cls.problems.map((prob, pIdx) => (
                                <div
                                  key={pIdx}
                                  className={`flex items-center justify-between border rounded-md p-3 bg-white hover:bg-gray-50 transition ${
                                    prob.hidden ? "opacity-40" : ""
                                  }`}
                                >
                                  <span className="text-gray-900">{prob.name}</span>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span
                                      className={
                                        categoryColors[prob.category] || "text-gray-700"
                                      }
                                    >
                                      {prob.category}
                                    </span>
                                    <span className="text-gray-600">
                                      {prob.platform}
                                    </span>
                                    <a
                                      href={prob.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-indigo-600 hover:underline"
                                    >
                                      Link
                                    </a>
                                    <button
                                      onClick={() =>
                                        toggleProblemVisibility(tIdx, clsIdx, pIdx)
                                      }
                                      className="text-gray-500 hover:text-gray-700"
                                    >
                                      <Eye size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Notes */}
                            {cls.notes.length > 0 && (
                              <div className="flex gap-2 mt-4 text-sm text-indigo-600 font-medium">
                                <StickyNote size={16} />
                                <div className="flex gap-2 flex-wrap">
                                  {cls.notes.map((note, nIdx) => (
                                    <a
                                      key={nIdx}
                                      href={note.link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="hover:underline"
                                    >
                                      {note.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Add Class Form */}
                {addClassMode === tIdx && (
                  <div className="bg-gray-50 border rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-4">Add New Class</h3>

                    <div className="space-y-3">
                      <input
                        type="date"
                        className="p-2 border rounded w-full"
                        value={newClass.date}
                        onChange={(e) =>
                          setNewClass({ ...newClass, date: e.target.value })
                        }
                      />

                      <input
                        type="text"
                        placeholder="Class Name"
                        className="p-2 border rounded w-full"
                        value={newClass.className}
                        onChange={(e) =>
                          setNewClass({ ...newClass, className: e.target.value })
                        }
                      />

                      <textarea
                        placeholder="Content Covered (comma separated)"
                        className="p-2 border rounded w-full"
                        value={newClass.contentCovered.join(", ")}
                        onChange={(e) =>
                          setNewClass({
                            ...newClass,
                            contentCovered: e.target.value
                              .split(",")
                              .map((item) => item.trim()),
                          })
                        }
                      ></textarea>

                      {/* Notes */}
                      <h4 className="font-medium text-gray-700">Notes</h4>
                      {newClass.notes.map((note, nIdx) => (
                        <div key={nIdx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Note Name"
                            className="p-2 border rounded w-1/2"
                            value={note.name}
                            onChange={(e) => {
                              const updatedNotes = [...newClass.notes];
                              updatedNotes[nIdx].name = e.target.value;
                              setNewClass({ ...newClass, notes: updatedNotes });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Link"
                            className="p-2 border rounded w-1/2"
                            value={note.link}
                            onChange={(e) => {
                              const updatedNotes = [...newClass.notes];
                              updatedNotes[nIdx].link = e.target.value;
                              setNewClass({ ...newClass, notes: updatedNotes });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setNewClass({
                                ...newClass,
                                notes: newClass.notes.filter(
                                  (_, idx) => idx !== nIdx
                                ),
                              })
                            }
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setNewClass({
                            ...newClass,
                            notes: [...newClass.notes, { name: "", link: "" }],
                          })
                        }
                        className="text-indigo-600 text-sm"
                      >
                        + Add Note
                      </button>

                      {/* Problems */}
                      <h4 className="font-medium text-gray-700">Problems</h4>
                      {newClass.problems.map((prob, pIdx) => (
                        <div key={pIdx} className="flex gap-2 mb-2 items-center">
                          <input
                            type="text"
                            placeholder="Problem Name"
                            className="p-2 border rounded w-1/5"
                            value={prob.name}
                            onChange={(e) => {
                              const updatedProblems = [...newClass.problems];
                              updatedProblems[pIdx].name = e.target.value;
                              setNewClass({
                                ...newClass,
                                problems: updatedProblems,
                              });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Link"
                            className="p-2 border rounded w-1/5"
                            value={prob.link}
                            onChange={(e) => {
                              const updatedProblems = [...newClass.problems];
                              updatedProblems[pIdx].link = e.target.value;
                              setNewClass({
                                ...newClass,
                                problems: updatedProblems,
                              });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            className="p-2 border rounded w-1/5"
                            value={prob.category}
                            onChange={(e) => {
                              const updatedProblems = [...newClass.problems];
                              updatedProblems[pIdx].category = e.target.value;
                              setNewClass({
                                ...newClass,
                                problems: updatedProblems,
                              });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Platform"
                            className="p-2 border rounded w-1/5"
                            value={prob.platform}
                            onChange={(e) => {
                              const updatedProblems = [...newClass.problems];
                              updatedProblems[pIdx].platform = e.target.value;
                              setNewClass({
                                ...newClass,
                                problems: updatedProblems,
                              });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setNewClass({
                                ...newClass,
                                problems: newClass.problems.filter(
                                  (_, idx) => idx !== pIdx
                                ),
                              })
                            }
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setNewClass({
                            ...newClass,
                            problems: [
                              ...newClass.problems,
                              {
                                name: "",
                                link: "",
                                category: "",
                                platform: "",
                                hidden: false,
                              },
                            ],
                          })
                        }
                        className="text-indigo-600 text-sm"
                      >
                        + Add Problem
                      </button>
                      <button 
                        type="button"
                        className="text-blue-600 text-sm ml-1"
                        onClick={()=>navigate('/teacher/problems')}>
                        + Add Existing Problem
                      </button>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={saveNewClass}
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Save size={16} /> Save Class
                      </button>
                      <button
                        onClick={resetNewClass}
                        className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Button to add new class */}
                <button
                  onClick={() => addClassToTopic(tIdx)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition flex items-center gap-2"
                >
                  <Plus size={16} /> Add Class
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCards;