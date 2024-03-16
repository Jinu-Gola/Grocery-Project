const mongoose = require("mongoose");
const order_detailSchema = new mongoose.Schema({
    
    o_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        require: true,

    },
    p_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_Details",
        require: true
    },
    pname: {
        type: String
    },
    price: {
        type: Number,
        // trim:true
    },
    uqty: {
        type: Number,
        require: true
    },

    total_amt: {
        type: Number,
        require: true
    },
    size_of_product: {
        type: String
    }



})
const order_detailModel = mongoose.model("order_detail", order_detailSchema);

module.exports = order_detailModel