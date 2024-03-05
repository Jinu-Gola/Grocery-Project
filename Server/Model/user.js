const mongoose = require("mongoose");
const regSchema = mongoose.Schema({
    name:
    {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    // email: {
    //     type: String,
    //     trim: true,
    //     lowercase: true,
    //     unique: [true,
    //     "this email is already exist,please try another one.."],
    //     required: 'Email address is required',
    //     // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    // },
    email: {
        type: String,
        unique: [
            true,
            "this email is already exist,please try another one.."],
        trim: true,
        required: true,
        lowercase: true
    },
    mobile: {
        type: Number,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        unique: true,
        trim: true
    },
    // gender: String,
    // age: Number,
    // address: String,
    isAdmin: {
        type: Boolean,
        default: false
    }


})

const regModel = new mongoose.model("registration", regSchema);


module.exports = { regModel }
