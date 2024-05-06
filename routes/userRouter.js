import express from "express";
import  {createUser, getUsers, getUser } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers)
.post("/", createUser)
.get("/:id", getUser);

export default router;
