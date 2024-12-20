import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import DialogBox from "./DialogBox";
import { wsInstance } from "./wsclass";
import { stateFlagChange } from "../redux/games/flag.js";
import {  stateColorChange, stateGameIdChange, stateOpponentChange } from "../redux/games/gameCredientials.js";

import { stateTimeChange } from "../redux/timer/timecounter.js";
function Workload1() {
    const audioRef=useRef(null)
    const count = useSelector(state => state.time.value)
    const [popUp, setPopUp] = useState({ flag: false, message: "oops", loading: false })
    const gameFlag = useSelector(state => state.f.value)
    const dispatch = useDispatch();
    const divRef = useRef(null)
    const handle = (e) => {
        console.log(e.target.value)
        dispatch(stateTimeChange(e.target.value))
    }
  
    const gameInfo = useSelector(state => state.gameInfo)

    const handleclickk = () => {
        try {
            wsInstance.ws.emit("play",JSON.stringify({ 'message': "init_start",user:gameInfo.user }));
            setPopUp({ flag: true, message: "searching your opponent", loading: true })

        } catch (r) {
            console.log(r)
        }
    }
    const mes = (obj) => {
        let response = JSON.parse(obj)
        if (response.message === "playerfound") {
            dispatch(stateFlagChange(true))
            dispatch(stateGameIdChange(response.gameId))
            // console.log("found", gameFlag,response)
            setPopUp({...popUp,flag:false})
            setPopUp({ flag: true, message: "player found your opponent is "+"  "+response.opponent, loading: false })
            audioRef.current.play()
        }
        if (response.opponent) {
            // console.log(response['opponent'])
            dispatch(stateOpponentChange(response.opponent))
        }
        if (response.color === "black") {
            dispatch(stateFlagChange(false))
            dispatch(stateColorChange(response.color))
        }
        // console.log("sd",response.gameId)
    }
    useEffect(() => {
        wsInstance.ws.addEventListener("userCredentials", mes)
        return () => {
            if (wsInstance.ws) {
                wsInstance.ws.removeEventListener("userCredentials", mes)
            }
        }
    }, [wsInstance.ws,gameFlag,gameInfo])
    return (
        <>
            <div className="workload" ref={divRef} >
                <button className="play" onClick={handleclickk}>Play</button>
                <select value={count} onChange={handle} id="opt">
                    <option value={5}>5min</option>
                    <option value={10}>10min</option>
                    <option value={3}>3min</option>
                </select>
            </div>
            <DialogBox popUp={popUp} setPopUp={setPopUp} loading={popUp.loading} />
            <audio src="https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/notify.mp3" controls={false} ref={audioRef}></audio>
        </>
    )
}
export default Workload1