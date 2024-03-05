const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    Name: String,
    email: {
        type: String,
        unique: [
            true,
            "this email is already exist,please try another one.."],
        trim: true,
        required: true,
        lowercase: true
    },
    mobile:{
        type:Number,
        unique:true,
        maxlength:10,
        minlength:10,
        required:true
    },
    subject:String,
    message: String
});
const contactModel = new mongoose.model("Contact", contactSchema)

module.exports = contactModel

