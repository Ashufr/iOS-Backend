import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import userRouter from "./routes/userRouter.js";
import householdRouter from "./routes/householdRouter.js";
import storageRouter from "./routes/storageRouter.js";

import connectDB from "./config/connectDB.js";

connectDB();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/users", userRouter);
app.use("/api/households", householdRouter);
app.use("/api/storages", storageRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});