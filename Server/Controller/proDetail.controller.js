const pro_detailModel = require("../Model/product_detail");

const product_detailsPost = async (req, res) => {
    try {
        // console.log(req.body,"KKKKKKKKKKKK");
        const { product_name, price, qty, size, description, brand_name, cid } = req.body;
        // console.log(cid,"KKKKKKKKKKKKKK");

        var arrImage = [];

        for (let i = 0; i < req.files.length; i++) {
            arrImage[i] = req.files[i].filename;
        }

        const data = await pro_detailModel.create({
            product_name: product_name,
            price: price,
            qty: qty,
            size: size,
            image: arrImage,
            description: description,
            brand_name: brand_name,
            cid: cid
        });
        // console.log(data)
        res
            .status(200)
            .send({ message: "Product Add successfully..!! ", data: data });
    } catch (error) {
        // console.log(error,"DDDDDDDDDDDDDDd");
        res.status(401).send(error);
    }
};

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
const product_detailsGet1 = async (req, res) => {
    try {
        const pipelineData = [];
        console.log(req.body, "bodyyyy");
        // if (Object.keys(req.body).length > 0) {
        //     let searchQuery = {
        //         $match: {}
        //     }
        //     if (req.body.search != undefined &&
        //         req.body.search != null &&
        //         req.body.search != "")
        //         {
        //             searchQuery.$match.$or=[{
        //                 { product_name :{}},
        //             }]
        //         }
        // }
       
        const data = await pro_detailModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

const filterData = (req, res) => {
    try {
        console.log(req.body, "body::::::::::");

        // if (req.body.price != "All") {
        //     const priceData = req.body.price.split('-')
        // }

        const priceData = req.body.price.split("-");
        console.log(priceData, "priceData::::");

        productModel
            .aggregate([
                
                {
                    $lookup: {
                        from: "categries",
                        localField: "cid",
                        foreignField: "_id",
                        as: "cid",
                    },
                },
                // {
                //     $unwind: "$cat_id"
                // },
                
           
                {
                    $match: {
                        $and: [
                            {
                          
                                price: { $gte: parseInt(priceData[0]) },
                                price: { $lte: parseInt(priceData[1]) },
                            },
                        ],
                    },
                },
            ])
            .exec((error, result) => {
                console.log(result, "result::::::");
                console.log(error, "error:::::::::::");
                if (result?.length > 0) {
                    res.send({ status: 1, result: result, message: "Product List" });
                } else {
                    res.send({ status: 0, result: [], message: "Product Not Found" });
                }
            });
    } catch (error) {
        console.log(error);
    }
};
const productGet = (req, res) => {
    try {
        productModel.aggregate([
            {
                $lookup: {
                    from: "subcategries",
                    localField: "sub_c_id",
                    foreignField: "_id",
                    as: "sub_cat_id"
                },

            },
            // {
            //     $unwind: "$sub_c_id"
            // },
            {
                $lookup: {
                    from: "categries",
                    localField: "cat_id",
                    foreignField: "_id",
                    as: "cat_id"
                },

            },
            {
                $unwind: "$cat_id"
            },
            {
                $lookup: {
                    from: "sizeattributes",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "size_id"
                },

            },
            // {
            //     $unwind: "$size_id"
            // },
            {
                $lookup: {
                    from: "colorattributes",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "color_id"
                },

            },
            // {
            //     $unwind: "$color_id"
            // },
            {
                $lookup: {
                    from: "productmedias",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "p_image"
                },

            },
            // {
            //     $unwind: "$p_image"
            // },
        ]).exec((error, result) => {
            if (result) {
                res.send(result)
            } else {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error);
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
        // .populate("uid")

        // console.log(data, "!!!!!!!!!1");

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
    categoryProduct
};