import { stateChange } from "../redux/flagSlice";
import Loading from "./loading"
import { useDispatch, useSelector } from "react-redux"

function Workload1() {
    const nodea = useSelector(state => state.flag.value)
    const dispatch = useDispatch();
    const handleclick = (e) => {
        let r = document.querySelector(".workload")
        r.innerText = "Status...."
        let doc = document.querySelector(".Loading")
        // document.body.style.opacity="0.7"
        doc.style.display = "flex"
        doc.style.opacity = "1"
        dispatch(stateChange("Stat"))
        console.log(nodea)
    }
    return (
        <>
            <div className="workload">
                <button className="play" onClick={handleclick}>New Game</button>
            </div>
            <Loading />
        </>
    )
}
export default Workload1