import express from "express";
import path from 'path'
import { login } from './Routes/login route.js'
import { WebSocketServer } from 'ws'
import { gameManager, Game } from "./gameManager.js";
import { register } from "./Routes/register route.js";
const app = express();
const port = 5000;
import cors from 'cors'
import { Server } from "socket.io";
app.use(express.static(path.resolve('public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/login", login)
app.use("/register", register)
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
const wss = new Server(server)
wss.on("connection", (ws) => {
    Manager.addUser(ws)
    ws.on("message", (message) => {
        let obj = JSON.parse(message)
        console.log(obj)
        console.log(Manager.players.length)
    })
    ws.on("move",(msg)=>{
        let obj=JSON.parse(msg)
        if (obj.message === 'move') {
            let id = obj.playerId
            try {
                const f = Manager.singleGameRetrive(parseInt(id))
                console.log(id)
                let resOfMove = f.makeAMove(obj.move)
                if (resOfMove) {
                    console.log(f.chess.fen())
                    f.gameMessage({ chessboard: f.chess.fen(), message: 'moved', moved: obj['move'] }, { chessboard: f.chess.fen(), message: 'moved', moved: obj['move'] })
                }
                else {
                    console.log("wrong move")
                }
            } catch (TypeError) {
                console.log("error: id not found")
            }
        }

    })
   ws.on("play",(msg)=>{
    let obj=JSON.parse(msg)
    if (obj.message === 'init_start') {
        console.log(obj)
        const map=new Map();
        map.set(obj.user,ws)
        onlineplayer.push(map)
        // onlineplayer.push(ws)
        Manager.messageTranfer(ws, { message: "Searching players.........." })
        if (onlineplayer.length >= 2) {
            const p1 = onlineplayer.shift()
            const p2 = onlineplayer.shift()
            for (const key of p1.keys()) {
               console.log(key)
            }
            console.log(p1) //convert iterator to array
            
            Manager.playGame(Array.from(p1.values())[0],Array.from(p2.values())[0],Array.from(p1.keys())[0],Array.from(p2.keys())[0])
        }
    }
   })
    ws.on("disconnect", () => {
        Manager.removeUser(ws)
    })
});
