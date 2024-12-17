import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
import { stateChange } from '../redux/games/playerCredientials'
import { stateFlagChange } from "../redux/games/flag";
import DialogBox from "./DialogBox";
import { wsInstance } from "./wsclass";
import { updateState } from "../redux/games/statusBoard";
function PlayRandomMoveEngine() {
  const user = useSelector(state => state.user.value)
  const gameFlag = useSelector(state => state.f.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const [playerId] = useState(null);
  const id = useRef(playerId)
  const chessRef = useRef(null)
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState({ flag: false, message: "OOps!!" })

  function onDrop(sourceSquare, targetSquare) {
    if (gameFlag) {
      console.log("yaaaa", id.current, gameFlag)
      console.log("sd", sourceSquare, targetSquare,)
      const messObj = {
        message: "move",
        playerId: id.current,
        playername: user,
        move: {
          from: sourceSquare,
          to: targetSquare,
        }
      }
      wsInstance.messageSend(messObj)
    }
  }
  useEffect(() => {
    console.log(chessRef.current)
  }, [])
  useEffect(() => {
    console.log(gameFlag)
  }, [gameFlag])
  //handling message logic
  function MessageInterpretation(message) {
    let obj = JSON.parse(message.data);
    if (obj['message'] === "playerfound") {
      setPopUp({flag:true, message: "player found.." })
      console.log(popUp)
      dispatch(stateFlagChange(true))
      id.current = obj['playerId']
      if (obj['color'] === "black") {
        dispatch(stateFlagChange(false))
        setcolor(obj['color'])

      }
    }
    else if (obj['message'] === 'moved') {
      const gameCopy = new Chess(obj['chessboard']);
      setGame(gameCopy)
      console.log(game, gameFlag)
      dispatch(stateFlagChange(!gameFlag))
      const positions = obj['moved']
      dispatch(updateState(`${positions.from}-${positions.to}`))
    }
    if (obj['opponent']) {
      console.log(obj['opponent'])
      dispatch(stateChange(obj['opponent']))
    }

    console.log(gameFlag)
  }
  useEffect(() => {
    console.log("sd")
    wsInstance.ws.addEventListener("message", MessageInterpretation)
    return () => {
      if (wsInstance.ws) {
        wsInstance.ws.removeEventListener("message", MessageInterpretation)
      }
    }
  }, [wsInstance.ws, gameFlag])

  return (
    <>
      <Chessboard boardOrientation={color} boardWidth={456} position={game.fen()} onPieceDrop={onDrop} ref={chessRef} animationDuration={20}  />
      <DialogBox popUp={popUp} setPopUp={setPopUp} />
    </>
  )
}

export default PlayRandomMoveEngine;