const mongoose = require("mongoose");

const pro_detailsSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: String,
        require: true,
    },
    qty: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    image: {
        type: Array,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    brand_name: {
        type: String,
        require: true,
    },
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true
    },
    s_cid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sub_category",
        require:true
    }
    // uid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "registration",
    //     require: true
    // }
});


const pro_detailModel = mongoose.model("Product_Details", pro_detailsSchema);


module.exports = pro_detailModel;