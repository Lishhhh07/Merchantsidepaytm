import express from "express";
import { userRouter } from "./router/user.js";
import { merchantRouter } from "./router/merchant.js";

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/merchant", merchantRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});