import { useRef, useState } from "react";
import { stateChange } from "../redux/flagSlice";
import { useDispatch, useSelector } from "react-redux"
import DialogBox from "./DialogBox";
import { wsInstance } from "./wsclass";
import Loading from "./loading";
function Workload1() {
    const count = useSelector(state => state.time.value)
    const [popUp,setPopUp]=useState({flag:false,message:"oops"})
    const dispatch = useDispatch();
    const divRef = useRef(null)
    const handle = (e) => {
            console.log(e.target.value)
            dispatch(stateChange(parseInt(e.target.value)))
        }

        const handleclickk =() => {
            try {
                wsInstance.messageSend({ 'message': "init_start",});
                setPopUp({flag:true,message:"searching your opponent"})
            } catch (r) {
                console.log(r)
            }
        }
    return (
        <>
             <div className="workload"  ref={divRef} >
                        <button className="play" onClick={handleclickk}>Play</button>
                        <select value={count} onChange={handle} id="opt">
                            <option value={5}>5min</option>
                            <option value={10}>10min</option>
                            <option value={3}>3min</option>
                        </select>
                    </div>
            <DialogBox popUp={popUp} setPopUp={setPopUp} loading={<Loading />} />
        </>
    )
}
export default Workload1