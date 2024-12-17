
import Timer from './timer'
import { useDispatch, useSelector } from 'react-redux';
import PlayRandomMoveEngine from './chess';
import { useState } from 'react';
function Landing() {
    const opponent = useSelector(st => st.opponent.value)
    const user = useSelector(st => st.user.value)
    return (
        <div className='flex flex-col items-center justify-center   md:w-2/4 w-full gap-y-3'>

            <div className="w-full h-16 rounded-md flex  ml-3 mr-3 box-border justify-between shadow-md bg-neutral-950">
                <div className='flex w-3/5 gap-x-1 h-full   ml-2 box-border justofy-center items-center '>
                <div className='w-[70%] h-[70%]'><img src="w.jpg" alt="alt"  className='w-1/4 h-full'/></div>
                    {/* <img src={logo}  /> */}
                    <div className='w-2/4 flex justify-center items-center'>{opponent}</div>
                </div>
                <div className=' w-1/5 flex items-center justify-center'>

                <Timer />
                </div>
                </div>
                <div className='w-full  flex justify-center ml-10 '>
               <PlayRandomMoveEngine />
             </div>
            <div className="w-full h-16 rounded-md flex  ml-3 mr-3 box-border justify-between shadow-md bg-neutral-950">
                <div className='flex w-3/5 gap-x-1 h-full   ml-2 box-border justofy-center items-center '>
                <div className='w-[70%] h-[70%]'><img src="w.jpg" alt="alt"  className='w-1/4 h-full'/></div>
                    <div className='w-2/4 flex justify-center items-center'>{user || window.localStorage.getItem("playerName")}</div>
                </div>
                <div className=' w-1/5 flex items-center justify-center'>

                <Timer />
                </div>
                </div>
            </div>
            );
}
            export default Landing