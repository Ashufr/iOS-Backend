import householdModel from "../models/householdModel.js";
import storageModel from "../models/storageModal.js";

const createHousehold = async (req, res) => {
    const { name, code } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!code) {
        return res.status(400).json({ message: "Code is required" });
    }
    try {
        const newHousehold = new householdModel({ name, code });
        const pantry = new storageModel({ 
            name: "Pantry",
            items: [],
        })  
        const fridge = new storageModel({ 
            name: "Fridge",
            items: [],
        })  
        const freezer = new storageModel({
            name: "Freezer",
            items: [],
        }) 
        const shelf = new storageModel({
            name: "Shelf",
            items: [],
        })
        const all = new storageModel({
            name: "All",
            items: [],
        })
        pantry.save();
        fridge.save();
        freezer.save();
        shelf.save();
        all.save();
        newHousehold.storages = [pantry, fridge, freezer, shelf, all];
        await newHousehold.save();
        res.status(201).json(newHousehold);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getHousehold = async (req, res) => {
    const { id } = req.params;
    try {
        const household = await householdModel.findById(id);
        if (!household) {
            return res.status(404).json({ message: "Household not found" });
        }
        res.status(200).json(household);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateHousehold = async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;
    try {
        const household = await householdModel.findById(id);
        if (!household) {
            return res.status(404).json({ message: "Household not found" });
        }
        if (name) {
            household.name = name;
        }
        if (code) {
            household.code = code;
        }
        
        await household.save();
        res.status(200).json(household);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { createHousehold, getHousehold, updateHousehold }