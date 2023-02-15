import { Request, Response } from "express";
import { createChapterNovelHandle, getchapterByNumberHandle, getManyChapterHandle } from "../services/chapter.service";
import { getNovelBySlugHandle } from "../services/novel.service";

// Create Chapter
export const createChapter = async (req: Request, res: Response) => {
    try {

        const existingNovel = await getNovelBySlugHandle(req.params.slug as string);
        if(!existingNovel) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy truyện"
            })
        }
        if(existingNovel.postedBy?.toString() !== res.locals.user._id?.toString()) {
            return res.status(400).json({
                success: false,
                message: "Bạn không có quyền"
            })
        }

        const newChapter = await createChapterNovelHandle(req.body, existingNovel)
        if(!newChapter) {
            return res.status(400).json({
                success: false,
                message: "Create chapter error"
            })
        }

        return res.json({
            success: true,
            message: "Create chapter successful",
            chapter: newChapter
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};

// Get One Chapter
export const getChapter = async (req: Request, res: Response) => {
    try {

        const chapNumber = req.params.number.split("chuong-")[1]
        const chapter = await getchapterByNumberHandle(req.params.slug as string, parseInt(chapNumber) as number)
        if(!chapter) {
            return res.status(400).json({
                success: false,
                message: "Get chapter error"
            })
        }

        return res.json({
            success: true,
            message: "Get chapter successful",
            chapter: chapter,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};

// Get Many Chapter
export const getManyChapter = async (req: Request, res: Response) => {
    try {

        const chapter = await getManyChapterHandle(req.params.slug as string);
        if(!chapter) {
            return res.status(400).json({
                success: false,
                message: "Get chapter error"
            })
        }

        return res.json({
            success: true,
            message: "Get many chapter successful",
            chapter: chapter,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};