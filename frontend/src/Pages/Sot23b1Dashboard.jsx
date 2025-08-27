import { Trophy } from "lucide-react";

export default function Sot23b1Students() {
  const activeStudents = [
    {name : "Active", value: 70},
    {name : "Inactive", value: 30}
  ]
  const topPerformers = [
    {rank:1, name:"Deepali", solved:340, total:500}, 
    {rank:2, name:"Alice", solved:340, total:500}, 
    {rank:3, name:"Bob", solved:340, total:500}, 
  ]
  return (
    <div className="text-xl font-bold text-gray-700">
        {/* KPI */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Students</div>
            <div>124</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Teachers</div>
            <div>2</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Questions Assigned</div>
            <div>500</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Topics Covered</div>
            <div>8</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Avg. Problem Solved</div>
            <div>100</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div> Median. Problem Solved</div>
            <div>100</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div>Active Students</div>
            <div>60%</div>
        </div>
      </div>
      {/* Top Performers */}
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-black font-light text-base/10 ">
        <div className="flex items-center "><Trophy className="w-5 h-5 text-yellow-500"/>
          <h1 className="font-bold">Top Performers</h1>
        </div> 
        {topPerformers.map((performer, index) => (
          <div key={index} className="flex justify-between bg-gray-300 p-2 mb-1 rounded ">
            <div className="bg-gray-400 font-bold text-bold px-4 rounded-full ">{performer.rank}</div>
            <div>{performer.name}</div>
            <div>{performer.solved}/{performer.total} problems</div>
          </div>
        ))}
      </div>
    </div>
  );
}
