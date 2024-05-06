import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    household: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Household",
        required: true
    },
    badges : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Badge"
        }
    ],
    currentStreak : {
        type : Number
    },
    maxStreak : {
        type : Number
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
