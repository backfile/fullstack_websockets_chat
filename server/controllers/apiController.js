import { getMessages } from "../services/messageService.js"
export const apiController = {}


apiController.getMessages = async (req, res) => {
    const messages = await getMessages()
    console.log(messages)
    res.send(messages)
}