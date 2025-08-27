export default function Entry() {

    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <div className="flex justify-center mb-9"><img src="../logo.png"  height={100} width={200} alt="" /></div>
                <div className="text-center font-extrabold text-3xl  mb-2">Login As</div>
                <div className="flex gap-6">
                    <button className="border px-6 py-3 rounded-3xl bg-purple-300 font-bold hover:text-white hover:scale-110 transition-transform duration-300 hover:border-orange-400">College</button>
                    <button className="border px-6 py-3 rounded-3xl bg-orange-300 font-bold hover:text-white hover:scale-110 transition-transform duration-300 hover:border-orange-400">Teacher</button>
                    <button className="border px-6 py-3 rounded-3xl bg-green-300 font-bold hover:text-white hover:scale-110 transition-transform duration-300 hover:border-orange-400">Student</button>
                </div>
            </div>
            
        </div>
    )

}