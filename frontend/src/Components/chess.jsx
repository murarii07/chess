import { useRef, useState } from "react";
import { BLACK, Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";
function PlayRandomMoveEngine() {
  const ws = useSelector(state => state.ws.value)
  const [game, setGame] = useState(new Chess());
  const [color, setcolor] = useState("white")
  const colour=useRef(color)
  function onDrop(sourceSquare, targetSquare) {
    ws.send(JSON.stringify({message:"move",playerId:0,move:{
      from: sourceSquare,
      to: targetSquare,
      // always promote to a queen for example simplicity
    }}))
  }
  
  ws.addEventListener("message", (message,) => {
    let obj = message.data; //string
    obj = JSON.parse(obj)
    if(obj['color']==="black"){
      console.log('💕')
      setcolor("black")
    }
    else if(obj['message']==='moved'){
      let board=obj['chessboard']
      const gameCopy = new Chess(board); 
      setGame(gameCopy)
    }
    alert(obj.message)
});
console.log('💕')

  return <Chessboard boardOrientation={color} boardWidth={456} position={game.fen()} onPieceDrop={onDrop} />;

}

export default PlayRandomMoveEngine