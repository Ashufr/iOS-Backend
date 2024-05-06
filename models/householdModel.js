import mongoose from "mongoose";

const householdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code : {
        type : String,
        required : true
    },
    storages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Storage",
        },
    ]
});

const householdModel = mongoose.model("Household", householdSchema);

export default householdModel;
