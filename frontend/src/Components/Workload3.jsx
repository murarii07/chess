import { useState } from "react";
import { useSelector } from "react-redux";

function Workload3() {
    const ws=useSelector(state=>state.ws.value)
    const [inputValue,setInputValue]=useState("")
    const [messageArr,setMessageArr]=useState([])
    const onChangeHandle=(e)=>{
        setInputValue(e.target.value)
    }
    const messageSend=()=>{
        if(!inputValue){
            return
        }
        setMessageArr([...messageArr,inputValue])
        ws.send("message",JSON.stringify({
            message:"chat",
            text:"hello guys"
        }))
        setInputValue("")
    }
    
    return (
        <div className="chat-system">
            <div className="chat">
                {messageArr.map((x,index)=>(<div key={index}>
                    {x}
                </div>))}
            </div>
            <div className="input-chat">
            <input type="text" value={inputValue} onChange={onChangeHandle} />
            <button onClick={messageSend}>send</button>
            </div>
        </div>
    )
}
export default Workload3;