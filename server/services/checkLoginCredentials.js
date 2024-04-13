import { User } from "../models/Usuarios.js"

export async function checkCredentials(username, password) {
    try {
        const info = await User.exists({ username: username, password: password });
        return info !== null;
    } catch (error) {
        throw error;
    }
}