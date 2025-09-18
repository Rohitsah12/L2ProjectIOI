import { Outlet, useNavigate } from "react-router-dom";

export default function Table() {
    
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex gap-2">
                <button onClick={()=>navigate("mastertable")} className="rounded border-1 p-2">Master Table</button>
                <button onClick={()=>navigate("weeklyprogresstable")} className="rounded border-1 p-2">Weekly Table</button>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    )
}