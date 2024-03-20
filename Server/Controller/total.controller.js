const pro_detailModel = require('../Model/product_detail');
// const cateModel = require('../Model/category');
const orderModel = require('../Model/order')
const userModel = require('../Model/user');
const moment = require('moment')

const total = async (req, res) => {
    try {
        // var { tuser, tproduct,  torder ,tadmin} = [];
        // var { totuser, totproduct,  totorder,totadmin } = 0;

        tuser = await userModel.find({ isAdmin: false });
        tadmin = await userModel.find({ isAdmin: true });

        tproduct = await pro_detailModel.find();
        // tcat = await cateModel.find();
        torder = await orderModel.find({ order_status: 0 });
        tdispatchorder = await orderModel.find({ order_status: 3 });
        tdeliverorder = await orderModel.find({ order_status: 4 });
        // tTransaction = await orderModel.find({ order_status: 4 },{

        // });

        // torder = await orderModel.find({ order_status: 0 });
        const total = async() => {
            const tTransactionOrders = await orderModel.find({
                order_status: 4,
                order_date: {
                    $eq: moment().format('DD-MM-YYYY')
                    // $gte: today.toDate(), // Greater than or equal to the start of today
                    // $lt: tomorrow.toDate() // Less than the start of tomorrow
                }
            });

            // Calculate total transaction amount
            let totalTransactionAmount = 0;
            tTransactionOrders.forEach(order => {
                totalTransactionAmount += order.total_amt || 0;
            });
            console.log(totalTransactionAmount);
        }
        totuser = tuser.length;
        totproduct = tproduct.length;
        // totcat = tcat.length;
        totorder = torder.length;
        totdispatchorder = tdispatchorder.length;
        totdeliverorder = tdeliverorder.length;

        totadmin = tadmin.length;
        // console.log(totorder,"orderssssssssssssss");
        res.send({ totuser, totproduct, totorder, totadmin, totdispatchorder, totdeliverorder,total });
        console.log(totorder, totadmin, totproduct, totuser, totdispatchorder, totdeliverorder, total.totalTransactionAmount);
    } catch (error) {
        console.log("total error", error);
    }
}

module.exports = { total };