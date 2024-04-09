import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
})

export const Message = mongoose.model("Message", messageSchema)
