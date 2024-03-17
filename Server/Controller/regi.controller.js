const regModel = require("../Model/user.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = '#jin@l#gol@'
const nodemailer = require('nodemailer')


const usepost = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        // if (!name.match(/[a-z]/ || /[A-Z]/)) {
        //     res.status(400).send({ Message: "Name must be only latters" })
        // }

        // const user = await regModel.findOne({ email: email })
        // if (user) {
        //     alert('Email Already Exist..Try another one..!');
        // }
        const pass = await bcrypt.hash(password, 10);
        const data = await regModel.create({
            name: name,
            email: email,
            mobile: mobile,
            password: pass,
            // age: req.body.age,
            // address: req.body.address,
            // gender: req.body.gender,

        })
        if (data) {
            res.status(200).send({ status: 1, message: "Signup Successful", data: data });
        } else {
            res.status(401).send("SignUp UnSuccessfull");
        }
        // const data = await regModel.create(req.body);
        // res.send(data);

    } catch (error) {
        res.send(error);

    }
}

const useget = async (req, res) => {
    const data = await regModel.find();
    res.send(data);
}



const useput = async (req, res) => {
    const id = req.params.id;
    const data = await regModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        // address: req.body.address,
        // gender: req.body.gender,
        // age: req.body.age,

    })
    res.send(data);
}

const usedelete = async (req, res) => {
    const data = await regModel.findByIdAndDelete(req.params.id);
    res.send(data);
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await regModel.findOne({ email: email })
        // console.log(user,"Email");

        if (user) {
            const pass = await bcrypt.compare(password, user.password);
            // console.log(pass,"password");
            if (pass) {
                const token = jwt.sign({ _id: user._id, email: user.email, user }, secretkey, {
                    expiresIn: 2 * (60 * 60),
                });
                res.status(200).send({ Message: "User Login Successfully", data: user, token: token, uid: user._id })
            } else {
                res.status(401).send({ Message: "Password is invalid..." });
            }
        } else {
            res.status(401).send({ Message: "Email is Invalid..." });
        }

    } catch (error) {
        // res.send(error);
        res.send({ message: "Password and Email both are invalid.." });
    }
}


const sendotp = async (req, res) => {
    try {
        console.log(req.body, "Email");
        // const { email } = req.body;
        const _otp = Math.floor(100000 + Math.random() * 900000);
        console.log(_otp, "OTP");
        let user = await regModel.findOne({ email: req.body.email });
        // send to user mail
        // console.log("---------->", user);
        if (!user) {
            res.send({ code: 500, message: "user not found" });
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jinalgola@gmail.com",
                pass: "vcjlvreyonpufzqw",
            },
        });

        let info = await transporter.sendMail({
            from: "jinalgola@gmail.com",
            to: req.body.email, // list of receivers
            subject: "OTP", // Subject line
            text: String(_otp),
            html: `<h1>${_otp}</h1>
      <h4>Please Verify And Do Not Share This OTP</h4>
       `,
        });

        if (info.messageId) {
            // console.log(info, 84);
            regModel
                .updateOne({ email: req.body.email }, { otp: _otp })
                .then((result) => {
                    res.send({ code: 200, message: "otp send" });
                })
                .catch((err) => {
                    res.send({ code: 500, message: "Server err" });
                });
        } else {
            res.send({ code: 500, message: "Server err" });
        }
    } catch (error) {
        res.send(error);
    }
};

const submitotp = async (req, res) => {
    console.log(req.body.otp, "ooooooooooo");
    const otp = req.body.otp;
    console.log(otp,"oppppppptt");
    regModel
        .findOne({ otp: otp })
        .then(async (result) => {
        //  update the password
        console.log(result, "rrrrrrrrrrrrrr");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        regModel
            .updateOne({ email: result.email }, { password: hashedPassword })
            .then((result) => {
                res.send({ code: 200, message: "Password updated" });
            })
            .catch((err) => {
                res.send({ code: 500, message: "Server err" });
            });
    })
    .catch((err) => {
        res.send({ code: 500, message: "otp is wrong" });
    });
}
const auth = async (req, res) => {
    try {
        const tok = req.params.tok;
        // console.log("token ",tok)
        if (!tok) {
            return res.send("please login first");
        }
        else {
            jwt.verify(tok, secretkey, async (err, decode) => {
                try {
                    if (err) {
                        console.log(err);
                        res.send("Token is expired ")
                    }
                    var _id = decode._id;
                    const find = await regModel.findOne({ _id: _id });
                    res.send(find);
                } catch (error) {
                    console.log(error)
                }
            })
        }
    } catch (error) {
        console.log("profile error=>" + error);
    }
}



module.exports = {
    usepost,
    useget,
    useput,
    usedelete,
    loginUser,
    auth,
    sendotp,
    submitotp
    // profile

}




