// const mongoose=require("mongoose");
const { contactModel } = require("../Model/contact.js");

const contPost = async (req, res) => {
    try {
        const { name,email, mobile, subject,message } = req.body
        const data = await contactModel.create({
            name: name,
            email:email,
            mobile: mobile,
            message: message,
            subject:subject

        })
        console.log(data);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}
const contGet = async (req, res) => {
    const data = await contactModel.find()
    res.send(data);
}

const contDel = async (req, res) => {
    const id = req.params.id;
    const data = await contactModel.findByIdAndDelete(id);
    res.send(data);
}


module.exports = {
    contPost,
    contDel,
    contGet
};