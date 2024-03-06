const mongoose = require("mongoose");

const subcatSchema = new mongoose.Schema({
    // c_id: {
    //     type: String,
    //     required: true,
    // },
    subcname: {
        type: String,
        // required: true,
        unique: true,
        // trim: true
    }
    // images: {
    //     type: Array,
    //     required: true
    // }
})
const subcateModel = mongoose.model("sub_category", subcatSchema);

module.exports = subcateModel