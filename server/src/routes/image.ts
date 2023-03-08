import express from "express"
const router = express.Router()

import { storage } from "../lib/multer";
import { uploadThumbnailNovel } from "../controllers/ImageController"




router.post("/novel/thumbnail", uploadThumbnailNovel);




export default router;