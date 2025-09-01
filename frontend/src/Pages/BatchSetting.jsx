// // import  { useState} from "react"
// // import { Pen, Bookmark, BookmarkCheckIcon, BookmarkCheck } from "lucide-react"
// // import { PlusCircle } from "lucide-react";
// // import { useNavigate } from "react-router";


// // export default function BatchSetting() {

// //     const navigate = useNavigate();
    

// //     const [batches,setBatches] = useState([
// //         {id:1, name:"SOT23B1", year:"2023", student:"132"},
// //         {id:2, name:"SOT23B1", year:"2023", student:"132"}
// //     ]);
// //     const [newBatch, setNewBatch] =useState({name:"", year:"", student:""});


// //     const handleAddBatch= () =>{
// //         if(!newBatch.name && !newBatch.year) return;
// //         setBatches([...batches, 
// //             {   id: batches.length + 1,
// //                 name: newBatch.name,
// //                 year: newBatch.year,
// //                 student: newBatch.student
// //             }
// //         ]);
// //         setNewBatch({name:"", year:"", student:""});

// //     }
// //     return(
// //             <div className="flex flex-col bg-pink-50 mx-10 mt-15 rounded-3xl px-10 py-5 shadow-2xl">
// //                 <div className="flex  justify-around  items-center  w-full "> 
// //                     <div>
// //                         <div className="text-4xl font-extrabold text-orange-400">Batch <span className="text-black">Management</span></div>  
// //                         <div className="text-2xl font-medium text-gray-500">Create and Edit Batches</div>    

// //                     </div>
// //                     <img src="../public/images/batchSetting.png" alt=""  height={400} width={300}/>
// //                 </div>
// //                 <div className="border flex p-5 w-full  " >
// //                     <div className="border w-full flex gap-4 items-center p-5  justify-evenly ">        
// //                         <div className=" flex justify-around ">
// //                             <input type="text" value={newBatch.name} onChange={(e)=>{setNewBatch({...newBatch ,name: e.target.value})}}placeholder="Batch Name" className="border p-1 rounded mr-1"/>
// //                             <input type="text" value={newBatch.year} onChange={(e)=>{setNewBatch({...newBatch ,year: e.target.value})}}placeholder="Year" className="border p-1 rounded mr-1" />
// //                             <input type="text" value={newBatch.student} onChange={(e)=>{setNewBatch({...newBatch ,student: e.target.value})}}placeholder="Students" className="border p-1 rounded"/>
// //                         </div>
// //                         <div>
// //                             <button className="border p-1 rounded font-bold flex items-center" onClick={handleAddBatch}><PlusCircle size={18}/> 
// //                             Add Batch</button>
// //                         </div>
// //                     </div>
// //                 </div>
                
                    

// //                 <div className="flex flex-wrap gap-3  mx-2 mt-20" >
// //                     {batches.map((batch, idx)=>{
// //                         return (
// //                             <div key={batch.id} onClick={()=>navigate("/batch/sot23b1")} className="relative  bg-white border-2 border-orange-300 rounded-2xl p-4 hover:shadow-lg cursor-pointer transition opacity-0 translate-y-4 animate-fadeInUp w-3xs">
                                
// //                                     <BookmarkCheck  fill="currentColor" strokeWidth={0}  size={30} className="text-orange-500  absolute  top-0 right-6   " />
// //                                     <div>
// //                                         <div className="font-bold">{batch.name}</div>

// //                                     </div>
// //                                     <div>
// //                                         <div>Year : {batch.year}</div>
// //                                         <div>Students : {batch.student}</div>
// //                                     </div>
                                    
                                
// //                                 {/* <div className="absolute top-10 bg-pink-50 p-2 border-gray-400 rounded-full right-4 "><Pen size={15}/></div> */}
        

// //                             </div>
// //                         )
// //                     })}
// //                 </div>
// //                 <style jsx>{`
// //                     @keyframes fadeInUp{
// //                         from{
// //                             opacity: 0;
// //                             transform: translateY(20px);
// //                         }
// //                         to{
// //                             opacity : 1;
// //                             transform : translateY(0)

// //                         }
// //                     }
// //                     .animate-fadeInUp {
// //                         animation: fadeInUp 0.4s ease-out forwards
// //                     }
                     
// //                `} </style>

// //             </div>
// //     );
// // }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PlusCircle, BookmarkCheck } from "lucide-react";
// import { useNavigate } from "react-router";

// export default function BatchSetting() {
//   const navigate = useNavigate();

//   const [batches, setBatches] = useState([
//     { id: 1, name: "SOT23B1", year: "2023", student: "132" },
//     { id: 2, name: "SOT23B2", year: "2023", student: "120" }
//   ]);

//   const [newBatch, setNewBatch] = useState({ name: "", year: "", student: "" });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddBatch = (e) => {
//     e.preventDefault();
//     if (!newBatch.name && !newBatch.year) return;
//     setBatches([...batches, { id: batches.length + 1, ...newBatch }]);
//     setNewBatch({ name: "", year: "", student: "" });
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-pink-50 mx-10 my-10 rounded-3xl px-10 py-5 shadow-2xl">
//       {/* Header */}
//       <div className="flex justify-around items-center w-full">
//         <div>
//           <div className="text-4xl font-extrabold text-orange-400">
//             Batch <span className="text-black">Management</span>
//           </div>
//           <div className="text-2xl font-medium text-gray-500">
//             Create and Edit Batches
//           </div>
//         </div>
//         <img src="../public/images/batchSetting.png" alt="" height={400} width={300} />
//       </div>

