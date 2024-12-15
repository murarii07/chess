import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
import { stateChange } from '../redux/games/playerCredientials'
import { stateFlagChange } from "../redux/games/flag";
function PlayRandomMoveEngine() {
  const ws = useSelector(state => state.ws.value)
  const user = useSelector(state => state.user.value)
  const gameFlag = useSelector(state => state.f.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const [playerId] = useState(null);
  const id = useRef(playerId)
  const dispatch = useDispatch();
  function onDrop(sourceSquare, targetSquare) {
    if (gameFlag) {
      console.log("yaaaa", id.current, gameFlag)
      console.log("sd", sourceSquare, targetSquare,)
      ws.send(JSON.stringify({
        message: "move",
        playerId: id.current,
        playername: user,
        move: {
          from: sourceSquare,
          to: targetSquare,
        }
      }))
    }
  }
  useEffect(() => {
    console.log(gameFlag)
  }, [gameFlag])
  //handling message logic
  function MessageInterpretation(obj) {
    if (obj['message'] === "playerfound") {
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
    }
    if (obj['opponent']) {
      console.log(obj['opponent'])
      dispatch(stateChange(obj['opponent']))
    }

    console.log(gameFlag)
  }
  useEffect(() => {
    console.log("sd")
    const eventHandle = (message) => {
      let obj = JSON.parse(message.data); //string
      MessageInterpretation(obj)
    }
    ws.addEventListener("message", eventHandle)
    return () => {
      if(ws){

        ws.removeEventListener("message", eventHandle)
      }
    }
  }, [ws,gameFlag])

  return <Chessboard boardOrientation={color} boardWidth={456} position={game.fen()} onPieceDrop={onDrop} />;

}

export default PlayRandomMoveEngine;