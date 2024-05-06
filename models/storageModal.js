import mongoose from "mongoose";

const storageSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Item"
    }]
})

const storageModel = mongoose.model("Storage", storageSchema);

export default storageModel