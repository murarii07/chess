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
    playGame(p1, p2) {
        const r = new Game(p1, p2);
        this.gameZone.push(r)
        const id = this.gameZone.indexOf(r)
        this.messageTranfer(p1, {
             message: "playerfound", 
             playerId: id, 
             color: 'white', 
             player: "p1", 
             opponent: "naam" })
        this.messageTranfer(p2, { "message": "playerfound", playerId: id, color: 'black', player: "p2", opponent: "naam" })
        console.log("lets play the game")
    }
    messageTranfer(player, messageObject) {
        player.send(JSON.stringify(messageObject))
    }
    singleGameRetrive(indexNumber){
        return this.gameZone[indexNumber]
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
                console.log("ads", this.chess.get(move.to), move)
                this.stat.push(move);
                this.playerCheck();
                this.gameOver();
                this.playerCheckMate();
                return true;
            }
        } catch (e) {
            return false
        }
    }
    gameOver() {
        if (this.chess.isDraw())
            console.log("Game is drawed")
    }
    playerCheck() {
        if (this.chess.isCheck()) {
            console.log("player is check")
        }
    }
    playerCheckMate() {
        if (this.chess.isCheckmate()) {
            console.log("player wins")
        }
    }
    gameMessage(p1MessageObject,p2MessageObject){
        this.player1.send(JSON.stringify(p1MessageObject))
        this.player2.send(JSON.stringify(p2MessageObject))

    }
}

export { gameManager, Game }