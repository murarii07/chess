
let chess = [
    "Bh1", "Bg1", "Bw1", "Bq", "Bk", "Bw2", "Bg2", "Bh2",
    "Bp1", "Bp2", "Bp3", "Bp4", "Bp5", "Bp6", "Bp7", "Bp8",
    "0", "0", "0", "0", "0", "0", "0", "0",
    "0", "0", "0", "0", "0", "0", "0", "0",
    "0", "0", "0", "0", "0", "0", "0", "0",
    "0", "0", "0", "0", "0", "0", "0", "0",
    "Wp1", "Wp2", "Wp3", "Wp4", "Wp5", "Wp6", "Wp7", "Wp8",
    "Wh1", "Wg1", "Ww1", "Wq", "Wk", "Ww2", "Wg2", "Wh2",

];
let flag = false;
let idx = 0
let isSelected = false
let previousPos;
let pieceSvg;

function abhi(piece, pos) {
    let rp = document.querySelector(".stat")
    let c = document.createElement("div")
    let cs = document.createElement("span")
    c.setAttribute("class", "status")
    cs.innerText = `${piece} ${pos}`
    c.appendChild(cs)
    rp.appendChild(c)
}

let result, piece, pos, futurePos
let r = document.querySelectorAll(".box1")
for (const df of r) {
    df.setAttribute("id", idx.toString())
    idx++;
}
let sv = document.querySelectorAll("svg")
//  console.log(sv[0])
idx = 0;
let v = chess.filter(x => x !== "0")
for (const df of sv) {
    df.setAttribute("id", v[idx]);
    idx++;
}

let playerName
let iddd;
const ws = new WebSocket("ws://localhost:3000")
ws.addEventListener("open", () => {
    console.log("server started..")
})
ws.addEventListener("message", (message) => {
    let obj = message.data; //string
    // console.log(typeof(obj))
    obj = JSON.parse(obj)
    result = obj['result'];
    if (result && playerName === obj['player']) {

        futurePos.innerText = ""
        futurePos.prepend(pieceSvg)
        previousPos.innerText = ""
        abhi(piece, pos)
        flag = false;
    }
    console.log("aa")
    flag = obj['flag']
    if (obj['player']) {
        playerName = obj['player']
    }
    iddd = obj['playerId']
    console.log("id", iddd)
    if (obj['chess']) {
        chess = null;
        chess = obj['chess']
    }
    console.log(obj)
})

let container = document.querySelector(".container")
let btn = document.querySelector("button")
btn.addEventListener("click", () => {

    let obj = {
        id: 1,
        message: "init_start"
    }
    ws.send(JSON.stringify(obj))
    container.style.opacity = "1"
    btn.disabled = true
    btn.remove()

})

r.forEach(Element => {
    Element.addEventListener("click", () => {
        if (!flag) {
            return
        }
        console.log(1)
        let d = Element.childNodes
        if ((!d.length) && (!isSelected)) {
            return
        }
        if (isSelected) {
            futurePos = Element
            pos = futurePos.getAttribute("id")
            piece = pieceSvg.getAttribute("id")
            result = ws.send(JSON.stringify({ "piece": piece, "pos": pos, "playerId": iddd, message: "move", player: playerName }))

            pieceSvg.style.transform = "scale(1)"
            isSelected = false

        }
        else {
            previousPos = Element
            pieceSvg = previousPos.firstChild
            pieceSvg.style.transform = "scale(1.2)"
            isSelected = true
        }
    })
})
