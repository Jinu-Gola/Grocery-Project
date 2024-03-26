
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'

function AddProduct() {
    var token = localStorage.getItem("token");
    const [profiles, setProfiles] = useState("")
    useEffect(() => {

        if (!token) {
            navigate('/')
            // alert("Please Login First..!")
        }
        else {
            profile();
            // data();

        }
    }, [])
    const wishs_alerts = () => {
        toast.error("Token is Expired...!", {
            position: "top-center"
        });
    };
    const wish_alerts = () => {
        toast.success("Product Added Successfully...", {
            position: "top-center"
        });
    };
    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/");
                // alert("Token is expired ");
                wishs_alerts()
            }
            else {
                setProfiles(res.data);
                console.log("admin =" + res.data.isAdmin)
            }
        } catch (error) {
            console.log("profile err", error);
        }
    };

    const [product_name, setProduct_name] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [image, setImages] = useState();
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [brand_name, setbrand_name] = useState("");
    const [cid, setCid] = useState("")
    const[subCid,setSubCid]=useState("")
    // const[submit,setSubmit]=useState(false);
    const navigate = useNavigate();
    // const data = async (e) => {
        
    //     e.preventDefault();
        
    //     console.log("cid", cid);
    //     try {

    //         const formData = new FormData()
    //         formData.append('product_name', product_name)
    //         formData.append('price', price)
    //         formData.append('qty', qty)
    //         formData.append('image', image)
    //         formData.append('size', size)
    //         formData.append('description', description)
    //         formData.append('brand_name', brand_name)
    //         formData.append('cid', cid)
    //         // console.log(formData)

    //         const res = await axios.post("http://localhost:8080/addproduct", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         })
    //         if (res.status == 200) {
    //             navigate('/productlist')
    //             wish_alerts()
    //         }
    //         console.log("axios data:", res.data)

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    const [fieldErrors, setFieldErrors] = useState({
        product_name: "",
        price: "",
        qty: "",
        size: "",
        description: "",
        brand_name: "",
        cid: "",
        subCid:"",
        commonError: ""
    });

    const data = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!product_name) {
            errors.product_name = "Product name is required.";
        }
        if (!price) {
            errors.price = "Price is required.";
        } else if (isNaN(parseFloat(price))) {
            errors.price = "Price must be a valid number.";
        }
        if (!qty) {
            errors.qty = "Quantity is required.";
        } else if (isNaN(parseInt(qty)) || parseInt(qty) <= 0) {
            errors.qty = "Quantity must be a positive integer.";
        }
        if (!size) {
            errors.size = "Size is required.";
        } else if (isNaN(parseFloat(size))) {
            errors.size = "Size must be a valid number.";
        }
        if (!description) {
            errors.description = "Description is required.";
        }
        if (!brand_name) {
            errors.brand_name = "Brand name is required.";
        }
        if (!cid) {
            errors.cid = "Category ID is required.";
        }
        if (!subCid) {
            errors.cid = "Sub-Category ID is required.";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors({ ...errors, commonError: "Please fill all fields." });
            return;
        }




        try {
            // console.log("try part")
            // const res = await axios.post('http://localhost:8080/product', {
            //     'pname': pname,
            //     'desc': desc,
            //     'p_b_id': brandid,
            //     'images': img
            // },{
            //     headers:{
            //         "Content-Type":"multipart/form-data"
            //     }
            // })

            const formData = new FormData()
            formData.append('product_name', product_name)
            formData.append('price', price)
            formData.append('qty', qty)
            formData.append('image', image)
            formData.append('size', size)
            formData.append('description', description)
            formData.append('brand_name', brand_name)
            formData.append('cid', cid)
            formData.append('s_cid',subCid)
            // console.log(formData)

            const res = await axios.post("http://localhost:8080/addproduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.status == 200) {
                navigate('/productlist')
            }
            console.log("axios data:", res.data)
        } catch (error) {
            console.error(error);
        }




    }

    // For category id display on dropdownlist
    const [categ, setCateg] = useState([])
    useEffect(() => {
        display();
        // subCategory()
    }, [])

    const display = async () => {
        try {
            await axios.get("http://localhost:8080/categ").then((result) => {
                // console.log("next")
                // console.log("api data", result)
                setCateg(result?.data)
                // console.log("data", data)
            })


        } catch (error) {
            console.log(error)
        }
    }

 
    const [subcat, setSubcat] = useState([])
    // const subCategory = async () => {
    //     try {
    //         await axios.get("http://localhost:8080/subcat").then((result) => {
               
    //             setSubCat(result?.data)
               
    //         })


    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const subCategory = async (categoryId) => {
        try {
            if (categoryId) {
                const res = await axios.get(`http://localhost:5000/sub-category/${categoryId}`);
                setSubcat(res?.data.data);
                console.log(res.data);
            } else {
                setSubcat([]); // Reset subcategories when no category is selected
            }
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    }


    const handleCategoryChange=(e)=>{
        const selectedCid=e.target.value;
        setCid(selectedCid)
        subCategory(selectedCid)

    }
    return (
        <>
            <ToastContainer/>
            <div className="container-scroller">
                <Sidebar />
                <div className="container-fluid page-body-wrapper">
                    <Navbar />
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Product Form</h4>
                                <h2 className="card-description">Add Product </h2><br />

                                <form className="forms-sample" onSubmit={data}>
                                    <div className="form-group">
                                        <label htmlFor="product_name">Product Name</label>
                                        <input type="text" className="form-control" id="product_name" placeholder="Product Name" value={product_name} onChange={(e) => setProduct_name(e.target.value)} />
                                        <span className="text-danger">{fieldErrors.product_name}</span>

                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label for="size">Product Size</label>
                                                <input type="text" class="form-control" id="size" placeholder="Product Size" value={size} onChange={(e) => setSize(e.target.value)} />
                                                <span className="text-danger">{fieldErrors.size}</span>

                                            </div>
                                            <div class="col">
                                                <label for="price">Product Price</label>
                                                <input type="text" class="form-control" id="price" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                <span className="text-danger">{fieldErrors.price}</span>

                                            </div>
                                            <div class="col">
                                                <label for="qty">Product Qty</label>
                                                <input type="text" class="form-control" id="qty" placeholder="Product Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
                                                <span className="text-danger">{fieldErrors.qty}</span>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label htmlFor="brand_name">Product Brand_Name</label>
                                                <input type="text" className="form-control" id="brand_name" placeholder="Product Brand Name" value={brand_name} onChange={(e) => setbrand_name(e.target.value)} />
                                            
                                                <span className="text-danger">{fieldErrors.brand_name}</span>
                                            </div>
                                            {/* <div class="col">
                                                <label for="cid">Product Category </label>
                                                <select class="form-control" value={cid} onChange={(e) => { setCid(e.target.value)}}>
                                                    <option class="dropdown-header" value={0} >Select Category</option>
                                                    {categ.map((item, index) => (
                                                        <option class="dropdown-header" value={item._id} > {item.cname}</option>
                                                    ))}
                                                </select>
                                                <span className="text-danger">{fieldErrors.cid}</span>

                                                {/* <input type="text" class="form-control" id="cid" placeholder="Product Category ID" value={cid} onChange={(e) => setCid(e.target.value)} /> 
                                            </div> */}
                                            <div class="col">
                                                <label for="cid">Product Category </label>
                                                <select class="form-control" value={cid} onChange={handleCategoryChange}>
                                                    <option class="dropdown-header" value={0} >Select Category</option>
                                                    {categ.map((item, index) => (
                                                        <option class="dropdown-header" key={item._id} value={item._id} > {item.cname}</option>
                                                    ))}
                                                </select>
                                                <span className="text-danger">{fieldErrors.cid}</span>

                                                {/* <input type="text" class="form-control" id="cid" placeholder="Product Category ID" value={cid} onChange={(e) => setCid(e.target.value)} /> */}
                                            </div>
                                            <div class="col">
                                                <label for="cid">Product Sub-Category </label>
                                                <select class="form-control" value={subCid} onChange={(e) => { setSubCid(e.target.value) }} disabled={!cid}>
                                                    <option class="dropdown-header" value={0} >Select Sub-Category</option>
                                                    {subcat.map((item, index) => (
                                                        <option class="dropdown-header" key={item._id} value={item._id} > {item.subcname}</option>
                                                    ))}
                                                </select>
                                                <span className="text-danger">{fieldErrors.subCid}</span>

                                                {/* <input type="text" class="form-control" id="cid" placeholder="Product Category ID" value={cid} onChange={(e) => setCid(e.target.value)} /> */}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input type="file" className="form-control file-upload-info" placeholder="Upload Image" onChange={(e) => setImages(e.target.files[0])} />
                                            {/* <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span> */}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="desc">Description</label>
                                        <textarea className="form-control" id="desc" rows={4} defaultValue={""} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                   
                                        <span className="text-danger">{fieldErrors.description}</span>
                                    </div>
                                    <span className="text-danger">{fieldErrors.commonError}</span>
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                    <button className="btn btn-dark">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* partial:partials/_footer.html */}
                    <Footer />
                    {/* partial */}
                </div>
                {/* page-body-wrapper ends */}
            </div>



        </>
    )
}

export default AddProduct