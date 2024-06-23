import { useDispatch, useSelector } from "react-redux";
import { stateChange } from "../redux/timer/timecounter";

function Workload2() {
    const ws = useSelector(state => state.ws.value)
    ws.addEventListener("open", () => {
        console.log("server started..")
    });
    const count = useSelector(state => state.time.value)
    const dispatch = useDispatch()

    const handle = (e) => {
        dispatch(stateChange(parseInt(e.target.value)))
    }
    const handleclick = async (e) => {
        ws.addEventListener("message", (message,) => {
            let obj = message.data; //string
            obj = JSON.parse(obj)
            console.log(obj)
            alert(obj.message)
        });
        ws.send(JSON.stringify({ 'message': "init_start" }))
        let r = document.querySelector('.workload')
        r.innerText = "Status...."
    }
    return (
        <div className="workload">
            <button className="play" onClick={handleclick}>play</button>
            <select value={count} onChange={handle} id="opt">
                <option value={5}>5min</option>
                <option value={10}>10min</option>
                <option value={3}>3min</option>
            </select>

        </div>
    )
}

export default Workload2;