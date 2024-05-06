import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String
    }
});

const itemModel = mongoose.model('Item', itemSchema);

export default itemModel