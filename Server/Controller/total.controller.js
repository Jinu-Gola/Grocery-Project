const pro_detailModel = require('../Model/product_detail');
// const cateModel = require('../Model/category');
const orderModel = require('../Model/order')
const userModel = require('../Model/user');

const total = async (req, res) => {
    try {
        // var { tuser, tproduct,  torder ,tadmin} = [];
        // var { totuser, totproduct,  totorder,totadmin } = 0;

        tuser = await userModel.find({ isAdmin: false });
        tadmin = await userModel.find({ isAdmin:true });

        tproduct = await pro_detailModel.find();
        // tcat = await cateModel.find();
        torder = await orderModel.find();

        totuser = tuser.length;
        totproduct = tproduct.length;
        // totcat = tcat.length;
        totorder = torder.length;
        totadmin=tadmin.length;
        // console.log(totorder,"orderssssssssssssss");
        res.send({ totuser, totproduct, totorder,totadmin });
        console.log(totorder,totadmin,totproduct,totuser);
    } catch (error) {
        console.log("total error", error);
    }
}

module.exports = { total };