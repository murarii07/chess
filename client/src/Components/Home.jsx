import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { stateUserChange } from '../redux/games/userCredientials'

export const Home = () => {
  const dispatch=useDispatch()
    const navigate=useNavigate()
    const [g]=useState(Math.floor(Math.random()*10000).toString(16))
    
  return (
    <div className='flex gap-10 justify-center items-center'>

    <div className='min-w-[400px] min-h-[400px]'>
    <img src="a.jpg" alt="" className='w-full h-full' />
    </div>
    <div className='bg-neutral-950 min-w-[400px] min-h-[400px] rounded-lg shadow-lg shadow-black flex items-center gap-y-5 flex-col justify-center'>
    <button className="play p-2 bg-red-600 rounded-md max-h-12 w-[65%] font-extrabold text-2xl" onClick={()=>{
        navigate("/")
        dispatch(stateUserChange(g))
        window.localStorage.setItem("playerName",g)
    }} >Play as a Guest</button>
      <button className=" p-2 bg-red-600 rounded-md max-h-12 w-[65%] font-extrabold text-2xl" onClick={()=>{
        navigate("/")
    }} >Play Online</button>
    <div>Create account? <a href='/register' target='_blank' className='text-red-600'>Register</a></div>
    {/* <button className="play" >Login</button> */}
    </div> 
    </div>
  )
}
