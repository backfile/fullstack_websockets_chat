import express from "express"
import { apiController } from "../controllers/apiController.js"
import { validateToken } from "../services/validateTokenService.js"

export const apiRoutes = express.Router()


apiRoutes.get("/getMessages", validateToken, apiController.getMessages)

apiRoutes.post("/saveMessages", validateToken, apiController.saveMessages)

apiRoutes.post("/login", apiController.login)


