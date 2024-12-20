import { useRef, useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useDispatch, useSelector } from "react-redux";

import { stateFlagChange } from "../redux/games/flag";
import DialogBox from "./DialogBox";
import { wsInstance } from "./wsclass";
import { updateState } from "../redux/games/statusBoard";
function PlayRandomMoveEngine() {
  const [boardWidth, setBoardWidth] = useState(456);
  const gameInfo = useSelector(state => state.gameInfo)
  const gameFlag = useSelector(state => state.f.value)
  const [game, setGame] = useState(new Chess());
  const chessRef = useRef(null)
  const audioRef = useRef(null)
  const dispatch = useDispatch();
  const [popUp, setPopUp] = useState({ flag: false, message: "OOps!!" })
  function onDrop(sourceSquare, targetSquare) {
    if (gameFlag) {
      console.log("Moves", sourceSquare, targetSquare,)
      const messObj = {
        message: "move",
        playerId: gameInfo.gameId,
        playername: gameInfo.user,
        move: {
          from: sourceSquare,
          to: targetSquare,
        }
      }
      wsInstance.moveEvent(messObj)
    }
  }
  function handleResult(msg) {
    let response = JSON.parse(msg);
    let m = ""
    if (response.message === "Draw") {
      m = "Game is Draw Play next game"
    }
    else if (response.message === "Win") {
      m = "You WIN!!!!!"
    }
    else {
      m = "You Loose!!!"
    }
    setPopUp({ flag: true, message: m })


  }
  function MovedMessage(message) {
    let obj = JSON.parse(message);
    const gameCopy = new Chess(obj.chessboard);
    setGame(gameCopy)
    dispatch(stateFlagChange(!gameFlag))
    audioRef.current.src = "move-self.mp3"
    audioRef.current.play()
    const positions = obj.moved
    dispatch(updateState(`${positions.from}-${positions.to}`))
  }
  const handleCheck = (msg) => {
    console.log("Check event:", msg);
    audioRef.current.src = "move-check.mp3"
    audioRef.current.pla()
  };
  useEffect(() => {
    wsInstance.ws.addEventListener("check", handleCheck);
    return () => {
      wsInstance.ws.removeEventListener("check", handleCheck);
    };
  }, [wsInstance.ws]);
  useEffect(() => {
    wsInstance.ws.addEventListener("result", handleResult);
    return () => {
      wsInstance.ws.removeEventListener("result", handleResult);
    };
  }, [wsInstance.ws]);

  useEffect(() => {
    wsInstance.ws.addEventListener("moved", MovedMessage)
    return () => {
      if (wsInstance.ws) {
        wsInstance.ws.removeEventListener("moved", MovedMessage)
      }
    }
  }, [dispatch, gameFlag])
  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(window.innerWidth - 40, 456);
      setBoardWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Chessboard boardOrientation={gameInfo.color} boardWidth={boardWidth} position={game.fen()} onPieceDrop={onDrop} ref={chessRef} animationDuration={200} />
      <DialogBox popUp={popUp} setPopUp={setPopUp} />
      <audio src={"move-self.mp3"} controls={false} ref={audioRef} hidden></audio>
    </>
  )
}

export default PlayRandomMoveEngine;