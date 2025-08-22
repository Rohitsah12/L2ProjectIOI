import { useEffect, useState } from "react";

export default function Carousel({ slides }){
    const [current, setCurrent] = useState(0);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrent((current)=>(current+1) % slides.length)
            
        },3000);
        return () => clearInterval(timer)
    },[slides.length]);

    const goPrev =()=>{
        prev = (prev - 1 + slides.length) % slides.length;
        setCurrent(prev);
    }

    const goNext = () => {
        prev = (prev + 1) % slides.length;
    }

    return(
        <div>
            {slides.map((value, index) => {
                <div index>

                </div>

            })}
        </div>
    )

}