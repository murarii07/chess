import { useRef, useState, useEffect } from "react";
import { BLACK, Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
import {stateChange} from '../redux/games/playerCredientials'
import { stateFlagChange } from "../redux/games/flag";
function PlayRandomMoveEngine() {
  const ws = useSelector(state => state.ws.value)
  const user = useSelector(state => state.user.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const [playerId, setplayer] = useState(null);
  const [flag, setflag] = useState(true);
  const fl = useRef(flag)
  const id = useRef(playerId)
  const dispatch = useDispatch();
  function onDrop(sourceSquare, targetSquare) {
    if (fl.current) {
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
      if (obj['color'] === "black") {
        fl.current = !fl.current;
        setcolor("black")
      }
      if (obj['message'] === 'moved') {
        fl.current = !fl.current; // Toggle the flag
        let board = obj['chessboard']
        const gameCopy = new Chess(board);
        setGame(gameCopy)
        dispatch(stateFlagChange(false))
        return;
      }
      if (obj['message'] === "playerfound") {
        id.current = obj['playerId']
        dispatch(stateFlagChange(true))
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