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
        // require: true,
    },
    mobile: {
        type: Number,
        // require: true,
        // unique: true
    },
    email: {
        type: String,
        // require: true,
        // unique: true

    },
    order_date: {
        type: String,
        require: true
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
        // default: "panding"
        default:0
    }
    
})



const orderModel = mongoose.model("order", orderSchema);



module.exports =  orderModel