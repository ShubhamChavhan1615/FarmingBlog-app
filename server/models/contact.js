import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email: String,
    company: String,
    subject: String,
    question: String,
})

const contactModel = mongoose.model("contactU", contactSchema);

export default contactModel;