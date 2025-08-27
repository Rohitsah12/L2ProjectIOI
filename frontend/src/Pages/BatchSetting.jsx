import  { useState} from "react"
import { Pen, Bookmark, BookmarkCheckIcon, BookmarkCheck } from "lucide-react"
import { PlusCircle } from "lucide-react";


export default function BatchSetting() {

    

    const [batches,setBatches] = useState([
        {id:1, name:"SOT23B1", year:"2023", student:"132"},
        {id:2, name:"SOT23B1", year:"2023", student:"132"}
    ]);
    const [newBatch, setNewBatch] =useState({name:"", year:"", student:""});


    const handleAddBatch= () =>{
        if(!newBatch.name && !newBatch.year) return;
        setBatches([...batches, 
            {   id: batches.length + 1,
                name: newBatch.name,
                year: newBatch.year,
                student: newBatch.student
            }
        ]);
        setNewBatch({name:"", year:"", student:""});

    }
    return(
            <div className="flex flex-col bg-pink-50 mx-10 mt-15 rounded-3xl px-10 py-5 shadow-2xl">
                <div className="flex  justify-around  items-center n w-full "> 
                    <div>
                        <div className="text-4xl font-extrabold text-orange-400">Batch <span className="text-black">Management</span></div>  
                        <div className="text-2xl font-medium text-gray-500">Create and Edit Batches</div>    

                    </div>
                    <img src="../public/images/batchSetting.png" alt=""  height={400} width={300}/>
                </div>
                <div className="border flex p-5 w-full  " >
                    <div className="border w-full flex gap-4 items-center p-5  justify-evenly ">        
                        <div className=" flex justify-around ">
                            <input type="text" value={newBatch.name} onChange={(e)=>{setNewBatch({...newBatch ,name: e.target.value})}}placeholder="Batch Name" className="border p-1 rounded mr-1"/>
                            <input type="text" value={newBatch.year} onChange={(e)=>{setNewBatch({...newBatch ,year: e.target.value})}}placeholder="Year" className="border p-1 rounded mr-1" />
                            <input type="text" value={newBatch.student} onChange={(e)=>{setNewBatch({...newBatch ,student: e.target.value})}}placeholder="Students" className="border p-1 rounded"/>
                        </div>
                        <div>
                            <button className="border p-1 rounded font-bold flex items-center" onClick={handleAddBatch}><PlusCircle size={18}/> 
                            Add Batch</button>
                        </div>
                    </div>
                </div>
                
                    

                <div className="flex flex-wrap gap-3  mx-2 mt-20" >
                    {batches.map((batch, idx)=>{
                        return (
                            <div key={batch.id} className="relative  bg-white border-2 border-orange-300 rounded-2xl p-4 hover:shadow-lg cursor-pointer transition opacity-0 translate-y-4 animate-fadeInUp w-3xs">
                                
                                    <BookmarkCheck  fill="currentColor" strokeWidth={0}  size={30} className="text-orange-500  absolute  top-0 right-6   " />
                                    <div>
                                        <div className="font-bold">{batch.name}</div>

                                    </div>
                                    <div>
                                        <div>Year : {batch.year}</div>
                                        <div>Students : {batch.student}</div>
                                    </div>
                                    
                                
                                {/* <div className="absolute top-10 bg-pink-50 p-2 border-gray-400 rounded-full right-4 "><Pen size={15}/></div> */}
        

                            </div>
                        )
                    })}
                </div>
                <style jsx>{`
                    @keyframes fadeInUp{
                        from{
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to{
                            opacity : 1;
                            transform : translateY(0)

                        }
                    }
                    .animate-fadeInUp {
                        animation: fadeInUp 0.4s ease-out forwards
                    }
                     
               `} </style>

            </div>
    );
}