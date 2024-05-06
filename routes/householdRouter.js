import express from "express";
import householdController from "../controllers/householdController.js";

const router = express.Router();
const { createHousehold, getHousehold, getHouseholds, setupStorage, updateHousehold, addItemToStorage, addMultipleItems } = householdController;

router.get("/", getHouseholds)
.post("/", createHousehold)
.get("/:id", getHousehold)
.post("/:id", updateHousehold)
.post("/:id/setupstorage", setupStorage)
.post("/:id/storage", addItemToStorage)
.post("/:id/storage/multiple", addMultipleItems);


export default router