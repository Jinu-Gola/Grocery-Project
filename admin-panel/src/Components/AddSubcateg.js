import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddSubcategory() {
    const navigate = useNavigate()
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

    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/login");
                alert("Token is expired ");
            }
            else {
                setProfiles(res.data);
                console.log("admin =" + res.data.isAdmin)
            }
        } catch (error) {
            console.log("profile err", error);
        }
    }

    const [subcname, setSubCname] = useState("");
    const [cid, setCid] = useState("");


    // const [submit, setSubmit] = useState(false);
    const data = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData()
            formData.append('subcname', subcname)
            formData.append('c_id', cid)

            // console.log(formData)

            const res = await axios.post("http://localhost:8080/subcat", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (res.status == 200) {
                navigate('/sub-categorylist')
            }
            console.log("axios data:", res.data)

        } catch (error) {
            console.error(error);
        }




    }

    return (
        <>

            <div className="container-scroller">
                {/* partial:partials/_sidebar.html */}
                <Sidebar />
                {/* partial */}
                <div className="container-fluid page-body-wrapper">
                    {/* partial:partials/_navbar.html */}
                    <Navbar />
                    {/* partial */}

                    {/* main-panel ends */}
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Add Sub-Category Form</h4>
                                <h2 className="card-description">Add Sub-Category </h2><br />
                                <form className="forms-sample">
                                    <div className="form-group">
                                        <label htmlFor="scname">Sub-Category Name</label>
                                        <input type="text" className="form-control" id="scname" placeholder="Product Name" />
                                    </div>

                                    {/* <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span>
                                        </div>
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="cid">Category Id</label>
                                        <input type="text" className="form-control" id="cid" placeholder="Category Id" />
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

export default AddSubcategory
