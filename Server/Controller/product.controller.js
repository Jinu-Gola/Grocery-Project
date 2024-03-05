const productModel = require("../Model/product")

const addProduct = async (req, res) => {
    console.log(req.body);
    // console.log(req)
    // try {
    //     const { pname, p_b_id, desc} = req.body
    //     var img = [];

    //     for (let i = 0; i < req.files.length; i++) {
    //         img[i] = req.files[i].filename;
    //         // console.log("img[" + i +"]" + img[i] );
    //     }
    //     const data = await productModel.create({
    //         pname: pname,
    //         p_b_id: p_b_id,
    //         desc: desc,
    //         images: img
    //     })
    //     res.send({ message: "Product Add Successfully",data:data });
    // } catch (error) {
    //     res.status(401).send(error);
    // }

        try {
            const { pname, p_b_id, desc } = req.body;
            const img = req.files.map((file) => file.filename); // Directly create array of filenames

            const data = await productModel.create({
                pname,
                p_b_id,
                desc,
                images: img,
            });

            res.status(201).send({ message: "Product Added Successfully", data }); // Use 201 for created
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(400).send({ message: "Error adding product", error }); // Use 400 for bad request
        }



}
const productGet = async (req, res) => {
    try {
        const data = await productModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const productUpd = async (req, res) => {
    try {
        var img = [];

        for (let i = 0; i < req.files.length; i++) {
            img[i] = req.files[i].filename;
            // console.log("img[" + i +"]" + img[i] );
        }
        const {pname,p_b_id,desc}=req.body
        const id = req.params.id;
        const data = await productModel.findByIdAndUpdate(id, {
            pname: pname,
            p_b_id: p_b_id,
            desc: desc,
            images: img
        })
        console.log(data)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const productDel = async (req, res) => {
    try {
        const data = await productModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}


module.exports = { addProduct, productGet, productUpd, productDel }