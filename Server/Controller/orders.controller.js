const orderModel = require('../Model/order')
const order_detailModel = require('../Model/order')
const pro_detailModel = require('../Model/product_detail');
const moment = require('moment');


const orderPlace = async (req, res) => {
    try {
        console.log(req.body, "KKKKKKKKKKK");
        const orderdate = moment().format('DD-MM-YYYY');

        // const { uid, fname, lname, adderss, mobile, email, order_date, transaction_id, order_status, total_amt, subtotal, discount } = req.body;

        const orderData = await orderModel.create({
            uid: req.body.orderInfo.uid,
            fname: req.body.orderInfo.fname,
            lname: req.body.orderInfo.lname,
            adderss: req.body.orderInfo.uid,
            mobile: req.body.orderInfo.mobile,
            email: req.body.orderInfo.email,
            order_date: orderdate,
            transaction_id: req.body.orderInfo.transaction_id,
            order_status: 0,
            total_amt: req.body.orderInfo.total_amt,
            subtotal: req.body.orderInfo.subtotal,
            discount: req.body.orderInfo.discount,

        }).then((result) => {
            console.log(result, "order information....");
            if (result) {
                console.log(req.body, "bbbbbbbb");
                for (let i = 0; i < req.body.orderDetail.length; i++) {
                    let p_qty
                    pro_detailModel.find({
                        _id: req.body.orderDetail[i]._id
                    }, { qty: 1, _id: 0 }).then((final_p_qty) => {
                        if (final_p_qty) {
                            p_qty = parseInt(final_p_qty[0].qty) - parseInt(req.body.orderDetail[i].uqty)
                            console.log(p_qty, "product quantity...");
                        }
                    })
                    console.log(p_qty, "p_qty");
                    // const { o_id, p_id, price, uqty, total_amts, size_of_product, city, country, pincode, email, returnstatus } = req.body
                    order_detailModel.create({
                        o_id: result._id,
                        p_id: req.body.orderDetail[i]._id,
                        price: req.body.orderDetail[i].price,
                        uqty: req.body.orderDetail[i].u_qty,
                        total_amt: req.body.orderDetail[i].total_amt,
                        size_of_product: req.body.orderDetail[i].size
                    }).then((result) => {
                        console.log(result, p_qty, "order details information");
                        if (result) {
                            pro_detailModel.findByIdAndUpdate({ _id: req.body.orderDetail[i]._id }, {
                                qty: p_qty
                            }).then((result) => {
                                console.log(result, "product qty updated");
                            })
                        }
                    })

                    res.send({ status: 1, result: result, message: "order Place Successfully.." })

                }
            }
            else {
                res.send({ status: 0, result: [], message: "order not placed" })

            }
        })




    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

module.exports = {
    orderPlace
}