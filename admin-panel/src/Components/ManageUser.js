import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ManageUser() {
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
            await axios.get("http://localhost:8080/getuser").then((result) => {
                // console.log("next")
                // console.log("api data", result)
                setData(result?.data)
                // console.log("data", data)
            })


        } catch (error) {
            console.log(error)
        }
    }

    // const delUser = async (id) => {
    //     try {
    //         console.log("delete id ", id);

    //         const result = await axios.delete("http://localhost:8080/del_user/" + id);
    //         console.log("user deleted..")

    //         display();
    //     } catch (error) {
    //         console.log("Error : " + error)
    //     }
    // }

    // const editProduct = async (id) => {
    //     try {
    //         const result = await axios.put("http://localhost:8080/product" + id);
    //         console.log("product updated..")
    //         display();
    //     } catch (error) {
    //         console.log("Error : " + error)
    //     }
    // }

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
                                            <h4 class="card-title">All Users</h4>
                                            {/* <p class="card-description"> Add class <code>.table-hover</code>
                                                </p> */}
                                            <div class="table-responsive">
                                                <table class="table ">
                                                    <thead>
                                                        <tr>
                                                            <th>User Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile</th>
                                                            {/* <th>Sale</th> */}
                                                            {/* <th>Action</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr>
                                                                {/* <td>Jacob</td> */}
                                                                <td> {item.name}</td>
                                                                <td> {item.email}</td>
                                                                <td> {item.mobile}</td>

                                                                {/* <td class="text-danger"> 28.76% <i class="mdi mdi-arrow-down"></i></td> <button type="button"onClick={() => delUser(item._id)} className="btn btn-success"  >Edit</button>*/}
                                                                {/* <td> <button type="button" className="btn btn-danger"  ></button></td> */}
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

export default ManageUser