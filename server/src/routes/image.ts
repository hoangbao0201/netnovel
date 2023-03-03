import express from "express"
const router = express.Router()

import { storage } from "../lib/multer";
import { uploadThumbnailNovel } from "../controllers/ImageController"




router.post("/thumbnail/:slug", storage.single("file"), uploadThumbnailNovel);




export default router;