import express from "express"
const router = express.Router()

import { getUserById } from "../controllers/UserController";


router.get("/:id", getUserById);



export default router;