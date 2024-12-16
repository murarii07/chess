import { useDispatch, useSelector } from "react-redux";
import { stateChange } from "../redux/timer/timecounter";
import { useEffect, useRef, useState } from "react";
import { StatusBoard } from "./StatusBoard";
import { updateState } from "../redux/games/statusBoard";
import DialogBox from "./DialogBox";

function Workload2() {
    const ws = useSelector(state => state.ws.value)
    const count = useSelector(state => state.time.value)
    const dispatch = useDispatch()
    const divRef = useRef(null)
    const [toggle, setToggle] = useState(false)
   
    const handle = (e) => {
        console.log(e.target.value)
        dispatch(stateChange(parseInt(e.target.value)))
    }
    const handleclick = async () => {
        try {

            console.log(ws)
            ws.send(JSON.stringify({ 'message': "init_start" }))
            // let load = document.querySelector('.Loading');
            // load.style.display = "flex";
          
            divRef.current.innerText = "Status...."
            setToggle(true)
        } catch (r) {
            console.log(r)
        }
    }
    useEffect(() => {
        ws.addEventListener("open", () => {
            console.log("server started..")
        });
        const eventHandle = (message) => {
            let obj = message.data; //string
            obj = JSON.parse(obj)
            
            if (obj.moved) {
                const positions = obj['moved']
                dispatch(updateState(`${positions.from}-${positions.to}`))


            }
        }
        ws.addEventListener("message", eventHandle)
        return () => {
            ws.removeEventListener("message", eventHandle)
        }
    }, [ws])


    return (
        <>
            
            {!toggle ?
                (<>
                    <div className="workload" ref={divRef}>
                        <button className="play" onClick={handleclick}>Play</button>
                        <select value={count} onChange={handle} id="opt">
                            <option value={5}>5min</option>
                            <option value={10}>10min</option>
                            <option value={3}>3min</option>
                        </select>
                    </div>
                </>
                ) :
                <StatusBoard />
            }
        </>

    )
}

export default Workload2;