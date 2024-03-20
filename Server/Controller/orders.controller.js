const { default: mongoose } = require("mongoose");
const orderModel = require("../Model/order");
const order_detailModel = require("../Model/orderdetail");
const pro_detailModel = require("../Model/product_detail");
const moment = require("moment");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");

const generateInvoice = (products, orderId, email, total) => {
    const doc = new PDFDocument();
    const invoiceDir = "./invoices/"; // Changed the path to start from the current directory
    const invoicePath = `${ invoiceDir }order_${ orderId }.pdf`;

    // Ensure directory existence
    if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir, { recursive: true });
    }

    try {
        const writeStream = fs.createWriteStream(invoicePath);

        doc.pipe(writeStream);

        doc.fontSize(20).text(`Product Order Bill`);
        doc.moveDown(); // Add some vertical space

        doc.fontSize(14).text(`Email: ${ email }`);
        doc.fontSize(12).text(`Order ID: ${ orderId }`);
        doc.moveDown(); // Add some vertical space

        // Loop through products
        for (let product of products) {
            doc.fontSize(10).text(`Product: ${ product.product_name }`);
            doc.fontSize(10).text(`Price: ${ product.total_amt }`);
            doc.fontSize(10).text(`Quantity: ${ product.uqty }`); // Corrected spelling of Quantity
            doc.moveDown(); // Add some vertical space
        }

        doc.fontSize(10).text(`Total Bill is: ${ total / 100}`); // Assuming total is in cents, converting to dollars

    doc.end();

    return invoicePath;
} catch (error) {
    console.error("Error generating invoice:", error);
    return null; // Handle error gracefully
}
};
const orderPlace = async (req, res) => {
    try {
        const orderdate = moment().format("DD-MM-YYYY");
        const orderInfo = req.body.orderInfo;
        const orderDetail = req.body.orderDetail;

        const orderData = await orderModel.create({
            uid: orderInfo.uid,
            fname: orderInfo.fname,
            lname: orderInfo.lname,
            address: orderInfo.address,
            mobile: orderInfo.mobile,
            email: orderInfo.email,
            order_date: orderdate,
            transaction_id: orderInfo.transaction_id,
            order_status: 0,
            total_amt: orderInfo.total_amt,
            subtotal: orderInfo.subtotal,
            discount: orderInfo.discount,
        });

        if (!orderData) {
            return res.send({ status: 0, result: [], message: "Order not placed" });
        }

        const promises = orderDetail.map(async (detail) => {
            const result_qty = await pro_detailModel.findOne(
                { _id: detail._id },
                { qty: 1, _id: 0 }
            );
            if (result_qty) {
                const up_qty = parseInt(result_qty.qty) - parseInt(detail.uqty);
                await pro_detailModel.findByIdAndUpdate(
                    { _id: detail._id },
                    { qty: up_qty }
                );
            }
            return order_detailModel.create({
                o_id: orderData._id,
                p_id: detail._id,
                pname: detail.product_name,
                price: detail.price,
                uqty: detail.uqty,
                total_amt: detail.total_amt,
                size_of_product: detail.size,
            });
        });

        const orderDetailResults = await Promise.all(promises);

        // Generate and attach invoice after all order details are processed
        const pdfPath = generateInvoice(
            orderDetail,
            orderData._id,
            orderInfo.email,
            orderInfo.total_amt * 100
        );

        if (!pdfPath) {
            return res.send({
                status: 0,
                result: [],
                message: "Failed to generate invoice",
            });
        }

        // Send email with invoice attached
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jinalgola@gmail.com",
                pass: "bhuy skmy zbjz uwlh",
            },
        });

        const mailOptions = {
            from: "jinalgola@gmail.com",
            to: orderInfo.email,
            subject: "Invoice for Your Order",
            text: "Your Order placed Successfully...",
            attachments: [
                {
                    filename: `order_${ orderData._id }.pdf`,
                path: pdfPath,
        },
      ],
    };

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error("Error sending email:", err);
    } else {
        console.log("Email sent:", info);
    }
});

