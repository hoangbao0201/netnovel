import { Request, Response } from "express";


// Register User
export const createChapter = async (req: Request, res: Response) => {
    try {
        return res.json({
            success: true,
            message: "Create chapter successful",
            nameNovel: req.params.slug
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};