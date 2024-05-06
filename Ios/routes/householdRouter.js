import express from "express";
import householdController from "../controllers/householdController.js";

const router = express.Router();
const { createHousehold, getHousehold, updateHousehold } = householdController;

router.post("/", createHousehold)
.get("/:id", getHousehold)
.post("/:id", updateHousehold);

export default router