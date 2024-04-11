import { getMessages } from "../services/messageService.js"
import { checkCredentials } from "../services/checkLoginCredentials.js"
import { generateAccessToken } from "../services/generateAccesTokenService.js"

export const apiController = {}

apiController.getMessages = async (req, res) => {
    const messages = await getMessages()
    res.send(messages)
}

apiController.login = async (req, res) => {
    const { username, password } = req.body;
    const user = { username: username };

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








