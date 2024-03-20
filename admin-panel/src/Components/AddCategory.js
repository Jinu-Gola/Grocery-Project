import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'

function AddCategory() {
    const navigate = useNavigate();
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
    const wish_alerts = () => {
        toast.success("Category Added Successfully...", {
            position: "top-center"
        });
    };
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

    const [cname, setCname] = useState("");
    // const [image, setImages] = useState();

    const data = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData()
            formData.append('cname', cname)
            // formData.append('images', image)

            console.log(formData)

            const res = await axios.post("http://localhost:8080/categ", formData)
            if (res.status == 200) {
                navigate('/categorylist')
                wish_alerts()
            }
            console.log("axios data:", res.data)

        } catch (error) {
            console.error(error);
        }




    }



    return (
        <>
            <ToastContainer />
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
                                <h4 className="card-title">Add Category Form</h4>
                                <h2 className="card-description">Add Category </h2><br />
                                <form className="forms-sample" onSubmit={data}>
                                    <div className="form-group">
                                        <label htmlFor="cname">Category Name</label>
                                        <input type="text" className="form-control" value={cname} name='cname' onChange={(e) => setCname(e.target.value)} id="cname" placeholder="Category Name" />
                                    </div>
                                    {/* <div className="form-group">
                                        <label>File upload</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group col-xs-12">
                                            <input type="file" className="form-control file-upload-info" placeholder="Upload Image" onChange={(e) => setImages(e.target.files[0])} />
                                            {/* <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                            </span> 
                                        </div>
                                    </div> */}


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

export default AddCategory
