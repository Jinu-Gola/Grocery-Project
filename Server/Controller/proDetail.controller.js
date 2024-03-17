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
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        const data = await pro_detailModel.find();
        res.send(data);
    } catch (error) {
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