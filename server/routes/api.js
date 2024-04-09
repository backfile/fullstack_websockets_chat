import express from "express"
import { apiController } from "../controllers/apiController.js"

export const apiRoutes = express.Router()


apiRoutes.get("/getMessages", apiController.getMessages)

