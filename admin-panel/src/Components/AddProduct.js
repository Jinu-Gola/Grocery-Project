
import React, { useState,useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    var token = localStorage.getItem("token");
    const [profiles,setProfiles]=useState("")
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

    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/");
                alert("Token is expired ");
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
    const[cid,setCid]=useState("")
    // const[submit,setSubmit]=useState(false);
    const navigate = useNavigate();
    const data = async (e) => {

        e.preventDefault();

        try {
            
            const formData = new FormData()
            formData.append('product_name', product_name)
            formData.append('price', price)
            formData.append('qty', qty)
            formData.append('image', image)
            formData.append('size', size)
            formData.append('description', description)
            formData.append('brand_name', brand_name)
            formData.append('cid',cid)
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


    return (
        <>

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
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label for="size">Product Size</label>
                                                <input type="text" class="form-control" id="size" placeholder="Product Size" value={size} onChange={(e) => setSize(e.target.value)} />
                                            </div>
                                            <div class="col">
                                                <label for="price">Product Price</label>
                                                <input type="text" class="form-control" id="price" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                            <div class="col">
                                                <label for="qty">Product Qty</label>
                                                <input type="text" class="form-control" id="qty" placeholder="Product Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label htmlFor="brand_name">Product Brand_Name</label>
                                                <input type="text" className="form-control" id="brand_name" placeholder="Product Brand Name" value={brand_name} onChange={(e) => setbrand_name(e.target.value)} />
                                            </div>
                                            <div class="col">
                                                <label for="cid">Product Category Id</label>
                                                <input type="text" class="form-control" id="cid" placeholder="Product Category ID" value={cid} onChange={(e) => setCid(e.target.value)} />
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
                                    </div>

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