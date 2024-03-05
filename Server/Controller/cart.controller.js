const cartModel = require("../Model/cart");

const cartPost = async (req, res) => {
    try {
        const { u_id, p_id, qty } = req.body;

        // var arrImage = [];

        // for (let i = 0; i < req.files.length; i++) {
        //     arrImage[i] = req.files[i].filename;
        // }

        const data = await cartModel.create({
            u_id: u_id,
            p_id: p_id,
            qty: qty
        });

        res
            .status(200)
            .send({ message: "Cart Add successfully..!! ", data: data });
    } catch (error) {
        res.status(401).send(error);
    }
};

const cartGet = async (req, res) => {
    try {
        const data = await cartModel.find();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}



const cartDelete = async (req, res) => {
    try {
        const data = await cartModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

const getOneCart = async (req, res) => {
    try {
        const id = req.params.id;
        const oneCart = await cartModel.findOne({ _id: id })
        res.send(oneCart)
    } catch (error) {
        // res.status(401).send(error)
        console.log("error", error)
    }

}


module.exports = {
    cartPost,
    cartGet,
    cartDelete,
    getOneCart
}