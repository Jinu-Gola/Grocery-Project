const pro_priceModel = require("../Model/productPrice")

const addProPrice = async (req, res) => {
    try {
        const { p_id, p_unit_id, price, qty, unit_qty } = req.body
        
        const data = await pro_priceModel.create({
            p_id: p_id,
            p_unit_id: p_unit_id,
            price: price,
            qty: qty,
            unit_qty: unit_qty
           
        })
        res.status(200). send({ message: "Product wise Price & Size Add Successfully" ,data:data});
    } catch (error) {
        res.status(401).send(error);
    }
}
const proPriceGet = async (req, res) => {
    try {
        const data = await pro_priceModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const proPriceUpd = async (req, res) => {
    try {
       
        const { p_id, p_unit_id, price, qty, unit_qty}=req.body
        const id = req.params.id;
        const data = await pro_priceModel.findByIdAndUpdate(id, {
            p_id: p_id,
            p_unit_id: p_unit_id,
            price: price,
            qty: qty,
            unit_qty: unit_qty
        })
        console.log(data)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const proPriceDel = async (req, res) => {
    try {
        const data = await pro_priceModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}


module.exports = { addProPrice, proPriceGet, proPriceUpd, proPriceDel }