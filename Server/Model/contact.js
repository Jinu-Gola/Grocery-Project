const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [
            true,
            "this email is already exist,please try another one.."],
        trim: true,
        required: true,
        lowercase: true
    },
    message: String
});
const contactModel = new mongoose.model("Contact", contactSchema)

module.exports = contactModel

