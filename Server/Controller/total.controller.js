const {userModel} = require('../Model/user');
const pro_detailModel = require('../Model/product_detail');
const cateModel = require('../Model/category');

const total = async (req, res) => {
    try {
        var { tuser, tproduct, tcat } = [];
        var { totuser, totproduct, totcat } = 0;
        tuser = await userModel.find();
        tproduct = await pro_detailModel.find();
        tcat = await cateModel.find();

        totuser = tuser.length;
        totproduct = tproduct.length;
        totcat = tcat.length;
        res.send({ totuser, totproduct, totcat });
    } catch (error) {
        console.log("total error", error);
    }
}

module.exports = { total };