import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
import {stateChange} from '../redux/games/playerCredientials'
import { stateFlagChange } from "../redux/games/flag";
function PlayRandomMoveEngine() {
  const ws = useSelector(state => state.ws.value)
  const user = useSelector(state => state.user.value)
  const gameFlag=useSelector(state => state.f.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const [playerId, setplayer] = useState(null);
  const id = useRef(playerId)
  const dispatch = useDispatch();
  function onDrop(sourceSquare, targetSquare) {
    if (gameFlag) {
      console.log("yaaaa", id.current)
      console.log("sd", sourceSquare, targetSquare,)
      ws.send(JSON.stringify({
        message: "move", playerId: id.current, playername:user,move: {
          from: sourceSquare,
          to: targetSquare,
        }
      }))
    }
  }

  useEffect(() => {
    const eventHandle = (message) => {
      let obj = message.data; //string
      obj = JSON.parse(obj)
      if (obj['message'] === "playerfound") {
        id.current = obj['playerId']
        dispatch(stateFlagChange())
      }
      if (obj['color'] === "black") {
        setcolor("black")
        dispatch(stateFlagChange())
      }
      if (obj['message'] === 'moved') {
        let board = obj['chessboard']
        const gameCopy = new Chess(board);
        setGame(gameCopy)
        dispatch(stateFlagChange())
        return;
      }
      if (obj['opponent']) {
        console.log(obj['opponent'])
        dispatch(stateChange(obj['opponent']))
      }
    }
    ws.addEventListener("message", eventHandle)
    return () => {
      ws.removeEventListener("message", eventHandle)
    }
  }, [ws])

  return <Chessboard boardOrientation={color} boardWidth={456} position={game.fen()} onPieceDrop={onDrop} />;

}

export default PlayRandomMoveEngine