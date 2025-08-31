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
        // <div>
        //     {slides.map((value, key) => {
        //         <div index={key}>
        //             <div>
        //                 <div>
        //                     <img src="" alt="" />
        //                 </div>
        //                 <div>

        //                 </div>

        //             </div>

        //         </div>

        //     })}
        // </div>
        <section className='h-80 '>
        <div className='w-full h-full border-1 grid grid-cols-[4fr_8fr] '>
          <div className='flex items-center justify-center'>
            <h1 className='font-bold text-4xl text-center border-t border-l p-2'>Weekly Active Coders</h1>
          </div>
          <div className='flex justify-center gap-4 items-center' >

            <div className='border h-40 w-40 flex flex-col justify-between'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#3</div>
                <div className=''> deepali</div>
              </div>
            </div>

            <div className='border h-60 w-60'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#1</div>
                <div className=''> deepali</div>
              </div>
            </div>

            <div className='border h-50 w-50 flex flex-col justify-between'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#2</div>
                <div className=''> deepali</div>
              </div>
            </div>
            

          </div>
        </div>
        
      </section>
    )

}