import express from "express";

const app = express()

app.get("/", (req, res) => {
    console.log("Aa");
    res.send("A");
})

export {app};