import { Request, Response } from "express";

import cloudinary from "../lib/cloudinary";


export const uploadThumbnailNovel = async (req: Request, res: Response) => {
    try {
        

        const thubnail = await cloudinary.uploader.upload(req.file?.path, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "hobanovel/book/thumbnail",
        });

        return res.json({
            success: true,
            message: "Upload image successful",
            image: thubnail
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}