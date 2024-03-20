import React, { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
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

    const [formdata, setFormdata] = useState({
        image: [],
        name: '',
        price: '',
        qty: '',
        size: '',
        description: '',
        brand_name: '',
        cid: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getItem();
    }, []);

    const show = () => {
        toast.success("Product Updated Successfully", {
            position: "top-center"
        });
    };

    const getItem = async () => {
        try {
            console.log("get item")
            const response = await axios.get("http://localhost:8080/oneproduct/" + id);


            console.log(response);
            // setFormdata(response.data);
            setFormdata({
                image: response.data.image[0],
                name: response.data.product_name,
                price: response.data.price,
                qty: response.data.qty,
                size: response.data.size,
                description: response.data.description,
                brand_name: response.data.brand_name,
                cid: response.data.cid
            })
            console.log("data set")
        } catch (error) {
            console.log("error : " + error);
        }
    }
    const handleChange = (e) => {

        setFormdata({ ...formdata, [e.target.name]: e.target.value })
        console.log("changed")
    }

    const imageChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formdata);


        try {
            const response = await axios.put(`http://localhost:8080/updproduct/${id}`, {
                'image': formdata.image,
                'product_name': formdata.name,
                'price': formdata.price,
                'qty': formdata.qty,
                'size': formdata.size,
                'description': formdata.description,
                'brand_name': formdata.brand_name,
                'cid': formdata.cid
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Data : ", response.data);
            if (response.status == 200) {
                show();
                // alert('Product Update successfully')
                navigate('/productlist')
            }
        } catch (error) {
            console.log("error : ", error)
        }

    }

    // For category id display on dropdownlist
    const [categ, setCateg] = useState([])
    useEffect(() => {
        display();
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

    return (
        <>

            <ToastContainer />
            <div className="container-scroller">
                <Sidebar />
                <div className="container-fluid page-body-wrapper">
                    <Navbar />
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Update Product Form</h4>
                                <h2 className="card-description">Update Product </h2><br />

                                <form className="forms-sample" onSubmit={handleSubmit}>

                                    <div className="text-center">
                                        <img height="100px" width="100px" src={`http://localhost:8080/images/${formdata.image}`} />
                                    </div>
                                    <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="image" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input type="file" className="form-control file-upload-info" name="image" onChange={imageChange} />
                                            {/* <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span> */}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="product_name">Product Name</label>
                                        <input type="text" className="form-control" name="name" value={formdata.name} onChange={handleChange} />
                                    </div>

                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label for="size">Product Size</label>
                                                <input type="text" class="form-control" name="size" value={formdata.size} />
                                            </div>
                                            <div class="col">
                                                <label for="price">Product Price</label>
                                                <input type="text" class="form-control" name="price" placeholder="Product Price" value={formdata.price} onChange={handleChange} />
                                            </div>
                                            <div class="col">
                                                <label for="qty">Product Qty</label>
                                                <input type="text" class="form-control" name="qty" placeholder="Product Qty" value={formdata.qty} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col">
                                                <label htmlFor="brand_name">Product Brand_Name</label>
                                                <input type="text" className="form-control" name="brand_name" placeholder="Product Brand Name" value={formdata.brand_name} onChange={handleChange} />
                                            </div>
                                            <div class="col">
                                                <label for="cid">Product Category Id</label>
                                                <select class="form-control" value={formdata.cid} onChange={handleChange}>
                                                    {categ.map((item, index) => (
                                                        <option class="dropdown-header" value={item._id} > {item.cname}</option>
                                                    ))}
                                                </select>
                                                {/* <input type="text" class="form-control" name="cid" placeholder="Product Category ID" value={formdata.cid} onChange={handleChange} /> */}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="desc">Description</label>
                                        <textarea className="form-control" name="description" placeholder="Description" value={formdata.description} onChange={handleChange} />
                                    </div>

                                    <button type="submit" className="btn btn-primary mr-2" >Update</button>
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

export default UpdateProduct