res.send({
    status: 1,
    result: orderData,
    message: "Order Placed Successfully",
});
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send(error.message);
}
};
const orderGet = async (req, res) => {
    try {
        console.log(req.body, isNaN(req.body.search), "req");
        let orderList = [];
        const searchValueArray = [];
        const options = [
            {
                $match: { order_status: 0 },
            },
        ];
        // console.log(options, "MMMMMMM");

        // if (req.body.search != undefined && req.body.search != null && req.body.search != "") {
        //     req.body.search = req.body.search.trim();
        //     const searchValueInteger = parseInt(req.body.search);

        //     searchValueArray.push(
        //         { "u_name": { $regex: new RegExp(req.body.search, 'i') } },
        //         { "email": { $regex: new RegExp(req.body.search, 'i') } },
        //         { "mobile": { $regex: new RegExp(req.body.search, 'i') } },
        //         // { "order_date": { $regex: new RegExp(startDate) } },
        //         { "total_amt": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } },
        //         { "discount": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } },
        //         { "subtotal": isNaN(req.body.search) ? undefined : { $eq: parseInt(req.body.search) } }
        //     )
        //     options[0].$match.$or = searchValueArray;
        // }
        // if (req.body.date != undefined && req.body.date != null && req.body.date != "") {
        //     searchValueArray.push(
        //         { "order_date": { $regex: new RegExp(moment(req.body.date, "YYYY-MM-DD").format("DD-MM-YYYY")) } },
        //     )
        //     options[0].$match.$or = searchValueArray;
        // }

        console.log(options[0].$match, "options");
        const orderResults = await orderModel.aggregate(options).exec();
        console.log(orderResults, "orderResults");
        if (orderResults.length > 0) {
            for (let i = 0; i < orderResults.length; i++) {
                const singleOrder = { order: orderResults[i], details: [] };
                // console.log(singleOrder, "sssssssssssssss");
                const orderDetailResults = await new Promise((resolve, reject) => {
                    // console.log("*", singleOrder.order._id);
                    order_detailModel
                        .aggregate([
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
                        ])
                        .exec((error, result1) => {
                            console.log(result1, "result1");
                            if (error) {
                                console.log("error", error);
                                reject(error);
                            } else {
                                console.log("result1", result1);
                                resolve(result1);
                            }
                        });
                });
                // console.log("((((", orderDetailResults);
                if (orderDetailResults.length > 0) {
                    singleOrder.details = orderDetailResults;
                    // console.log("", singleOrder,);
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

// const getuserorder = async (req, res) => {
//     try {
//         const id = req.params.id;
//         console.log(id, "email")
//         var query1 = [
//             {
//                 $match: { user: id }
//             },
//             {
//                 $lookup: {
//                     from: "order",
//                     localField: "_id",
//                     foreignField: "orderid",
//                     as: "orderdetaildata"
//                 }
//             }
//         ];
//         console.log(query1[1].$lookup.localField, "---==--")
//         const getod = await orderModel.aggregate(query1).exec();
//         console.log(id, "email")
//         if (getod.length > 0) {
//             console.log(id, "email")
//             res.send(getod);
//         }
//         else {
//             res.send("No items you orderd");
//         }
//     } catch (error) {
//         console.log("erooro", error);
//     }
// }

const deliveredOrder = async (req, res) => {
    try {
        orderModel.findByIdAndUpdate({ _id: req.params.id }, {
            order_status: 4
        })
            .then((result) => {
                if (result) {
                    res.send({ status: 1, result: result, message: "delivered order " })
                } else {
                    res.send({ status: 0, result: [], message: " order not delivered" })
                }
            }).catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }

}
const get_deliverOrder = async (req, res) => {


    try {
        const data = await orderModel.find({ order_status: 4 });
        if (data) {
            res.send({ status: 1, data: data, message: "Delivered order  Found" })
        } else {
            res.send({ status: 0, data: [], message: "Delivered order not Found " })
        }
        // res.send(data)
    } catch (error) {
        res.send(error)
    }

}


module.exports = { orderPlace, orderGet, dispatchOrder, get_dispatchOrder, deliveredOrder, get_deliverOrder };