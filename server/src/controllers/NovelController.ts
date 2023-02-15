import { Request, Response } from "express";
import { createNovelHandle, createNovelStealHandle, getNovelBySlugHandle, getNovelsHandle } from "../services/novel.service";


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

// Create Novel, Steal
export const createNovelSteal = async (req: Request, res: Response) => {
    try {

        if(!req.body.url) {
            return res.status(400).json({
                success: false,
                message: "Url not found"
            })
        }
        const novel = await createNovelStealHandle(req.body.url as string);
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

export const getNovels = async (req: Request, res: Response) => {
    try {

        const pageNumber = req.query.page || 1 
        const novels = await getNovelsHandle(pageNumber as number);
        if(!novels) {
            return res.status(400).json({
                success: false,
                message: "Get novels error"
            })
        }

        return res.json({
            success: true,
            message: "Get novels successful",
            novels: novels
            // novels: novels || null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}