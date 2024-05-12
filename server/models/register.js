import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
});

const registerModel = mongoose.model("registerUser", registerSchema);

export default registerModel;
