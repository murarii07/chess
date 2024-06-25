import express from "express";
import path from 'path'
import {login} from './Routes/login route.js'

import { WebSocketServer } from 'ws'
import { gameManager, Game } from "./gameManager.js";
import { register } from "./Routes/register route.js";
const app = express();
const port = 3000;
import cors from 'cors'
app.use(express.static(path.resolve('public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/login",login)
app.use("/register",register)
app.get("/ss", (req, res) => {
    console.log("asas")
    res.json({ message: 'asas' })

});
const server = app.listen(port, () => {
    console.log("server started........");
});
let onlineplayer = []
let dd = []
let r = new gameManager();
const wss = new WebSocketServer({ server })
wss.on("connection", (ws) => {
    r.addUser(ws)
    ws.on("message", (message) => {
        let obj = message
        obj = JSON.parse(obj)
        console.log(obj)
        if (obj['message'] === 'init_start') {
            onlineplayer.push(ws)
            ws.send(JSON.stringify({ "message": "Searching players.........." }))
            let count = onlineplayer.length;
            console.log(onlineplayer.length, 111111)
            if (count >= 2) {
                let p1 = onlineplayer.shift()
                let p2 = onlineplayer.shift()
                let rp = new Game(p1, p2);
                dd.push(rp)
                p1.send(JSON.stringify({ "message": "player found", playerId: dd.indexOf(rp), flag: 'white', player: "p1", chess: rp.chess }))
                p2.send(JSON.stringify({ "message": "player found", playerId: dd.indexOf(rp), color:'black', player: "p2", chess: rp.chess }))

                console.log("lets play the game")
            }
        }
        else if (obj['message'] === 'move') {
            let id = obj['playerId']
            let f = dd[parseInt(id)]
            console.log(dd)
            let res = f.makeAMove(obj['move'])
            console.log(res)
            if (res) {
                console.log(f.chess.fen())
                f.player1.send(JSON.stringify({ chessboard: f.chess.fen() ,message:'moved'}))
                f.player2.send(JSON.stringify({ chessboard: f.chess.fen() ,message:'moved'}))
            }
            else {

            }
        }

        console.log(r.players.length)


    })
    ws.on("close", () => {
        r.removeUser(ws)
    })
});
