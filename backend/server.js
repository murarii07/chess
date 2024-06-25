import express from "express";
import path from 'path'
import { WebSocketServer } from 'ws'
import { gameManager, Game } from "./gameManager.js";
const app = express();
const port = 3000;
import cors from 'cors'
app.use(express.static(path.resolve('public')))
app.use(cors())
app.get("/ss", (req, res) => {
    console.log("asas")
    res.json({ message: 'asas' })

});
const server = app.listen(port, () => {
    console.log("server started........");
});
let onlineplayer = []
// let dd = []
const Manager = new gameManager();
const wss = new WebSocketServer({ server })
wss.on("connection", (ws) => {
    Manager.addUser(ws)
    ws.on("message", (message) => {
        let obj = message
        obj = JSON.parse(obj)
        console.log(obj)
        if (obj['message'] === 'init_start') {
            onlineplayer.push(ws)
            ws.send(JSON.stringify({ "message": "Searching players.........." }))
            // console.log(onlineplayer.length, 111111)
            if (onlineplayer.length >= 2) {
                const p1 = onlineplayer.shift()
                const p2 = onlineplayer.shift()
                // let rp = new Game(p1, p2,playerid);
                // dd.push(rp)
                // p1.send(JSON.stringify({ "message": "playerfound", playerId: dd.indexOf(rp), color: 'white', player: "p1", }))
                // p2.send(JSON.stringify({ "message": "playerfound", playerId: dd.indexOf(rp), color: 'black', player: "p2", }))
                // console.log("lets play the game")
                Manager.playGame(p1,p2)
            }
        }
        else if (obj['message'] === 'move') {
            let id = obj['playerId']
            try{
                const f = Manager.gameZone[parseInt(id)]
                console.log(id)
                let res = f.makeAMove(obj['move'])
                // console.log(res)
                if (res) {
                    console.log(f.chess.fen())
                    f.player1.send(JSON.stringify({ chessboard: f.chess.fen(), message: 'moved', moved: obj['move'] }))
                    f.player2.send(JSON.stringify({ chessboard: f.chess.fen(), message: 'moved', moved: obj['move'] }))
                }
                else {
                    console.log("wrong move")
                }
            }catch(TypeError){
                console.log("error: id not found")
            }
        }

        console.log(Manager.players.length)


    })
    ws.on("close", () => {
        Manager.removeUser(ws)
    })
});
