import { Request, Response } from "express";

import { getUserByIdHandle } from "../services/user.service";

// Register User
export const getUserById = async (req: Request, res: Response) => {
    try {
        
        const existingUser = await getUserByIdHandle(req.params.id);
        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Get user error",
            })
        }

        return res.json({
            success: true,
            message: "Register successful",
            user: existingUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};