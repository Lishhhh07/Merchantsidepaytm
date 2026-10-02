import "dotenv/config";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_USER_PASS, JWT_MERCHANT_PASS } from "./config.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prismaClient = new PrismaClient({
    adapter,
});

export const merchantRouter = Router();

merchantRouter.post("/signup", async (req, res) => {
    const { username, password, name } = req.body; // zod to verify the schema

    try {
        await prismaClient.merchant.create({
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

merchantRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body; // zod to verify the schema

    const merchant = await prismaClient.merchant.findFirst({
        where: {
            username,
            password
        }
    });

    if (!merchant) {
        return res.status(403).json({
            message: "Unable to log you in"
        });
    }

    const token = jwt.sign(
        {
            id: merchant.id
        },
        JWT_MERCHANT_PASS
    );

    return res.json({
        token
    });
});