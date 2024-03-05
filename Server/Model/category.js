const mongoose = require("mongoose");

const categSchema = new mongoose.Schema({
    cname: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
    // images: {
    //     type: Array,
    //     required: true
    // }
})
const cateModel = mongoose.model("category", categSchema);




module.exports = cateModel;