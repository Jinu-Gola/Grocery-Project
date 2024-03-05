const subcateModel = require("../Model/subcategory.js")

const subcatAdd = async (req, res) => {
    try {
        const { c_id, subcname } = req.body
        // console.log(c_id,subcname)
        // console.log("helloo");
        if (subcname) {
            console.log("this is sub-category already exist..");
        }
        const data = await subcateModel.create({
            c_id: c_id,
            subcname: subcname,
            // images: img
        })
        res.status(200).send({ message: "Sub-Category Added Successfully", data: data })
    } catch (error) {
        res.status(401).send(error);

    }
}

const subcatFind = async (req, res) => {
    try {
        const data = await subcateModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const subcatUpd = async (req, res) => {
    try {

        const { c_id, subcname } = req.body;
        const id = req.params.id;
        // console.log(id);
        const data = await subcateModel.findByIdAndUpdate(id, {
            c_id: c_id,
            subcname: subcname,

        })

        res.send(data);
    } catch (error) {
        res.send(error)
    }
}

const subcatDelete = async (req, res) => {
    try {
        const data = await subcateModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}



module.exports = { subcatAdd, subcatFind, subcatUpd, subcatDelete }