import storageModel from "../models/storageModal.js";

const getStorages = async (req, res) => {
    const storages = await storageModel.find({});
    res.status(200).json(storages);
}

const getStorage = async (req, res) => {
    const { id } = req.params;
    const storage = await storageModel.findById(id);
    res.status(200).json(storage);
}

const createStorage = async (req, res) => {
    const storage = req.body;
    const newStorage = new storageModel(storage);
    await newStorage.save();
    res.status(201).json(newStorage);
}

export { getStorages, getStorage, createStorage }