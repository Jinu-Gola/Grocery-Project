const unitModel = require("../Model/unit")

const addUnit = async (req, res) => {
    try {
        const { unit_name } = req.body

        const data = await unitModel.create({
            unit_name: unit_name
        })
        console.log(data,"Unit Product")
        res.status(200). send({ message: "unit Add Successfully", data: data });
    } catch (error) {
        res.status(401).send(error);
    }
}
const unitGet = async (req, res) => {
    try {
        const data = await unitModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const unitUpd = async (req, res) => {
    try {

        // const {unit_name}=req.body
        const id = req.params.id;
        const data = await unitModel.findByIdAndUpdate(id, {
            unit_name: req.body.unit_name,

        })
        console.log(data)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const unitDel = async (req, res) => {
    try {
        const data = await unitModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}


module.exports = { addUnit, unitGet, unitUpd, unitDel }