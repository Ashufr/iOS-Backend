import express from "express";
import householdController from "../controllers/householdController.js";

const router = express.Router();
const { createHousehold, getHousehold, getHouseholds, setupStorage, updateHousehold } = householdController;

router.get("/", getHouseholds)
.post("/", createHousehold)
.get("/:id", getHousehold)
.post("/:id", updateHousehold)
.post("/:id/storage", setupStorage);


export default router