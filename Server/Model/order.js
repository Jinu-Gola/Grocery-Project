
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({


    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registration",
        require: true
    },
    fname: {
        type: String,
        require: true,
    },
    lname: {
        type: String,
        require: true,
    },
    adderss: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    order_date: {
        type: String,
        // require: true
    },
    transaction_id: {
        type: String,
        require: true,

    },
    total_amt: {
        type: Number,
        require: true
    },
    subtotal: {
        type: Number,
        require: true
    },
    discount: {
        type: Number
    },
    order_status: {
        type: Number,
        // require: true
        default:"pending"
    }
    // otp:{
    //     type:Number
    // }
})

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
    pname:{
        type:String
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
    size_of_product:{
        type:String
    },
    city: {
        type: String,
        // require: true,
    },
    country: {
        type: String,
        // require: true,
    },
    pincode: {
        type: Number,
        // require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    returnstatus:{
        type:Number
    },
    


})


const orderModel = mongoose.model("order", orderSchema);
const order_detailModel = mongoose.model("order_detail", order_detailSchema);



module.exports = order_detailModel;
module.exports = orderModel;
