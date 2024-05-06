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

const getHouseholds = async (req, res) => {
    try {
        const households = await householdModel.find();
        res.status(200).json(households);
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


const setupStorage = async (req, res) => {
    const { id } = req.params;
    try {
        const household = await householdModel.findById(id);
        if (!household) {
            return res.status(404).json({ message: "Household not found" });
        }
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
        household.storages = [pantry, fridge, freezer, shelf, all];
        await household.save();
        res.status(200).json(household);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addItemToStorage = async (req, res) => {
    const { householdId } = req.params;
    try {
        const { storageId, allStorageId, item } = req.body;

        // Find the user by their ID
        const household = await householdModel.findById(householdId);
        if (!household) {
            return res.status(404).json({ error: "Household not found" });
        }

        const storage = await household.storages.findById(storageId);
        const allStorage = await household.storages.findById(allStorageId);
        if (!storage || !allStorage) {
            return res.status(404).json({ error: "Storage not found" });
        }

        // Create a new item based on the item data received
        const newItem = new itemModel(item);

        // Save the item to the database
        await newItem.save();

        // Add the item to the items array in the storage document
        storage.items.push(newItem);
        allStorage.items.push(newItem);
        // Save the modified storage document
        await storage.save();
        await allStorage.save();
        return res
            .status(200)
            .json({ message: "Item added to storage successfully" });
    } catch (error) {
        console.error("Error adding item to storage:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const addMultipleItems = async (req, res) => {
    const { householdId } = req.params;
    const { storageId, allStorageId, items } = req.body;


    try {
        const household = await householdModel.findById(householdId);
        if (!household) {
            return res.status(404).json({ error: "Household not found" });
        }

        const storage = await household.storages.findById(storageId);
        const allStorage = await household.storages.findById(allStorageId);
        if (!storage || !allStorage) {
            return res.status(404).json({ error: "Storage not found" });
        }
        for (const item of items) {
            const newItem = new itemModel(item);
            await newItem.save();
            storage.items.push(newItem);
            allStorage.items.push(newItem);
        }
        await user.save();
        return res.status(200).json({ message: "Items added successfully" });
    } catch (error) {
        console.error("Error adding items:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export default { createHousehold, getHousehold, getHouseholds, setupStorage, updateHousehold, addItemToStorage, addMultipleItems }