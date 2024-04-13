import express from "express"
import {Server as SocketServer} from "socket.io"
import http from "http"
import mongoose from "mongoose"
import cors from "cors"
import { apiRoutes } from "./routes/api.js"


const app = express()
const server = http.createServer(app)
mongoose.connect("mongodb://localhost:27017").catch(error => console.log(error))

app.use(express.json())
app.use(cors())
app.use("/api", apiRoutes)


const io = new SocketServer(server, {
    cors: {}
})

io.on("connect", socket => {
    console.log("Client connect")

    socket.on("message", (data)=>{
        const message = data.data
        const username = data.user
        socket.broadcast.emit("message", {
            data: message,
            user: username
        })
    })
})

server.listen(3000, ()=> console.log("Working"))



