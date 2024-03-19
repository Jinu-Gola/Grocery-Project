
const { default: mongoose } = require('mongoose');
const orderModel = require('../Model/order')
const order_detailModel = require('../Model/orderdetail')
const pro_detailModel = require('../Model/product_detail');
const moment = require('moment');


const orderPlace = async (req, res) => {
    try {
        // console.log(req.body, "KKKKKKKKKKK");
        const orderdate = moment().format('DD-MM-YYYY');

        // const { uid, fname, lname, adderss, mobile, email, order_date, transaction_id, order_status, total_amt, subtotal, discount } = req.body;

        const orderData = await orderModel.create({
            uid: req.body.orderInfo.uid,
            fname: req.body.orderInfo.fname,
            lname: req.body.orderInfo.lname,
            address: req.body.orderInfo.address,
            mobile: req.body.orderInfo.mobile,
            email: req.body.orderInfo.email,
            order_date: orderdate,
            transaction_id: req.body.orderInfo.transaction_id,
            order_status: 0,
            total_amt: req.body.orderInfo.total_amt,
            subtotal: req.body.orderInfo.subtotal,
            discount: req.body.orderInfo.discount,

        }).then((result) => {
            // console.log(result, "order information....");
            if (result) {
                // console.log(req.body, "bbbbbbbb");
                for (let i = 0; i < req.body.orderDetail.length; i++) {
                    let up_qty;
                    // console.log(req.body.orderDetail.length, "llllllllength");
                    pro_detailModel.find({
                        _id: req.body.orderDetail[i]._id
                    },
                        { qty: 1, _id: 0 }).then((result_qty) => {
                            // console.log(result_qty, "fffffffffffffff");
                            if (result_qty) {
                                up_qty = parseInt(result_qty[0].qty) - parseInt(req.body.orderDetail[i].uqty)
                                // console.log(up_qty, "product quantity...");
                            }
                        })
                    // console.log(up_qty, "up_qty");
                    // const { o_id, p_id, price, uqty, total_amts, size_of_product, city, country, pincode, email, returnstatus } = req.body
                    order_detailModel.create({
                        o_id: result._id,
                        p_id: req.body.orderDetail[i]._id,
                        pname: req.body.orderDetail[i].product_name,
                        price: req.body.orderDetail[i].price,
                        uqty: req.body.orderDetail[i].uqty,
                        total_amt: req.body.orderDetail[i].total_amt,
                        size_of_product: req.body.orderDetail[i].size
                    }).then((result) => {
                        console.log(result, up_qty, "order details information");
                        if (result) {
                            pro_detailModel.findByIdAndUpdate({ _id: req.body.orderDetail[i]._id }, {
                                qty: up_qty
                            }).then((result) => {
                                console.log(result, "product qty updated");
                            })
                        }
                    })
                }
                let transport = nodeMailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "jinalgola@gmail.com",
                        pass: "vcjlvreyonpufzqw"
                    }
                })

                console.log("mail transporter")
                let mailOptions = {
                    from: "jinalgola@gmail.com",
                    to: req.body.orderInfo.email,
                    subject: "Test Mail",
                    text: "Your Order placed Suceessfully..."
                }
                console.log("mailoptions")
                transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info, "info");
                    }
                })
                console.log("ressend")
                // let sendmsg = {
                //     message: JSON.stringify("Order placed Suceessfully..."),
                //     media: JSON.stringify([]),
                //     delay: 0,
                //     schedule: null,
                //     numbers: req.body.orderInfo.mobile,
                //     api_key:
                //         "U2FsdGVkX1/dRXWeSvslmU6UKiyovx72KIMHtOz6IqJljAL55fFweFibGf7OeMuX",
                // };

                // const axiosConfig = {
                //     // Insecure HTTPS requests will be allowed since your frontend is running on HTTP
                //     // You may want to remove this option in production and use HTTPS for your frontend
                //     httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                //     headers: {
                //         Authorization: U2FsdGVkX1 / dRXWeSvslmU6UKiyovx72KIMHtOz6IqJljAL55fFweFibGf7OeMuX,
                //     },
                // };
                // console.log("gggggggggggggggggresponse");

                // axios
                //     .post("https://api.wapmonkey.com/send-message", sendmsg, axiosConfig)
                //     .then((response) => {
                //         console.log(response, "response");
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //     });

                res.send({ status: 1, result: result, message: "order Place Successfully.." })
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

const usersideOrder = async (req, res) => {
    try {
        const result = await orderModel.find();
        res.send({
            status: 1,
            result: result,
            message: "Orders Found",
        });
    } catch (error) {
        console.log(error, "userside Order error..");
        res.send(error)

    }
}


