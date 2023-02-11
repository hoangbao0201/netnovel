import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        query: { id },
    } = req;

    if (method === "GET") {
        try {
            return res.json({
                name: "bao",
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    try {
    } catch (error) {
        return res.status(500).json(error);
    }
}
