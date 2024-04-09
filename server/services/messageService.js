import { Message } from "../models/Message.js"

export async function getMessages(){
    const messages = await Message.find()
    return messages
}
