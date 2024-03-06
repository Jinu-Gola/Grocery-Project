import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AddSubcateg() {
    const navigate = useNavigate();

    // For Verify the token
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


    // For Add Sub-Category
    const [subcname, setSubCname] = useState("");
    // const [cid, setCid] = useState("");

    const dataSub = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()
            formData.append('subcname', subcname)
            // formData.append('c_id', cid)
            // console.log(subcname,)

            const res = await axios.post("http://localhost:8080/subcat", formData )
            if (res.status == 200) {
                navigate('/sub-categorylist')
            }
            console.log("axios data:", res.data)

        } catch (error) {
            console.error(error);
        }
    }
  

    // For category id display on dropdownlist
    const [data, setData] = useState([])
    useEffect(() => {
        display();
    }, [])

    const display = async () => {
        try {
            await axios.get("http://localhost:8080/categ").then((result) => {
                // console.log("next")
                // console.log("api data", result)
                setData(result?.data)
                // console.log("data", data)
            })


        } catch (error) {
            console.log(error)
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
                                <form className="forms-sample" onSubmit={dataSub}>
                                    <div className="form-group">
                                        <label htmlFor="subcname">Sub-Category Name</label>
                                        <input type="text" className="form-control" id='subcname' value={subcname} name='subcname' onChange={(e) => setSubCname(e.target.value)} placeholder="Sub-Category Name" />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="cid">Category Id</label>
                                        <select class="form-control" value={cid} onChange={(e) => setCid(e.target.value)}>
                                            {data.map((item, index) => (
                                                <option class="dropdown-header" value={item._id} > {item.cname}</option>
                                            ))}
                                        </select>
                                        <input type="text" className="form-control" id='cid' value={cid} name='cid' onChange={(e) => setCid(e.target.value)}  placeholder="Category Id" />
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

export default AddSubcateg