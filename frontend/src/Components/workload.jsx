import { stateChange } from "../redux/flagSlice";
import Loading from "./loading"
import { useDispatch, useSelector } from "react-redux"
function Workload1() {
    const ws = useSelector(state=>state.ws.value)
    const nodea = useSelector(state => state.flag.value)
    const dispatch = useDispatch();
    const handleclick = (e) => {
        console.log(ws)
        let r = document.querySelector(".workload")
        r.innerText = "Status...."
        // let doc = document.querySelector(".Loading")
        // // document.body.style.opacity="0.7"
        // // doc.style.display = "flex"
        // // doc.style.opacity = "1"
        ws.send(JSON.stringify({"message":"New game"}))
        dispatch(stateChange("Stat"))
        console.log(nodea)
    }
    return (
        <>
            <div className="workload">
                <button className="play" onClick={handleclick}>New Game</button>
            </div>
        </>
    )
}
export default Workload1