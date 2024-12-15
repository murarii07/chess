import React from 'react'
import { useSelector } from 'react-redux'

export const StatusBoard = () => {
    const statusBoard = useSelector(state=>state.statusBoard.value)
    return (
        <div  className="workload" style={{ backgroundColor: "#00000d",display:"flex",justifyContent:"space-evenly"  ,width:"100%",height:"100%",color:"white"}}>
            {statusBoard.map((x, index) => (<div key={index} style={{width:"50%"}}>{x}</div>))}
        </div>
    )
}
