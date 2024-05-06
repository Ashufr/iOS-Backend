import express from "express";
import  {createUser, getUsers, getUser, addItemToStorage } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers)
.post("/", createUser)
.get("/:id", getUser)
.post("/:userId", addItemToStorage);

export default router;
