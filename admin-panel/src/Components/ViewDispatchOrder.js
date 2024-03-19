import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function ViewDispatchOrder() {
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
            await axios.post("http://localhost:8080/get-dispatch").then((result) => {
                console.log("next")
                console.log("api data", result)
                setData(result?.data.data)
                console.log("data", result?.data)
            })


        } catch (error) {
            console.log(error)
        }
    }

    const cancelOrder = async (id) => {
        try {
            // console.log("delete id ", id);

            const result = await axios.delete("http://localhost:8080/cancel-order/" + id);
            console.log("product deleted..")

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

                                <div class="col-lg-12 grid-margin stretch-card align-center">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">All Dispatch Oder</h4>
                                            {/* <p class="card-description"> Add class <code>.table-hover</code>
                                                </p> */}
                                            <div class="table-responsive">
                                                <table class="table ">
                                                    <thead>
                                                        <tr>
                                                            <th>ORDER ID</th>
                                                            <th>USER NAME</th>
                                                            <th>MOBILE NO.</th>
                                                            <th>TOTAL AMOUNT</th>
                                                            <th>DISCOUNT</th>
                                                            <th>TRANSCATION ID</th>
                                                            <th>ORDER DATE</th>
                                                            <th>CANCEL ORDER</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((item, index) => (
                                                            <tr>
                                                                {/* <td>Jacob</td> */}
                                                                {/* <td> {item._id}</td> */}
                                                                <td> {item._id}</td>
                                                                <td> {item.fname+" "+item.lname}</td>
                                                                <td> {item.mobile}</td>
                                                                <td> {item.total_amt}</td>
                                                                <td> {item.discount}</td>
                                                                <td> {item.transaction_id}</td>
                                                                <td> {item.order_date}</td>
                                                                <td>
                                                                    <button
                                                                        type='button'
                                                                        className='btn btn-danger' style={{ marginLeft: "30px" }}
                                                                        onClick={() => cancelOrder(item._id)} 
                                                                    >
                                                                        <i className='mdi mdi-cancel'></i>
                                                                    </button>
                                                                </td>

                                                                {/* <td class="text-danger"> 28.76% <i class="mdi mdi-arrow-down"></i></td> <button type="button" className="btn btn-success"  >Edit</button>
                                                                <td> <button type="button" className="btn btn-danger" onClick={() => cancelOrder(item._id)} >Delete</button></td> */}
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

export default ViewDispatchOrder