import { type Request, type Response, type NextFunction } from "express";
import { JWT_USER_PASS } from "./config.js";
import { JWT_MERCHANT_PASS } from "./config.js";
import jwt from "jsonwebtoken";

export const userAuthmiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    const verified = jwt.verify(token!, JWT_USER_PASS);

    if (typeof verified === "object" && verified !== null && "id" in verified) {
        (req as Request & { id: string }).id = verified.id as string;
        next();
    } else {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

export const merchantAuthmiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];

    const verified = jwt.verify(token!, JWT_MERCHANT_PASS);

    if (typeof verified === "object" && verified !== null && "id" in verified) {
        (req as Request & { id: string }).id = verified.id as string;
        next();
    } else {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};