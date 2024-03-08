import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ViewSubCateg() {
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

    const [data, setData] = useState([]);
    useEffect(() => {
        display();
    }, [])

    const display = async () => {
        try {
            const subData = await axios.get("http://localhost:8080/subcat").then((result) => {
               
                setData(result?.data)
                // console.log(setData);
                console.log("data", subData)
            })


        } catch (error) {
            console.log(error)
        }
    }

    const delSubcat = async (id) => {
        try {
            console.log("delete id ", id);

            const result = await axios.delete("http://localhost:8080/subcat/" + id);
            console.log("Sub-category deleted..")

            display();
        } catch (error) {
            console.log("Error : " + error)
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
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">

                                <div class="col-lg-10 grid-margin stretch-card align-center">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">All Sub-Categories</h4>
                                            {/* <p class="card-description"> Add class <code>.table-hover</code>
                                                </p> */}
                                            <div class="table-responsive">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            {/* <th>User</th> */}
                                                            <th>Sub-Categories</th>
                                                            <th>Category</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr>
                                                                {/* <td>Jacob</td> */}
                                                                <td> {item.subcname}</td>
                                                                <td> {item.c_id}</td>

                                                                {/* <td class="text-danger"> 28.76% <i class="mdi mdi-arrow-down"></i></td> <button type="button" className="btn btn-success"  >Edit</button> */}
                                                                <td><button type="button" className="btn btn-danger" onClick={() => delSubcat(item._id)} >Delete</button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>






                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>

    )
}

export default ViewSubCateg 