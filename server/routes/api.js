import express from "express"
import { Message } from "../models/Message.js"

export const apiRoutes = express.Router()


async function getMessages(){
    const messages = await Message.find()
    return messages
}


apiRoutes.get("/getMessages", async (req, res) => {
    const messages = await getMessages()
    console.log(messages)
    res.send(messages)
})

