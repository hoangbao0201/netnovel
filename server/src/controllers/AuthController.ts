import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { getUserByAccoutHandle } from "../services/user.service";

// Connect User
export const connectUser = async (_req: Request, res: Response) => {
    try {
        return res.json({
            success: true,
            user: res.locals.user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
}

// Register User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password } = req.body;

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản đã tồn tại",
            });
        }

        // // Hash password
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashPassword,
        });
        await newUser.save();

        return res.json({
            success: true,
            message: "Register successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error ${error}`,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {

    try {
        const { accout, password } = req.body;

        const existingUser = await getUserByAccoutHandle(accout);
        if(!existingUser) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu không đúng",
            })
        }

        // // Verify password
        const passwordValid = await argon2.verify(existingUser.password as string, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Tài khoản hoặc mật khẩu không đúng",
            });
        }

        // JWT
        const accessToken = await jwt.sign(
            {
                userId: existingUser._id,
            },
            process.env.ACCESS_TOKEN_SETCRET as string
        );

        return res.json({
            success: true,
            message: "Login user successful",
            accessToken: accessToken
            // existingUser: existingUser
            // accout, password
        })
        
    } catch (error) {
        return {
            code: 500,
            success: false,
            message: `Internal server error ${error}`,
        };
    }

}