import { Chess } from "chess.js";
class gameManager {
    players = [];
    idx = 0;


    addUser(user) {
        this.players.push(user)
        console.log("new user added")
        this.idx++;
    }
    removeUser(user) {
        this.players = this.players.filter(x => x !== user)
        console.log("user removed")
        //  this.onlineplayer = this.onlineplayer.filter(x => x !== user)
        this.idx--;
    }
    playGame(message, ws) {
        if (message === "init_start") {

        }
        let count = this.onlineplayer.length;
        if (count >= 2) {
            let p1 = this.onlineplayer.shift()
            let p2 = this.onlineplayer.shift()
            p1.send("player found")
            p2.send("player found")
            let r = new Game(p1, p2);
            console.log("lets play the game")
        }
    }
}


class Game {
    player1;
    player2;
    stat = []
    chess = new Chess()

    constructor(player1, player2) {
        this.player1 = player1
        this.player2 = player2
    }

    makeAMove(move) {
        const gamecopy = new Chess(this.chess.fen());
        const df = gamecopy.move(move);
        try {
            if (df) {
                this.chess = new Chess(gamecopy.fen());
                return true;
            }
        } catch (e) {
            console.log("wrong move")
            return false
        }


    }
}

export { gameManager, Game }