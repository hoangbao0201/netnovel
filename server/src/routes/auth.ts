import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { connectUser, loginUser, registerUser } from "../controllers/AuthController"


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", deserializeUser, connectUser)



export default router;