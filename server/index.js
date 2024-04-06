import express from "express"
import {Server as SocketServer} from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connect", socket => {
    console.log("Client connect")

    socket.on("message", (data)=>{
        console.log(data)
        socket.broadcast.emit("message", data)
    })
})





server.listen(3000, ()=> console.log("Working"))
