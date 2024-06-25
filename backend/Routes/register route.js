import express from 'express'
import fs from 'fs';
export const register=express.Router()
register.get("/",(req,res)=>{
    res.sendFile("C:\\tt\\chess\\public\\register.html")
})
register.post("/",(req,res)=>{
    const userdb=fs.readFileSync("C:\\tt\\chess\\public\\db.json","utf-8")
    const db= JSON.parse(userdb)
    const filt=db.filter(x=>x.username===req.body.username);
    if(filt.length===0){
        console.log(req.body)
        db.push(req.body)
        fs.writeFileSync("C:\\tt\\chess\\public\\db.json",JSON.stringify(db));
        res.status(200).json({"success":"user registerd"})
    }
    else{
         res.status(404).json({"failed":"username exist"})
    }
})