const { default: mongoose } = require("mongoose");
const pro_detailModel = require("../Model/product_detail");

// const product_detailsPost = async (req, res) => {
//     try {
//         // console.log(req.body,"KKKKKKKKKKKK");
//         const { product_name, price, qty, size, description, brand_name, cid } = req.body;
//         // console.log(cid,"KKKKKKKKKKKKKK");

//         var arrImage = [];

//         for (let i = 0; i < req.files.length; i++) {
//             arrImage[i] = req.files[i].filename;
//         }

//         const data = await pro_detailModel.create({
//             product_name: product_name,
//             price: price,
//             qty: qty,
//             size: size,
//             image: arrImage,
//             description: description,
//             brand_name: brand_name,
//             cid: cid
//         });
//         // console.log(data)
//         res
//             .status(200)
//             .send({ message: "Product Add successfully..!! ", data: data });
//     } catch (error) {
//         // console.log(error,"DDDDDDDDDDDDDDd");
//         res.status(401).send(error);
//     }
// };

const product_detailsGet = async (req, res) => {
    try {
        // const minPrice = req.query.minPrice;
        // const maxPrice = req.query.maxPrice;
        // if (minPrice && maxPrice) {
        //     query.price = { $gte: minPrice, $lte: maxPrice };
        // } else if (minPrice) {
        //     query.price = { $gte: minPrice };
        // } else if (maxPrice) {
        //     query.price = { $lte: maxPrice };
        // }

        const data = await pro_detailModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

const product_detailsPost = async (req, res) => {
    try {
        // Check if required fields are present in the request body
        const requiredFields = ['product_name', 'price', 'qty', 'size', 'description', 'brand_name', 'cid','s_cid'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${ missingFields.join(', ') }` });
    }

    // Check if price and qty are valid numbers
    if (isNaN(parseFloat(req.body.price)) || isNaN(parseInt(req.body.qty))) {
        return res.status(400).send({ error: 'Price and quantity must be valid numbers.' });
    }

    // Check if qty is a positive integer
    if (parseInt(req.body.qty) <= 0 || !Number.isInteger(parseInt(req.body.qty))) {
        return res.status(400).send({ error: 'Quantity must be a positive integer.' });
    }

    // Process the request if all validations pass
    var arrImage = [];
    for (let i = 0; i < req.files.length; i++) {
        arrImage[i] = req.files[i].filename;
    }

    const data = await pro_detailModel.create({
        product_name: req.body.product_name,
        price: req.body.price,
        qty: req.body.qty,
        size: req.body.size,
        image: arrImage,
        description: req.body.description,
        brand_name: req.body.brand_name,
        cid: req.body.cid,
        s_cid:req.body.s_cid
    });

    res.status(200).send({ message: "Product added successfully.", data: data });
    console.log(data,"data...");
} catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
}
};

// const product_detailsGet1 = async (req, res) => {
//     try {
//         const pipelineData = [];
//         // console.log(req.body, "bodyyyy");
//         if (Object.keys(req.body).length > 0) {
//             let searchQuery = {
//                 $match: {}
//             };
//             if (req.body.search != undefined &&
//                 req.body.search != null &&
//                 req.body.search != "") {
//                     // console.log("in product search...");
//                 searchQuery.$match.$or = [
//                     { product_name: { $regex: new RegExp(req.body.search, 'i') } },
//                     { description: { $regex: new RegExp(req.body.search, 'i') } },
//                     { price: isNaN(req.body.search) ? null : parseFloat(req.body.search) },

//                 ];

//             }
//             if (req.body.cid != undefined &&
//                 req.body.cid != null &&
//                 req.body.cid != "") {
//                 searchQuery.$match.cid = mongoose.Types.ObjectId(req.body.cid);

//             }
//             if (req.body.start_price != undefined &&
//                 req.body.end_price != undefined &&
//                 req.body.start_price != "" &&
//                 req.body.end_price != "") {
//                 searchQuery.$match.price = {
//                     $gte: parseFloat(req.body.start_price),
//                     $lte: parseFloat(req.body.start_price)

//                 }

//             }
//             pipelineData.push(searchQuery);
//         }
        
//         // console.log(pipelineData,"pipelineData");
//         // console.log(searchQuery,"searchQuery");
//         const pipeline = [
//             ...pipelineData,
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "cid",
//                     foreignField: "_id",
//                     as: "cid"
//                 },
//             },
//             { $skip: skip }, { $limit: req.body.perPage }

//         ];
//         console.log(pipeline,"pipelinee");

//         // let totProduct = 0
//         // const data = await pro_detailModel.aggregate([...pipelineData, {
//         //     $count: "_id"
//         // }]).then((res) => {
//         //     console.log(res, "responsesss");
//         //     totProduct = res[0]._id
//         // }).catch((error) => {
//         //     console.log(error, "errrrr");
//         // })

//         pro_detailModel.aggregate(pipeline).exec((err, result) => {
//             if (result) {
//                 res.send({ data: result })
//                 // console.log(result,"productttt");
//             } else {
//                 res.status(401).send("Filter Product Not Found")
//                 // console.log(err,"error");
//             }
//         })
//         // res.send(data);

//     }
//     catch (error) {
//         res.send(error, "errorrr");
//     }
// }


const product_detailsGet1 = async (req, res) => {
    try {

        // const pipelineData = [];
        console.log(req.body,"bodyyyy");
        // console.log(req.body.search,"searchvalue");
        console.log(req.body, isNaN(req.body.search),req.body.search, "req");



        pro_detailModel.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "cid",
                    foreignField: "_id",
                    as: "cid"
                },

            },

 ]).exec((error, result) => {
     if (result) {
         res.send(result)
     } else {
         console.log(error);
     }
 })


        // const pipelineData = [];
        // console.log(req.body,"bodyyyy");
        // console.log(req.body.search,"searchvalue");

        // if (Object.keys(req.body).length > 0) {
        //     console.log(Object.keys(req.body).length,"lemgthhh");
        //     let searchQuery = {
        //         $match: {}
        //     };
        //     // if (req.body.search != undefined &&
        //     //     req.body.search != null &&
        //     //     req.body.search != "") {
        //     //     searchQuery.$match.$or = [
        //     //         { product_name: { $regex: new RegExp(req.body.search, 'i') } },
        //     //         { description: { $regex: new RegExp(req.body.search, 'i') } },
        //     //         { price: isNaN(req.body.search) ? null : parseFloat(req.body.search) },
        //     //     ];
        //     // }
        //     // if (req.body.cid != undefined &&
        //     //     req.body.cid != null &&
        //     //     req.body.cid != "") {
        //     //     searchQuery.$match.cid = mongoose.Types.ObjectId(req.body.cid);
        //     // }
        //     // if (req.body.start_price != undefined &&
        //     //     req.body.end_price != undefined &&
        //     //     req.body.start_price != "" &&
        //     //     req.body.end_price != "") {
        //     //     searchQuery.$match.price = {
        //     //         $gte: parseFloat(req.body.start_price),
        //     //         $lte: parseFloat(req.body.end_price) // Corrected here: using end_price instead of start_price
        //     //     };
        //     // }
        //     pipelineData.push(searchQuery);
        // }
// console.log(pipelineData,"pipeline data");
//         const pipeline = [
//             ...pipelineData
//             // {
//             //     $lookup: {
//             //         from: "categories",
//             //         localField: "cid",
//             //         foreignField: "_id",
//             //         as: "cid"
//             //     },
//             // },
//             // { $skip: skip }, { $limit: req.body.perPage }
//         ];
//         console.log(pipeline,"pipeline data");

//         pro_detailModel.aggregate(pipeline).exec((err, result) => {
//             if (result) {
//                 res.send({ data: result });
//             } else {
//                 res.status(401).send("Filtered Products Not Found");
//             }
//         });
    }
    catch (error) {
        res.send(error);
    }
}





const product_detailsPut = async (req, res) => {
    try {
        var img = [];

        for (let i = 0; i < req.files.length; i++) {
            img[i] = req.files[i].filename;
            // console.log("img[" + i +"]" + img[i] );
        }
        const id = req.params.id;
        // const { product_name, price, qty, size, description, brand_name } = req.body;

        console.log(id);
        const data = await pro_detailModel.findByIdAndUpdate(id, {
            product_name: req.body.product_name,
            price: req.body.price,
            qty: req.body.qty,
            image: img,
            size: req.body.size,
            description: req.body.description,
            brand_name: req.body.brand_name,
            cid: req.body.cid,
            s_cid:req.body.s_cid
        })
        console.log(data);
        res.send(data)
    } catch (error) {
        res.send(error);
    }
};

const product_detailsDelete = async (req, res) => {
    try {
        const data = await pro_detailModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const oneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const oneProduct = await pro_detailModel.findOne({ _id: id })
        res.send(oneProduct)
        // res.send(oneProduct);
    } catch (error) {
        // res.status(401).send(error)
        console.log("error", error)
    }

}

const categoryProduct = async (req, res) => {
    try {
        let query = {};
        // const minPrice = req.query.minPrice;
        // const maxPrice = req.query.maxPrice;

        // if (minPrice && maxPrice) {
        //     query.price = { $gte: minPrice, $lte: maxPrice };
        // } else if (minPrice) {
        //     query.price = { $gte: minPrice };
        // } else if (maxPrice) {
        //     query.price = { $lte: maxPrice };
        // }

        if (req.params.cid) {
            query.cid = req.params.cid;
        }
        // if (req.query.keyword) {
        //     query.$or = [
        //         { product_name: { $regex: req.query.keyword, $options: "i" } },
        //     ];
        // }
        // Search for products containing the keyword in the product_name field
        const data = await pro_detailModel
            .find(query)
            .populate("cid")
    
        // console.log("Query:", { product_name: { $regex: keyword, $options: "i" } });
        // console.log("Data:", data);

        res.status(200).send({ message: "Success", data: data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};




const searchProduct = async (req, res) => {
    try {
        var search = req.body.search;
        const products = await pro_detailModel.find({ product_name: { $regex: search, $options: "i" } })
        res.status(200).send({ message: "products find...", data: products })
    } catch (error) {
        res.send(error)
    }
}



module.exports = {
    product_detailsPost,
    product_detailsGet,
    product_detailsPut,
    product_detailsDelete,
    oneProduct,
    searchProduct,
    categoryProduct,
 
    product_detailsGet1
};