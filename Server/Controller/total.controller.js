const pro_detailModel = require('../Model/product_detail');
const cateModel = require('../Model/category');
const orderModel = require('../Model/order')
const userModel = require('../Model/user');

const total = async (req, res) => {
    try {
        var { tuser, tproduct, tcat, torder } = [];
        var { totuser, totproduct, totcat, totorder } = 0;
        tuser = await userModel.find();
        tproduct = await pro_detailModel.find();
        tcat = await cateModel.find();
        torder = await orderModel.find();

        totuser = tuser.length;
        totproduct = tproduct.length;
        totcat = tcat.length;
        totorder = torder.length;
        // console.log(totorder,"orderssssssssssssss");
        res.send({ totuser, totproduct, totcat, totorder });
    } catch (error) {
        console.log("total error", error);
    }
}

module.exports = { total };