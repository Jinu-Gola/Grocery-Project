const mongoose = require("mongoose");

const subcatSchema = new mongoose.Schema({
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",
        required: true,
      
    },
    subcname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    // images: {
    //     type: Array,
    //     required: true
    // }
})
const subcateModel = mongoose.model("sub_category", subcatSchema);

module.exports = subcateModel