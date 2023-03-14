import { Request, Response } from "express";
import { convertQueryAdvanted } from "../utils/convertQueryAdvanted";
import { createNovelHandle, createNovelStealHandle, getNovelBySlugHandle, getNovelByTitleHandle, getNovelsByUserIdHandle, getNovelsHandle } from "../services/novel.service";


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

        const existingNovel = await getNovelBySlugHandle(req.body.url.split("truyen/")[1] as string)
        if(existingNovel) {
            return res.status(400).json({
                success: false,
                message: "Truyện đã tồn tại"
            })
        }

        if(!req.body.url) {
            return res.status(400).json({ 
                success: false,
                message: "Url not found"
            })
        }
        const novel = await createNovelStealHandle(req.body.url as string, res.locals.user._id as string);
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
        const novel = await getNovelBySlugHandle(req.params.slug as string);
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
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}

export const getNovelByUserId = async (req: Request, res: Response) => {
    try {

        const novels = await getNovelsByUserIdHandle(req.params.userId as string);
        if(!novels) {
            return res.status(400).json({
                success: false,
                message: "Get Novels By UserId error"
            })
        }

        return res.json({
            success: true,
            message: "Get novels successful",
            // novels: novels
            novels: novels || null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}

export const getNovelByTitle = async (req: Request, res: Response) => {
    try {

        const novels = await getNovelByTitleHandle(req.params.query as string);
        if(!novels) {
            return res.status(400).json({
                success: false,
                message: "Get Novels By Title Error"
            })
        }

        return res.json({
            success: true,
            message: "Get novels successful",
            novels: novels
            // novels: req.params.query || null
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}

export const getNovelsAdvancedSearch = async (req: Request, res: Response) => {
    try {

        const { genres, personality, scene, classify, sort, status, gender, numberchapter } : any = req.query
        const newQuery = convertQueryAdvanted({ 
            genres,
            personality,
            scene,
            classify,
            sort,
            status,
            gender,
            numberchapter
        })

        return res.json({
            success: true,
            message: "Get novels successful",
            newQuery: newQuery
            // novels: {
            //     genres: genres || null,
            //     personality: personality || null,
            //     scene: scene || null,
            //     classify: classify || null,
            //     sort: sort || null,
            //     status: status || null,
            //     gender: gender || null,
            //     numberchapter: numberchapter || null
            // }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}