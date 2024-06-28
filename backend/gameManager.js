import { Chess } from "chess.js";
class gameManager {
    players = [];
    idx = 0;
    gameZone = [];


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
    playGame(p1,p2) {
        const r = new Game(p1, p2);
        this.gameZone.push(r)
        const id = this.gameZone.indexOf(r)
        p1.send(JSON.stringify({ "message": "playerfound", playerId: id, color: 'white', player: "p1",opponent:"naam" }))
        p2.send(JSON.stringify({ "message": "playerfound", playerId: id, color: 'black', player: "p2",opponent:"naam" }))
        console.log("lets play the game")
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
        try {
            if (gamecopy.move(move)) {
                this.chess.move(move);
                this.stat.push(move);
                return true;
            }
        } catch (e) {
            return false
        }


    }
}

export { gameManager, Game }