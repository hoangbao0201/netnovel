import { Request, Response } from "express";
import { uploadThumbnailNovelByUrlHandle } from "../services/image.service";


export const uploadThumbnailNovel = async (req: Request, res: Response) => {
    try {
        const { url } = req.body

        const thubnail = await uploadThumbnailNovelByUrlHandle(url as string)

        return res.json({
            success: true,
            message: "Upload thumnail successful",
            image: thubnail
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}