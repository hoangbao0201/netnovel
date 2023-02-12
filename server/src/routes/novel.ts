import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createNovel, getNovelBySlug } from "../controllers/NovelController";



router.post("/create", deserializeUser, createNovel);

// GET
router.get("/:slug", getNovelBySlug);



export default router;
