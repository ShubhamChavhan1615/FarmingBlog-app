import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    date: {
        type: Date,
    },
    plantationDate: {
        type: Date,
    },
    pesticide: {
        type: String,
    },
    photo: {
        name: {
            type: String,
        },
    },
    description: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registerUser'
    }],
    comments: [{
        type: String
    },
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registerUser'

    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registerUser'
    }],
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
