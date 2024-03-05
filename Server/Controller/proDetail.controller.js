const pro_detailModel = require("../Model/product_detail");

const product_detailsPost = async (req, res) => {
    try {
        const { product_name, price, qty, size, description, brand_name,cid } = req.body;

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
            cid:cid
        });

        res
            .status(200)
            .send({ message: "Product Add successfully..!! ", data: data });
    } catch (error) {
        res.status(401).send(error);
    }
};

const product_detailsGet = async (req, res) => {
    try {
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

        // console.log(id);
        const data = await pro_detailModel.findByIdAndUpdate(id, {
            product_name: req.body.product_name,
            price: req.body.price,
            qty: req.body.qty,
            image: img,
            size: req.body.size,
            description: req.body.description,
            brand_name: req.body.brand_name,
            cid:req.body.cid,
        })
        // console.log(data);
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
    } catch (error) {
        // res.status(401).send(error)
        console.log("error", error)
    }

}
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
    searchProduct
};