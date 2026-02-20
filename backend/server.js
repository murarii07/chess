import express from "express";
import path from 'path'
import { login } from './src/Routes/login route.js'
import { gameManager, Game } from "./gameManager.js";
import { register } from "./src/Routes/register route.js";
import { Server } from "socket.io";
const app = express();
const port = 5000;
import cors from 'cors'
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
const io = new Server(server)
io.on("connection", (socket) => {
    Manager.addUser(socket)
    socket.on("move", (msg) => {
        let obj = JSON.parse(msg)
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
    socket.on("play", (msg) => {
        let obj = JSON.parse(msg)
        if (obj.message === 'init_start') {
            console.log(obj)
            const map = new Map();
            map.set(obj.user, socket)
            onlineplayer.push(map)
            // onlineplayer.push(socket)
            Manager.messageTranfer(socket, { message: "Searching players.........." })
            if (onlineplayer.length >= 2) {
                const p1 = onlineplayer.shift()
                const p2 = onlineplayer.shift()
                //convert iterator to array

                Manager.playGame(Array.from(p1.values())[0], Array.from(p2.values())[0], Array.from(p1.keys())[0], Array.from(p2.keys())[0])
            }
        }
    })
    socket.on("disconnect", () => {
        Manager.removeUser(socket)
    })
});
