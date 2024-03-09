const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")


;
app.use(cors({ config: '*' }));

const multer = require("multer");
const path = require("path");
app.use("/images", express.static("./images"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "./images"), (err) => {
            if (err) {
                throw err;
            }
        });
    },
    filename: (req, file, cb) => {
        const name = file.originalname;
        // console.log(name);
        cb(null, name, (error, success) => {
            if (error) {
                console.log(error)
            }
        })
    }
})
const upload = multer({ storage: storage });

const db = require("./Database/db")
const verifyToken = require("./Middleware/useAutho.js");
const decodeToken = require("./Middleware/decodeToken.js")
const userModel = require("./Controller/regi.controller.js")
// const contactModel = require("./Controller/cnt.controller")

const cateModel = require("./Controller/categ.controller.js")
const subcateModel = require("./Controller/subcategory.js")
// const productModel=require("./Controller/product.controller.js")
const pro_detailModel = require('./Controller/proDetail.controller.js')
const cartModel = require("./Controller/cart.controller.js")
const payment=require('./Controller/payment.controller.js')
// const { config } = require("process");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// User Registration and Login API
app.post("/regis", userModel.usepost)
app.get("/regis", verifyToken, userModel.useget)
app.put("/regis/:id", userModel.useput)
app.delete("/regis/:id", userModel.usedelete)
app.post("/login", userModel.loginUser)
// app.get("/profile/:id", userModel.profile)
app.get("/auth/:tok", userModel.auth)

// app.post("/insertsubcat", subcateModel.subcatAdd)

//cart api
app.post("/addcart", cartModel.cartPost)
app.get("/getcart", cartModel.cartGet)
app.get("/getone/:id", cartModel.getOneCart)
app.delete("/deletecart/:id", cartModel.cartDelete)



// Sub-category API
app.post("/subcat", upload.none(), subcateModel.subcatAdd)
app.get("/subcat", subcateModel.subcatFind)
app.put("/subcat/:id", subcateModel.subcatUpd)
app.delete("/subcat/:id", subcateModel.subcatDelete)

// Categories API
app.post("/categ", upload.none(), cateModel.categPost)
app.get("/categ", cateModel.categGet)
app.put("/categ/:id", cateModel.categPut)
app.delete("/categ/:id", cateModel.categDelete)
app.get("/one-cat/:id", cateModel.oneCategory)


//product-Detail API
app.post("/addproduct", upload.array("image"), pro_detailModel.product_detailsPost);
app.get("/getproduct", pro_detailModel.product_detailsGet);
app.put("/updproduct/:id", upload.array("image"), pro_detailModel.product_detailsPut);
app.delete("/delproduct/:id", pro_detailModel.product_detailsDelete);
app.get("/oneproduct/:id", pro_detailModel.oneProduct)
app.get("/category/:cid", pro_detailModel.categoryProduct)
// app.get("/getproduct/:id", pro_detailModel.product_detailsGet);

app.get("/search-product", pro_detailModel.searchProduct)


// Product API
// app.post("/product", upload.array("images"), productModel.addProduct)
// app.get("/product", productModel.productGet)
// app.put("/product/:id", verifyToken, upload.array("images"), productModel.productUpd)
// app.delete("/delproduct/:id", productModel.productDel)


// Product Brand API
// app.post("/pro-brand", verifyToken, brandModel.addBrand)
// app.get("/pro-brand", verifyToken, brandModel.brandGet)
// app.put("/pro-brand/:id", verifyToken, brandModel.brandUpd)
// app.delete("/pro-brand/:id", verifyToken, brandModel.brandDel)

// Product Unit API
// app.post("/pro-unit", verifyToken, unitModel.addUnit)
// app.get("/pro-unit", verifyToken, unitModel.unitGet)
// app.put("/pro-unit/:id", verifyToken, unitModel.unitUpd)
// app.delete("/pro-unit/:id", verifyToken, unitModel.unitDel)

// Product product price size API
// app.post("/pro-price", verifyToken, pro_priceModel.addProPrice)
// app.get("/pro-price", verifyToken, pro_priceModel.proPriceGet)
// app.put("/pro-price/:id", verifyToken, pro_priceModel.proPriceUpd)
// app.delete("/pro-price/:id", verifyToken, pro_priceModel.proPriceDel)


// Contact API
// app.post("/cont", contactModel.contPost)
// app.get("/cont/:id", verifyToken, contactModel.contGet)
// app.delete("/cont/:id", contactModel.contDel)

// payment api
app.post("/orders",payment.orders)
app.post('/verify',payment.verfiy)


app.listen(8080);




