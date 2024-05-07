import express from "express";
import  {createUser, getUsers, getUser, changeHousehold } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers)
.post("/", createUser)
.get("/:id", getUser)
.post("/:id/changehouse", changeHousehold);

export default router;
