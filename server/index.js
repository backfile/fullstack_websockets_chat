import express from "express"
import {Server as SocketServer} from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        
    }
})

io.on("connect", socket => {
    console.log("Client connect")

    socket.on("message", (data)=>{
        console.log(data)
        socket.broadcast.emit("message", {
            data,
            from: socket.id.slice(13)
        })
    })
})





server.listen(3000, ()=> console.log("Working"))
