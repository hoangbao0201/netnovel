import express from "express"
const router = express.Router()

import { deserializeUser } from "../middleware/deserializeUser";

import { createNovel, createNovelSteal, getNovelBySlug, getNovelByTitle, getNovelByUserId, getNovels } from "../controllers/NovelController";



router.post("/create/steal", deserializeUser, createNovelSteal);

router.post("/create", deserializeUser, createNovel);


// GET

router.get("/all-novels", getNovels);

router.get("/search-novel/text=:query", getNovelByTitle)

router.get("/user/:userId", getNovelByUserId);

router.get("/:slug", getNovelBySlug);


export default router;
