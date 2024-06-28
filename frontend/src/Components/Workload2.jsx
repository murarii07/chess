import { useDispatch, useSelector } from "react-redux";
import { stateChange } from "../redux/timer/timecounter";
import { useEffect } from "react";

function Workload2() {
    const ws = useSelector(state => state.ws.value)
    const count = useSelector(state => state.time.value)
    const dispatch = useDispatch()

    const handle = (e) => {
        dispatch(stateChange(parseInt(e.target.value)))
    }
    const handleclick = async () => {
        ws.send(JSON.stringify({ 'message': "init_start" }))
        // let load = document.querySelector('.Loading');
        // load.style.display = "flex";
        let r = document.querySelector('.workload')
        r.innerText = "Status...."
    }
    useEffect(() => {
        ws.addEventListener("open", () => {
            console.log("server started..")
        });
        const eventHandle = (message) => {
            let obj = message.data; //string
            obj = JSON.parse(obj)
            alert(obj.message)
            if (obj.moved) {
                const positions = obj['moved']
                let r = document.querySelector('.workload')
                r.innerText = `${positions['from']}-${positions['to']}`
            }
        }
        ws.addEventListener("message", eventHandle)
        return () => {
        ws.removeEventListener("message", eventHandle)
    }
}, [ws])


return (
    <div className="workload">
        <button className="play" onClick={handleclick}>Play</button>
        <select value={count} onChange={handle} id="opt">
            <option value={5}>5min</option>
            <option value={10}>10min</option>
            <option value={3}>3min</option>
        </select>

    </div>
)
}

export default Workload2;