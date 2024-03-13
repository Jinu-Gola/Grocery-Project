
const orderModel = require('../Model/order');
const order_detailModel = require('../Model/order');
const pro_detailModel = require('../model/product');
const nodemailer = require("nodemailer");
// const fs = require('fs');
// const PDFDocument = require('pdfkit');

// const generateInvoice = (product, id, email, total) => {
//     const doc = new PDFDocument();
//     const invoicePath = ./ invoices / ${ id }.pdf;
//     const writeStream = fs.createWriteStream(invoicePath);

//     doc.pipe(writeStream);

//     doc.fontSize(10).text(Email: ${ email });
//     doc.fontSize(12).text(Invoice for Order ID: ${ id });
//     for (let item of product) {
//         doc.fontSize(10).text(Product: ${ item.name });
//         doc.fontSize(10).text(Price: ${ item.price });
//         doc.fontSize(10).text(Quntity: ${ item.uqty });
//     }
//     doc.fontSize(10).text(Total Bill is: ${ total });

//     doc.end();

//     return invoicePath;
// };


const orderPlace = async (req, res) => {
    var { product, uid, fname, lname, adderss, mobile, email, order_date, transaction_id, total_amt, subtotal, country, state, city } = req.body;
    var pid = [];
    // for (let i = 0; i < product.length; i++) {
    //     pid[i] = product[i]._id;
    // }
    try {
        const order = await orderModel.create({
            uid: uid,
            fname: fname,
            lname: lname,
            adderss: adderss,
            mobile: mobile,
            email: email,
            order_date: order_date,
            transaction_id: transaction_id,
            order_status: 0,
            total_amt: total_amt,
            subtotal: subtotal,
            discount: 0,
        });
        console.log('Order created:', order);
        for (let item of product) {
            try {
                const productDetails = await order_detailModel.create({
                    o_id: order._id,
                    p_id: item._id,
                    pname: item.product_name,
                    price: item.price,
                    qty: item.uqty,
                    size_of_product: item.size,
                    city: city,
                    country: country,
                    pincode: pincode,
                    email: email,
                    returnstatus: 0
                });

                // Update the quantity of the product
                var find = await pro_detailModel.findOne({ _id: item._id });
                console.log("find", find);
                if (find) {
                    const qtyup = find.qty - item.uqty;
                    console.log("qtyup", qtyup);
                    var upate_qty = await pro_detailModel.findByIdAndUpdate(
                        { _id: item._id },
                        { qty: qtyup }
                        , { new: true }
                    );
                }


                console.log("Product updated:", item._id);
                console.log("Order detail added:", productDetails, upate_qty);
            } catch (error) {
                console.error("Error processing product:", error);
            }


        }

        // Send respons with mail pdf
        // const pdf1 = generateInvoice(product, orderid, email, amount);

        // let transport = nodemailer.createTransport({
        //     service: "gmail",
        //     service: "gmail",
        //     auth: {
        //         user: "jinalgola@gmail.com",
        //         pass: "uiodtwczajemtxba"
        //     }
        // });
        // let mailop = {
        //     from: "jinalgola@gmail.com",
        //     to: email,
        //     subject: "Your order placed",
        //     text: "your order placed just right now",
        //     attachments: [
        //         {
        //             filename: ${ orderid }.pdf,
        //         path: pdf1
        //             }
        //         ]

        //   }
        // transport.sendMail(mailop, (err, info) => {
        //     if (err) {
        //         console.log("error mail", err);
        //     }
        //     else {
        //         console.log("info", info);
        //     }
        // })

        // console.log("email sended")
        res.status(200).send({ message: "Order placed successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error placing order:", error);
        res.status(500).send({ error: "Failed to place order" });
    }
}


module.exports = { orderPlace };