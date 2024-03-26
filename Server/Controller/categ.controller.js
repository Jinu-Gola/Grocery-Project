const cateModel = require("../Model/category.js");

// const categPost = async (req, res) => {
//     try {
//         const cname = req.body.cname;

//         // var img = [];

//         // for (let i = 0; i < req.files.length; i++) {
//         //     img[i] = req.files[i].filename;
//         //     // console.log("img[" + i +"]" + img[i] );
//         // }
//         // if (cname) {
//         //     res.send({ message: "This category already exits..." });
//         // }
//         // console.log(img)
//         const data = await cateModel.create({
//             cname: cname,
//             // images: img
//         })
//         res.status(200).send({ message: "Category Added Successfully", data: data })
//         // console.log(data);
//         // res.send(data);
//     } catch (error) {
//         res.status(401).send(error)
//     }
// }

const categPost = async (req, res) => {
    try {
        const { cname } = req.body;

        // Check if cname is empty or consists only of whitespace characters
        if (!cname || !cname.trim()) {
            return res.status(400).send({ error: "Category name is required." });
        }

        // Check if cname length is between 3 and 50 characters
        if (cname.trim().length < 3 || cname.trim().length > 50) {
            return res.status(400).send({ error: "Category name must be between 3 and 50 characters." });
        }

        // If all validations pass, proceed to create the category
        const data = await cateModel.create({ cname });

        res.status(200).send({ message: "Category Add Successfully...!!!", data:data });
    } catch (error) {
        res.status(401).send(error);
    }
};


const categGet = async (req, res) => {
    try {
        const data = await cateModel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const categPut = async (req, res) => {
    try {

       
        const id = req.params.id;
        const data = await cateModel.findByIdAndUpdate(id, {
            cname: req.body.cname,
            // images:img
        })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}



const categDelete = async (req, res) => {
    try {
        const data = await cateModel.findByIdAndDelete(req.params.id);
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}

const oneCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const oneCategory = await cateModel.findOne({ _id: id })
        res.send(oneCategory)
    } catch (error) {
        // res.status(401).send(error)
        console.log("error", error)
    }

}


module.exports = {
    categGet,
    categPost,
    categPut,
    categDelete, oneCategory
}