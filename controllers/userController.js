import userModel from "../models/userModel.js";
import storageModel from "../models/storageModal.js";
import itemModel from "../models/itemModal.js";

const getUsers = async (req, res) => {
    const users = await userModel.find();
    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const user = req.body;
    
    const newUser = new userModel(user);
    await newUser.save();
    res.status(201).json(newUser);
};

const addItemToStorage = async (req, res) => {
    const { userId } = req.params;
    try {
        const { storageId, allStorageId, item} = req.body;

        // Find the user by their ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the storage by its ID
        const storage = await storageModel.findById(storageId);
        const allStorage = await storageModel.findById(allStorageId);
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

export { createUser, getUsers, getUser, addItemToStorage };
