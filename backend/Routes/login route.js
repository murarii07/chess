import express from 'express';
import fs from 'fs';
export const login = express.Router()
login.get("/", (req, res) => {
    res.sendFile("C:\\tt\\chess\\public\\login.html")
})

login.post("/", (req, res) => {
    const userdb = fs.readFileSync("C:\\tt\\chess\\public\\db.json", "utf-8")
    const db = JSON.parse(userdb)
    const filt = db.filter(x => x.username === req.body.username);
    let n = filt[0]
    console.log(n)
    if ((filt.length !== 0) && (n['password'] === req.body.password)) {
        console.log("er")
        res.status(200).json({ "success": "logged in" })
    }
    else {
        res.status(404).json({ "failed": "loggedout" })
    }
})
