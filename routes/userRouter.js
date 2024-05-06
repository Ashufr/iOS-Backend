import express from "express";
import  {createUser, getUsers, getUser, addItemToStorage, addMultipleItems } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers)
.post("/", createUser)
.get("/:id", getUser)
.post("/:userId", addItemToStorage)
.post("/multiple/:userId", addMultipleItems);

export default router;
