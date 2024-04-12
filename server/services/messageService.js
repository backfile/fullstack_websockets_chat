import { Message } from "../models/Message.js"

export async function getMessages(){
    const messages = await Message.find()
    return messages
}

export async function saveMessage(data){
    const message = new Message(data)
    message.save().then(res => console.log("Usuario creado exitosamente")).catch(error => console.log(error))
}