const orderGet = async (req, res) => {
    try {

        // console.log(req.body, isNaN(req.body.search), "req");
        let orderList = [];
        const searchValueArray = [];
        const options = [
            {
                $match: { order_status: 0 },
            }

        ]

        // console.log(options, "MMMMMMM");
        // console.log(isNaN(req.body.search), "search valueee");

        console.log(req.body,"req.body");
        // if (req.body.search != undefined && req.body.search != null && req.body.search != "") {
        //     req.body.search = req.body.search;
        //     const searchValueInteger = parseInt(req.body.search);

        //     searchValueArray.push(
        //         { fname: { $regex: new RegExp(req.body.search, "i") } },
        //         { lname: { $regex: new RegExp(req.body.search, "i") } },

        //         // { "email": { $regex: new RegExp(req.body.search, 'i') } },
        //         // { "mobile": { $regex: new RegExp(req.body.search, 'i') } },
        //         // // { "order_date": { $regex: new RegExp(startDate) } },
        //         // { "total_amt": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } },
        //         // { "discount": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } },
        //         // { "subtotal": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } }
        //     )
        //     options[0].$match.$or = searchValueArray;
        //     // console.log(options, "arrayyyyyyyyyyyyy");
        // }

        // console.log(options[0].$match.$or,"options[0].$match");
        // if (req.body.date != undefined && req.body.date != null && req.body.date != "") {
        //     searchValueArray.push(
        //         { "order_date": { $regex: new RegExp(moment(req.body.date, "YYYY-MM-DD").format("DD-MM-YYYY")) } },
        //     )
        //     options[0].$match.$or = searchValueArray;
        // }

        // console.log(options[0].$match, "options");

        // if (req.body.search && req.body.search.trim() !== "") {
        //     const searchValue = req.body.search.trim();
        //     const regex = new RegExp(searchValue, 'i');

        //     const searchCriteria = {
        //         $or: [
        //             { fname: { $regex: regex } },
        //             { lname: { $regex: regex } },
        //             // Add more fields here for searching
        //         ]
        //     };

        //     options[0].$match.$and = [{ $or: searchCriteria.$or }];
        // }


        const orderResults = await orderModel.aggregate(options).exec();
        // console.log(orderResults, "orderResults");
        if (orderResults.length > 0) {
            for (let i = 0; i < orderResults.length; i++) {
                const singleOrder = { order: orderResults[i], details: [] };
                // console.log(singleOrder, "sssssssssssssss");
                const orderDetailResults = await new Promise((resolve, reject) => {
                    // console.log("***", singleOrder.order._id);
                    order_detailModel.aggregate([
                        {
                            $match: {
                                o_id: mongoose.Types.ObjectId(singleOrder.order._id),
                            },
                        },
                        {
                            $lookup: {
                                from: "product_details",
                                localField: "p_id",
                                foreignField: "_id",
                                as: "product",
                            },
                        },
                        {
                            $unwind: "$product",
                        },
                    ]).exec((error, result1) => {
                        // console.log(result1,"result1");
                        if (error) {
                            console.log("error", error);
                            reject(error);
                        } else {
                            // console.log("result1", result1);
                            resolve(result1);
                        }
                    });
                });
                // console.log("((((", orderDetailResults);
                if (orderDetailResults.length > 0) {
                    singleOrder.details = orderDetailResults;
                    // console.log("******", singleOrder,);
                    orderList.push(singleOrder);
                } else {
                    singleOrder.details = [];
                    orderList.push(singleOrder);
                }

                if (orderResults.length - 1 === i) {
                    res.send({
                        status: 1,
                        result: orderList,
                        message: "Order Get....!",
                    });
                }
            }
        } else {
            res.send({
                status: 0,
                result: [],
                message: "Data Not Found",
            });
        }
    } catch (error) {
        console.log(error);
    }
};



const dispatchOrder = (req, res) => {
    try {
        orderModel.findByIdAndUpdate({ _id: req.params.id }, {
            order_status: 3
        })
            .then((result) => {
                if (result) {
                    res.send({ status: 1, result: result, message: "dispatch order " })
                } else {
                    res.send({ status: 0, result: [], message: "dispatch order not " })
                }
            }).catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }
}


const get_dispatchOrder = async (req, res) => {


    try {
        const data = await orderModel.find({ order_status: 3 });
        if (data) {
            res.send({ status: 1, data: data, message: "dispatch order  Found" })
        } else {
            res.send({ status: 0, data: [], message: "dispatch order not Found " })
        }
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}


const cancelOrder = (req, res) => {
    try {
        console.log(req.body, "body:::::");
        orderModel.updateMany({ _id: req.body.order._id, order_status: 0 }, { order_status: 2 })
            .then((result) => {
                if (result) {
                    console.log(result, "result.......");

                    for (let i = 0; i < req.body.details.length; i++) {
                        let pqty
                        pro_detailModel.find({ _id: req.body.details[i].product._id }, { qty: 1, _id: 0 })
                            .then((pqty_result) => {
                                if (pqty_result) {

                                    console.log(pqty_result, "pqtyresult..");
                                    pqty = parseInt(pqty_result[0].qty) + parseInt(req.body.details[i].uqty)
                                    console.log(pqty, "pqty");
                                    pro_detailModel.findByIdAndUpdate({ _id: req.body.details[i].product._id }, {
                                        qty: pqty
                                    }).then((result) => {
                                        console.log(result, "product qty update");
                                        if (result) {
                                            if (req.body.details.length - 1 == i) { res.send({ status: 1, msg: "Order cancelled Successfully... " }) }
                                        } else {
                                            if (req.body.details.length - 1 == i) { res.send({ status: 0, msg: "Order not cancelled" }) }
                                        }

                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }
                            }).catch((error) => {
                                console.log(error);
                            })
                    }
                } else {
                    console.log(error);
                }
            })
    } catch (error) {
        console.log(error);
    }
}


const getCancelorder = (req, res) => {
    try {
        orderModel.find({ order_status: 2 })
            .then((result) => {
                if (result) {
                    res.send({ status: 1, result: result, message: "canceled order Found" })
                } else {
                    res.send({ status: 0, result: [], message: "canceled order not Found" })
                }
            }).catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { orderPlace, orderGet, dispatchOrder, get_dispatchOrder, usersideOrder, cancelOrder, getCancelorder }