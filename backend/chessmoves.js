
// let stat = []
// let chess = [
//     "Bh1", "Bg1", "Bw1", "Bq", "Bk", "Bw2", "Bg2", "Bh2",
//     "Bp1", "Bp2", "Bp3", "Bp4", "Bp5", "Bp6", "Bp7", "Bp8",
//     "0", "0", "0", "0", "0", "0", "0", "0",
//     "0", "0", "0", "0", "0", "0", "0", "0",
//     "0", "0", "0", "0", "0", "0", "0", "0",
//     "0", "0", "0", "0", "0", "0", "0", "0",
//     "Wp1", "Wp2", "Wp3", "Wp4", "Wp5", "Wp6", "Wp7", "Wp8",
//     "Wh1", "Wg1", "Ww1", "Wq", "Wk", "Ww2", "Wg2", "Wh2",

// ];
// function valiation(piece, pos) {
//     //piece will move to that square where square is empty or oppennts pawn 
//     //piece a string which contain W or B with the piece name like king or rook
//     let content = chess[pos]
//     // console.log(content, chess)
//     if ((content === "0") || (content[0] !== piece[0])) {
//         return true
//     }
//     return false
// }

// //return true or false if res is present in given array or not
// function multipleOf(num, res) {
//     let arr = [1, 2, 3, 4, 5, 6, 7, 8]
//     arr = arr.map(x => x * num)
//     //console.log(arr)
//     return arr.includes(res)
// }
// //multipleOf(9)
// // validation2 is for checking whether  other piece is place between pos and  piece index
// function validation2(idx, chess, pos, num) {
//     let id = idx
//     console.log("id", idx)
//     while (id != pos) {
//         if (chess[id] !== '0' && id !== idx) {
//             console.log("you cannot go pos position")
//             return true;
//         }
//         if (idx > pos) {
//             id -= num;
//         } else {
//             id += num;
//         }
//     }
//     return false
// }

// //valiation () returns true then this function will exxectuee
// function move(piece, pos, idx) {
//     //piece of current pos ko "0"
//     //move to pos
//     //add to stat array
//     // let idx = chess.indexOf(piece)
//     // console.log(idx)
//     chess[idx] = "0";
//     chess[pos] = piece;
//     // console.log(chess[piece])
//     let temp = { "piece": piece, "position": pos }
//     stat.push(temp)
// }


// //pawn //moves on forward and one square at a time
// function pawn(piece, pos) {
//     let idx = chess.indexOf(piece)
//     let res = Math.abs(idx - pos)
//     //see chess borad and try this logic
//     let content = chess[pos]
//     // console.log(content)
//     //move on diagonal one step
//     let r = (res === 7) || (res === 9)
//     if (r && ((piece[0] !== content[0]) && (content[0] !== "0"))) {
//         move(piece, pos, idx)
//         return true

//     }
//     else if ((res === 8) && (content[0] === "0")) {
//         //move
//         move(piece, pos, idx)
//         return true
//     }
//     else {
//         console.log("wrong move of pawn")
//         return false
//     }
//     //move


// }
// //king
// function king(piece, pos) {
//     let idx = chess.indexOf(piece)
//     let res = Math.abs(idx - pos)
//     //see chess borad and try this logic
//     let kingMoves = [1, 7, 8, 9];
//     let r = kingMoves.includes(res)
//     console.log(res, r)
//     if (r && valiation(piece, pos)) {
//         //move
//         move(piece, pos, idx)
//         return true
//     }
//     else {
//         console.log("try again wrong move of king")
//         return false
//     }
// }

// //oot
// function oot(piece, pos) {
//     let idx = chess.indexOf(piece)
//     console.log("inital position", idx)
//     let res = Math.abs(idx - pos)
//     //see chess borad and try this logic
//     let r1 = multipleOf(7, res);
//     let r2 = multipleOf(9, res);
//     if ((r1 || r2) && valiation(piece, pos)) {
//         //true then num=7 else num=9
//         let num = (r1) ? 7 : 9
//         let r = validation2(idx, chess, pos, num)
//         if (r) {
//             console.log("try again wrong move of oot ye wala")
//             return false
//         }
//         move(piece, pos, idx)
//         return true
//     }
//     else {
//         console.log("try again wrong move of oot")
//         return false
//     }
// }

// //hathi
// function hathi(piece, pos) {
//     let idx = chess.indexOf(piece)
//     let res = Math.abs(idx - pos)
//     //see chess borad and try this logic
//     let hathiMoves = 8
//     console.log(idx, pos, res)
//     console.log(valiation(piece, pos))
//     if ((multipleOf(hathiMoves, res)) && valiation(piece, pos)) {
//         let r = validation2(idx, chess, pos, hathiMoves)
//         if (r) {
//             console.log("try again wrong move of hathi ye wala")
//             return false
//         }
//         //move
//         move(piece, pos, idx)
//         return true
//     }
//     else {
//         console.log("try again wrong move of hathi")
//         return false
//     }
// }

// //queen
// function queen(piece, pos) {
//     let idx = chess.indexOf(piece)
//     let res = Math.abs(idx - pos)
//     //see chess borad and try this logic
//     let rr = [7, 8, 9]
//     let boolr = rr.map(x => multipleOf(x, res))
//     let filterRules = boolr.find(x => x === true)
//     // console.log(r1, r2)
//     if ((filterRules) && valiation(piece, pos)) {
//         let num = rr[boolr.indexOf(filterRules)]
//         // console.log(num, pos)
//         let r = validation2(idx, chess, pos, num)
//         if (r) {
//             console.log("try again wrong move of queen ye wala")
//             return false
//         }
//         else {
//             //move
//             move(piece, pos, idx)
//             return true
//         }
//     }
//     else {
//         console.log("try again wrong move of queen")
//         return false
//     }
// }

// //hathi
// function ghoda(piece, pos) {

//     //see chess borad and try this logic
//     let idx = chess.indexOf(piece)
//     //for moving downward
//     let r1 = Math.abs(idx + 8 + 7)
//     let r2 = Math.abs(idx + 8 + 9)
//     //for moving upward
//     let r3 = Math.abs(idx - 8 - 7)
//     let r4 = Math.abs(idx - 8 - 9)


//     //for moving right
//     let r5 = Math.abs((idx + 1) - 7) //right to up
//     let r6 = Math.abs(idx + 1 + 9) //right to down
//     //for moving left
//     let r7 = Math.abs((idx - 1) + 7) //left to down
//     let r8 = Math.abs((idx - 1) - 9) //left to up
//     let rules = [r1, r2, r3, r4, r5, r6, r7, r8]
//     let filterRules = rules.includes(pos);
//     if (filterRules && valiation(piece, pos)) {
//         //move     
//         move(piece, pos, idx)
//         return true
//     }
//     console.log("try again wrong move of ghoda")
//     return false
// }
