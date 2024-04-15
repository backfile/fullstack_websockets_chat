import { getMessages } from "../services/messageService.js"
import { checkCredentials } from "../services/checkLoginCredentials.js"
import { generateAccessToken } from "../services/generateAccesTokenService.js"
import { saveMessage } from "../services/messageService.js"

export const apiController = {}

apiController.getMessages = async (req, res) => {
    const messages = await getMessages()
    res.send(messages)
}

apiController.saveMessages = async (req, res) =>{
    const { data, user } = req.body;
    console.log(req.body)

    saveMessage({
        data: data,
        user: user
    })
    res.status(200).json({message: "saved"})
}

apiController.ping = (req, res) =>{
    res.json({ping: "ping"})
}

apiController.login = async (req, res) => {
    const { username, password } = req.body;
    const user = { username: username };
    console.log(req.body)

    try {
        const isValid = await checkCredentials(username, password);
        if (isValid) {
            const accessToken = generateAccessToken(user);
            res.header("authorization", accessToken).json({
                message: "Usuario autenticado",
                token: accessToken,
                user: username,
                password: password
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}










