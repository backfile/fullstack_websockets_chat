import express from "express"
import {Server as SocketServer} from "socket.io"
import http from "http"
import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017")

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
})

const Message = mongoose.model("Message", messageSchema)

async function getMessages(){
    const messages = await Message.find()
    
    return messages
}

async function saveMessage(data){
    const message = new Message({
        message: data
    })
    message.save().then(res => console.log("Usuario creado exitosamente")).catch(error => console.log(error))
}

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
        saveMessage(data)
    })
})

app.get("/getMessages", async (req, res) => {
    const messages = await getMessages()
    console.log(messages)
    res.send(messages)
})


server.listen(3000, ()=> console.log("Working"))
