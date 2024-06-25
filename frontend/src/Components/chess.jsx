import { useRef, useState, useEffect } from "react";
import { BLACK, Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
function PlayRandomMoveEngine() {
  const ws = useSelector(state => state.ws.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const [playerId, setplayer] = useState(null);
  const [flag, setflag] = useState(true);
  const fl = useRef(flag)
  const id = useRef(playerId)

  function onDrop(sourceSquare, targetSquare) {
    if (fl.current) {
      console.log("yaaaa",id.current)
      console.log("sd",sourceSquare,targetSquare,)
      ws.send(JSON.stringify({
        message: "move", playerId: id.current, move: {
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
        console.log("color", fl.current)
        console.log('💕')
        setcolor("black")
      }
      if (obj['message'] === 'moved') {
        console.log("fun")
        fl.current = !fl.current; // Toggle the flag
        console.log("moved", fl.current)
        let board = obj['chessboard']
        const gameCopy = new Chess(board);
        setGame(gameCopy)
      }
      if (obj['message'] === "playerfound") {
        console.log("ASSSSS",obj['playerId'], id.current)
        id.current = obj['playerId']
        console.log(id.current)
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