const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pname: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String
    },
    p_b_id: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    }
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel 