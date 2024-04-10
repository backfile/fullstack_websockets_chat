import express from "express"
import {Server as SocketServer} from "socket.io"
import http from "http"
import mongoose from "mongoose"
import cors from "cors"
import { apiRoutes } from "./routes/api.js"
import { saveMessage } from "./services/messageService.js"

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
        console.log(data)
        socket.broadcast.emit("message", {
            data,
            from: socket.id.slice(13)
        })
        saveMessage(data)
    })
})

server.listen(3000, ()=> console.log("Working"))



