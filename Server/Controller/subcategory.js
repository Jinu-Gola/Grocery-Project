// const cateModel = require("../Model/category.js")
const subcateModel = require("../Model/subcategory.js")

const subcatAdd = async (req, res) => {
    try {
        // console.log(req,"subcname");
        const { subcname ,c_id} = req.body
        // console.log("!!!!!!!!!!!!",subcname)
        // console.log("helloo");
        // if (subcname) {
        //     console.log("this is sub-category already exist..");
        // }
        const data = await subcateModel.create({
            c_id: c_id,
            subcname: subcname,
            // images: img
        })
        // console.log(data);
        res.status(200).send({ message: "Sub-Category Added Successfully", data: data })
    } catch (error) {
        res.status(401).send(error);

    }
}

const subcatFind = async (req, res) => {
    try {
        const data = await subcateModel.find().populate("c_id");
        res.send(data)
        console.log(data,"dataaa...");
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


//Find Subcategory From Particular category
const findCategorywise = async (req, res) => {
    try {
        let query = {};

        if (req.params.cid) {
            query.cid = req.params.cid;
        }
        console.log(req.params.cid, "scid");
            const data = await subcateModel
            .find(query)
            .populate("s_cid")

        // console.log("Query:", { product_name: { $regex: keyword, $options: "i" } });
        console.log("Data:", data);

        res.status(200).send({ message: "Success", data: data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};
const subcatDelete = async (req, res) => {
    try {
        const data = await subcateModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}



module.exports = { subcatAdd, subcatFind, subcatUpd, subcatDelete, findCategorywise }