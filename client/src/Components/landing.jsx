
import Timer from './timer'
import { useDispatch, useSelector } from 'react-redux';
import PlayRandomMoveEngine from './chess';
import { useState } from 'react';
function Landing() {
    const opponent=useSelector(st=>st.opponent.value)
    const user=useSelector(st=>st.user.value)
    const [g]=useState(Math.floor(Math.random()*10000).toString(16))
    return (
        <div className="flex flex-col items-center justify-center   md:w-2/4 w-full">
            <div className="w-full h-16 rounded-md" id="receiver">
                <div>
                    {/* <img src={logo}  /> */}
                    <span>{opponent}</span>
                </div>
                {/* <Timer  /> */}
            </div>
            <div className='w-full  flex justify-center '>
                <PlayRandomMoveEngine />
            </div>
            <div className="row w-full h-16 rounded-md" id='sender'>
                <div>
                    {/* <img src={logo}  /> */}
                    <span>{user}</span>
                </div>
                <Timer  />
            </div>
        </div>
    );
}
export default Landing