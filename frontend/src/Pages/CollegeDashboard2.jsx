import { MdGroups2 } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'




export default  function CollegeDashboard2() {
    return(
        <div className="min-h-screen flex items-center justify-center  bg-[conic-gradient(at_top_left,_#fef3c7,_#fdba74,_#fb923c)]">
            <div className="flex gap-5">
                <span className="flex flex-col justify-center items-center border border-dotted rounded-2xl px-8 py-8 bg-white shadow-lg hover:shadow-gray-500/50 transition-transform  ">
                    <MdGroups2 className='text-6xl  '/>
                    <div className='font-extrabold'>Manage Batches</div></span>
                <span className="flex flex-col justify-center items-center border border-dotted rounded-2xl px-8 py-8 bg-white shadow-lg hover:shadow-gray-500/50 transition-transform  ">
                    <GiTeacher className='text-5xl'/>
                    <div className='font-extrabold '>Manage Teachers</div></span> 
            </div>
            
        </div>
    )

}