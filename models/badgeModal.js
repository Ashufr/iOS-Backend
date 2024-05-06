import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateEarned : {
        type: Date,
        required: true
    },
    imageName : {
        type: String,
        required: true
    }
})

const badgeModel = mongoose.model("Badge", badgeSchema);

export default badgeModel