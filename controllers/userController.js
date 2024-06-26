import userModel from "../models/userModel.js";
import storageModel from "../models/storageModal.js";
import itemModel from "../models/itemModal.js";
import householdModel from "../models/householdModel.js";

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

const changeHousehold = async (req, res) => {
    const { id } = req.params;
    console.log("adsjfalkdsjf;lasdjf=> ",req.body)
    const {householdId} = req.body;

    const user = await userModel.findById(id);
    user.household = householdId
    await user.save();
    res.status(200).json(user);
}


export { createUser, getUsers, getUser, changeHousehold };
