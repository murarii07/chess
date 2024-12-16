import React from 'react'
import { useSelector } from 'react-redux'

export const StatusBoard = () => {
    const statusBoard = useSelector(state=>state.statusBoard.value)
    return (
        <div  className=" w-[95%] h-[470px] m-5 rounded-xl flex flex-wrap overflow-auto bg-[#00000d] text-white  p-10 ">
            {statusBoard.map((x, index) => (<div key={index} className='w-2/4 h-12 m-0'>{x}</div>))}
        </div>
    )
}
