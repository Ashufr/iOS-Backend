import express from "express";
import { getStorages, getStorage, createStorage } from "../controllers/storageController.js";

const router = express.Router();

router.get("/", getStorages)
.post("/", createStorage)
.get("/:id", getStorage);

export default router