// import { Trophy, Activity } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';


// export default function Dashboard() {
//   const activeStudents = [
//     { name: "Active", value: 70 },
//     { name: "Inactive", value: 30 },
//   ];
//   const topPerformers = [
//     { rank: 1, name: "Deepali", solved: 340, total: 500 },
//     { rank: 2, name: "Alice", solved: 320, total: 500 },
//     { rank: 3, name: "Bob", solved: 300, total: 500 },
//   ];

//   const retentionData = [
//     { week: 'Week 1', active: 45, dropped: 0 },
//     { week: 'Week 2', active: 44, dropped: 1 },
//     { week: 'Week 3', active: 42, dropped: 3 },
//     { week: 'Week 4', active: 41, dropped: 4 },
//     { week: 'Week 5', active: 39, dropped: 6 },
//     { week: 'Week 6', active: 38, dropped: 7 },
//     { week: 'Week 7', active: 38, dropped: 7 },
//     { week: 'Week 8', active: 37, dropped: 8 }
//   ];

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       {/* KPI Section */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         {[
//           { label: "Students", value: "124" },
//           { label: "Teachers", value: "2" },
//           { label: "Questions Assigned", value: "500" },
//           { label: "Topics Covered", value: "8" },
//           { label: "Active Students", value: "60%" },
//         ].map((item, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition"
//           >
//             <div className="text-gray-500 text-sm font-medium tracking-tight">
//               {item.label}
//             </div>
//             <div className="text-3xl font-bold text-gray-800 mt-2">
//               {item.value}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Problem Solving Stats */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h2 className="text-lg font-bold text-gray-700 mb-4">
//           Problem Solving Stats
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center">
//             <div className="text-4xl font-bold text-blue-600">100</div>
//             <div className="font-light text-gray-600 mt-2">
//               Median Problems Solved
//             </div>
//           </div>
//           <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center">
//             <div className="text-4xl font-bold text-blue-600">100</div>
//             <div className="font-light text-gray-600 mt-2">
//               Avg. Problems Solved
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Top Performers */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
//             <h2 className="font-bold text-gray-700">Top Performers</h2>
//           </div>
//           <button className="text-blue-600 hover:underline text-sm font-medium">
//             See All
//           </button>
//         </div>
//         <div className="space-y-2">
//           {topPerformers.map((performer, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
//             >
//               <div className="bg-gray-300 text-gray-800 font-bold px-3 py-1 rounded-full text-sm">
//                 {performer.rank}
//               </div>
//               <div className="font-medium text-gray-700">{performer.name}</div>
//               <div className="text-sm text-gray-600">
//                 {performer.solved}/{performer.total} problems
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>




//       <div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <div className="flex items-center gap-2 mb-4">
//             <Activity className="w-5 h-5 text-green-500" />
//             <h3 className="text-lg font-semibold text-gray-900">Top Performers Retention / Drop-off Curve</h3>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={retentionData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="week" />
//               <YAxis />
//               <Tooltip />
//               <Area type="monotone" dataKey="active" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
//               <Area type="monotone" dataKey="dropped" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
//             </AreaChart>
//           </ResponsiveContainer>
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Active Students</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <span className="text-sm text-gray-600">Dropped Out</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Trophy, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const activeStudents = [
    { name: "Active", value: 70 },
    { name: "Inactive", value: 30 },
  ];
  const topPerformers = [
    { rank: 1, name: "Deepali", solved: 340, total: 500 },
    { rank: 2, name: "Alice", solved: 320, total: 500 },
    { rank: 3, name: "Bob", solved: 300, total: 500 },
  ];

  const retentionData = [
    { week: 'Week 1', active: 45, dropped: 0 },
    { week: 'Week 2', active: 44, dropped: 1 },
    { week: 'Week 3', active: 42, dropped: 3 },
    { week: 'Week 4', active: 41, dropped: 4 },
    { week: 'Week 5', active: 39, dropped: 6 },
    { week: 'Week 6', active: 38, dropped: 7 },
    { week: 'Week 7', active: 38, dropped: 7 },
    { week: 'Week 8', active: 37, dropped: 8 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[{ label: "Students", value: "124" }, { label: "Teachers", value: "2" }, { label: "Questions Assigned", value: "500" }, { label: "Topics Covered", value: "8" }, { label: "Active Students", value: "60%" }]
          .map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
            <div className="text-gray-500 text-sm font-medium tracking-tight">{item.label}</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Problem Solving Stats */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Problem Solving Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">100</div>
            <div className="font-light text-gray-600 mt-2">Median Problems Solved</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600">100</div>
            <div className="font-light text-gray-600 mt-2">Avg. Problems Solved</div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="font-bold text-gray-700">Top Performers</h2>
          </div>
          <button className="text-blue-600 hover:underline text-sm font-medium">See All</button>
        </div>
        <div className="space-y-2">
          {topPerformers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
              <div className="bg-gray-300 text-gray-800 font-bold px-3 py-1 rounded-full text-sm">{performer.rank}</div>
              <div className="font-medium text-gray-700">{performer.name}</div>
              <div className="text-sm text-gray-600">{performer.solved}/{performer.total} problems</div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention / Drop-off Curve */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Top Performers Retention / Drop-off Curve</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={retentionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="active" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="dropped" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Dropped Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

