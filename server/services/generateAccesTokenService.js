import jwt from "jsonwebtoken"

export function generateAccessToken(user) {
    return jwt.sign(user, "franco", { expiresIn: "2m" });
}