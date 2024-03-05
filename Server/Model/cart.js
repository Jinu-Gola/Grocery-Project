const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    p_id: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

const cartModel = mongoose.model("Add-cart", cartSchema)

module.exports =  cartModel 