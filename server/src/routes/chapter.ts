import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createChapter, createChapterSteal, getChapter, getManyChapter, increaseViewChapter } from "../controllers/ChapterController";



router.post("/:slug/:chapterNumber", deserializeUser, createChapterSteal);

router.post("/:slug", deserializeUser, createChapter);

router.get("/:slug/:number", getChapter);

router.get("/increase-view/:slug/:chapterNumber", increaseViewChapter);

router.get("/:slug", getManyChapter);

export default router;