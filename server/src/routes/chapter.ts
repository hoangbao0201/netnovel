import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createChapter, getChapter, getManyChapter } from "../controllers/ChapterController";


router.post("/:slug", deserializeUser, createChapter);

router.get("/:slug/:number", getChapter);

router.get("/:slug", getManyChapter);

export default router;