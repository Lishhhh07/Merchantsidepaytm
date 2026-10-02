import "dotenv/config";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_USER_PASS } from "./config.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prismaClient = new PrismaClient({
    adapter,
});

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const { username, password, name } = req.body; // zod to verify the schema

    try {
        await prismaClient.user.create({
            data: {
                username,
                password,
                name
            }
        });

        res.json({
            message: "Signed up"
        });
    } catch (e) {
        return res.status(403).json({
            message: "Error while signing up"
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body; // zod to verify the schema

    const user = await prismaClient.user.findFirst({
        where: {
            username,
            password
        }
    });

    if (!user) {
        return res.status(403).json({
            message: "Unable to log you in"
        });
    }

    const token = jwt.sign(
        {
            id: user.id
        },
        JWT_USER_PASS
    );

    return res.json({
        token
    });
});