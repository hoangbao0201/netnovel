import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createNovel, createNovelSteal, getNovelBySlug, getNovels } from "../controllers/NovelController";



router.post("/create/steal", deserializeUser, createNovelSteal);

router.post("/create", deserializeUser, createNovel);


// GET
router.get("/:slug", getNovelBySlug);

router.get("/", getNovels);

export default router;
