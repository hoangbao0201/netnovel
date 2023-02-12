import { Request, Response } from "express";
import { createNovelHandle, getNovelBySlugHandle } from "../services/novel.service";


// Create Novel
export const createNovel = async (req: Request, res: Response) => {
    try {

        const novel = await createNovelHandle(req.body, res.locals.user._id);
        if(!novel) {
            return res.status(400).json({
                success: false,
                message: "Create novel error"
            })
        }

        return res.json({
            success: true,
            message: "Create novel successful",
            novel: novel || null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};

// Get Novel By Slug
export const getNovelBySlug = async (req: Request, res: Response) => {
    try {

        const novel = await getNovelBySlugHandle(req.params.slug);
        if(!novel) {
            return res.status(400).json({
                success: false,
                message: "Get novel error"
            })
        }

        return res.json({
            success: true,
            message: "Get novel successful",
            novel: novel || null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};