//       {/* Add Batch Button */}
//       <div className="flex justify-end mt-10">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-orange-500 px-3 text-white py-1.5 rounded hover:shadow hover:text-black hover:bg-white hover:transition flex items-center gap-2"
//         >
//           <PlusCircle size={16} /> Add New Batch
//         </button>
//       </div>

//       {/* Batch Cards */}
//       <div className="flex flex-wrap gap-3 mx-2 mt-2">
//         {batches.map((batch) => (
//           <div
//             key={batch.id}
//             onClick={() => navigate("/batch/sot23b1")}
//             className="relative bg-white border-2 border-orange-300 rounded-2xl p-4 hover:shadow-lg cursor-pointer transition opacity-0 translate-y-4 animate-fadeInUp w-3xs"
//           >
//             <BookmarkCheck
//               fill="currentColor"
//               strokeWidth={0}
//               size={30}
//               className="text-orange-500 absolute top-0 right-6"
//             />
//             <div>
//               <div className="font-bold">{batch.name}</div>
//             </div>
//             <div>
//               <div>Year : {batch.year}</div>
//               <div>Students : {batch.student}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             key="overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-gradient-to-br from-gray-900/40 to-gray-600/20 flex justify-center items-center z-50"
//             onClick={() => setIsModalOpen(false)}
//           >
//             <motion.div
//               key="modal"
//               initial={{ opacity: 0, scale: 0.9, y: -20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: -20 }}
//               transition={{ duration: 0.2, ease: "easeOut" }}
//               className="bg-white p-6 rounded-xl shadow-lg w-96"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h3 className="text-lg font-semibold mb-4">Add New Batch</h3>

//               <form onSubmit={handleAddBatch}>
//                 <input
//                   type="text"
//                   placeholder="Batch Name"
//                   value={newBatch.name}
//                   onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
//                   className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-400"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Year"
//                   value={newBatch.year}
//                   onChange={(e) => setNewBatch({ ...newBatch, year: e.target.value })}
//                   className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-400"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Students"
//                   value={newBatch.student}
//                   onChange={(e) => setNewBatch({ ...newBatch, student: e.target.value })}
//                   className="w-full px-3 py-2 mb-5 rounded-lg border border-gray-400"
//                 />

//                 <div className="flex justify-end gap-1.5 px-3 py-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition flex items-center gap-2"
//                   >
//                     <PlusCircle size={16} /> Add Batch
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.4s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, BookmarkCheck } from "lucide-react";
import { useNavigate } from "react-router";

export default function BatchSetting() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([
    { id: 1, name: "SOT23B1", year: "2023", student: "132" },
    { id: 2, name: "SOT23B2", year: "2023", student: "120" }
  ]);

  const [newBatch, setNewBatch] = useState({ name: "", year: "", student: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!newBatch.name && !newBatch.year) return;
    setBatches([...batches, { id: batches.length + 1, ...newBatch }]);
    setNewBatch({ name: "", year: "", student: "" });
    setIsModalOpen(false);
  };

  // Soft professional gradients
  const gradients = [
    "from-blue-50 to-blue-100",
    "from-gray-50 to-gray-100",
    "from-teal-50 to-teal-100",
    "from-indigo-50 to-indigo-100",
    "from-slate-50 to-slate-100"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mx-10 my-10 rounded-3xl px-10 py-5 shadow-md">
      {/* Header */}
      <div className="flex justify-around items-center w-full">
        <div>
          <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
            Batch <span className="text-black">Management</span>
          </div>
          <div className="text-2xl font-medium text-gray-600">
            Create and Edit Batches
          </div>
        </div>
        <img src="../public/images/batchSetting.png" alt="" height={400} width={300} />
      </div>

      {/* Add Batch Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle size={16} /> Add New Batch
        </button>
      </div>

      {/* Batch Cards */}
      <div className="flex flex-wrap gap-5 mx-2 mt-5">
        {batches.map((batch, index) => (
          <motion.div
            key={batch.id}
            onClick={() => navigate("/batch/sot23b1")}
            whileHover={{ scale: 1.03 }}
            className={`relative bg-gradient-to-br ${gradients[index % gradients.length]} text-gray-800 border border-gray-200 rounded-2xl p-5 hover:shadow-md cursor-pointer transition opacity-0 translate-y-4 animate-fadeInUp w-3xs`}
          >
            <BookmarkCheck
              fill="currentColor"
              strokeWidth={0}
              size={26}
              className="text-blue-600 absolute top-2 right-4"
            />
            <div className="font-bold text-lg">{batch.name}</div>
            <div className="text-sm text-gray-600">Year : {batch.year}</div>
            <div className="text-sm text-gray-600">Students : {batch.student}</div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl shadow-lg w-96 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Batch</h3>

              <form onSubmit={handleAddBatch}>
                <input
                  type="text"
                  placeholder="Batch Name"
                  value={newBatch.name}
                  onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newBatch.year}
                  onChange={(e) => setNewBatch({ ...newBatch, year: e.target.value })}
                  className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Students"
                  value={newBatch.student}
                  onChange={(e) => setNewBatch({ ...newBatch, student: e.target.value })}
                  className="w-full px-3 py-2 mb-5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-end gap-2 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <PlusCircle size={16} /> Add Batch
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
