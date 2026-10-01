import { Router } from "express";
const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
  // Handle user signup logic here
  res.send("User signed up successfully");
})
userRouter.post("/signin", async (req, res) => {
  // Handle user login logic here
  res.send("User logged in successfully");
}