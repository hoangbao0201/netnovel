import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createChapter } from "../controllers/ChapterController";


router.post("/:slug", deserializeUser, createChapter);


export default router;