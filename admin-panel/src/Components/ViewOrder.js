import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
function ViewOrder() {
    const navigate = useNavigate();

    var token = localStorage.getItem("token");
    const [profiles, setProfiles] = useState("")
    useEffect(() => {

        if (!token) {
            navigate('/')
        }
        else {
            profile();
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

    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
        ordersGet();
    }, [])

    const ordersGet = async () => {
        try {
            await axios.post("http://localhost:8080/get-order").then((result) => {
                // console.log("next")
                // console.log("api data", result)
                setOrderData(result?.data.data)
                // console.log("data", data)
            })


        } catch (error) {
            console.log(error)
        }
    }

    // const [orderData, setOrderData] = useState([]);
    const [search, setSearch] = useState({
        search: null,
        // date: null,
    });
    // const login_list = JSON.parse(localStorage.getItem('user'));

    // const ordersGet = async () => {

    //     await axios.post("http://localhost:8080/get-order").then((result) => {
    //         // console.log("next")
    //         // console.log("api data", result)
    //         setOrderData(result?.data)
    //         console.log("data", result)
    //         console.log("ordersssss",orderData);
    //     })
    //     // console.log(search, 'searchvalue');
    //     // // const result = await getorderadmin(data);
    //     // console.log(result, 'resultresult');
    //     // setOrderData(result);
    // };

    // const dispatchOrderFun = async (order_id) => {
    //     const result = await dispatchorder(order_id);

    //     if (result.status == 1) {
    //         successNotify('Order is out of delivery.....');
    //     }
    //     let reload = false;
    //     setTimeout(() => {
    //         if (!reload) {
    //             window.location.reload();
    //             reload = true;
    //         }
    //     }, 5000);
    // };

    useEffect(() => {
        ordersGet();
    }, []);

    // const column = [
    //     {
    //         name: 'ORDER ID',
    //         selector: (row, index) => index + 1,
    //     },
    //     {
    //         name: 'ORDER AMOUNT',
    //         selector: (row) => row.order.total_amt,
    //     },
    //     {
    //         name: 'DISCOUNT',
    //         selector: (row) => row.order.discount,
    //     },

    //     {
    //         name: 'DEPOSITE REFUND',
    //         selector: (row) => row.order.refunddeposite,
    //     },

    //     // {
    //     //   name: "TRANSCATION ID",
    //     //   selector: (row) => row.order.transction_id,
    //     // },
    //     {
    //         name: 'ORDER DATE',
    //         selector: (row) => row.order.order_date,
    //     },
    //     {
    //         name: 'DISPACTH ORDER',
    //         cell: (row) => (
    //             <>
    //                 {/* {console.log(row._id, "rowwwwwwwwwwwwww")} */}

    //                 {/* <button
    //                     type='button'
    //                     className='btn btn-warning align-item-center'
    //                     onClick={() => {
    //                         dispatchOrderFun(row.order._id);
    //                     }}>
    //                     <i className='fas fa-shipping-fast'></i>
    //                 </button> */}
    //             </>
    //         ),
    //     },
    // ];

    // const tablestyle = {
    //     headCells: {
    //         style: {
    //             fontSize: '15px',
    //             color: 'black',
    //             fontWeight: 'bold',
    //         },
    //     },
    // };

    // const expandDetails = ({ data }) => {
    //     let orderdata = [];
    //     orderdata.push(data.order);
    //     return (
    //         <>
    //             <h6
    //                 className='text-primary text-capitalize ps-3'
    //                 style={{ padding: '10px', fontSize: '13px' }}>
    //                 <b>
    //                     <u>Oder Detial:</u>
    //                 </b>{' '}
    //             </h6>

    //             {/* <div className='row'> */}
    //             <div className='row'>
    //                 <div className='col-1'></div>
    //                 <div className='col-11'>
    //                     <table>
    //                         <tr>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>Product Name</th>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>Color</th>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>Size</th>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>Price</th>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>User Qauntity</th>
    //                             <th style={{ paddingRight: '110px', fontSize: '12px' }}>Total Amount</th>
    //                         </tr>
    //                         {data.details.map((data) => {
    //                             return (
    //                                 <>
    //                                     <tr>
    //                                         <td style={{ fontSize: '12px' }}>{data.product.product_name}</td>
    //                                         <td style={{ fontSize: '12px' }}>{data.color_code}</td>
    //                                         <td style={{ fontSize: '12px' }}>{data.size_name}</td>
    //                                         <td style={{ fontSize: '12px' }}>{data.price}</td>
    //                                         <td style={{ fontSize: '12px' }}>{data.user_qty}</td>
    //                                         <td style={{ fontSize: '12px' }}>{data.total_tot}</td>
    //                                     </tr>
    //                                 </>
    //                             );
    //                         })}
    //                     </table>
    //                 </div>
    //             </div>

    //             <h6
    //                 className='text-primary text-capitalize ps-3'
    //                 style={{ padding: '10px', fontSize: '13px', paddingTop: '20px' }}>
    //                 <b>
    //                     <u>User information:</u>
    //                 </b>{' '}
    //             </h6>

    //             {orderdata?.map((data) => {
    //                 return (
    //                     <>
    //                         <div className='row'>
    //                             <div className='col-1'></div>
    //                             <div className='col-3 ms-0 pt-0'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>User Id : </b> <span>{data.u_id}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-2'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>User name : </b> <span>{data.u_name}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-3 ms-0 pt-0'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Email : </b> <span>{data.email}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-2'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Phone : </b> <span>{data.phone}</span>
    //                                 </label>
    //                             </div>
    //                             {/* <div className='col-2'>
    //                             <label className='text-dark' style={{ fontSize: "12px" }} ><b>Flat No: </b> <span>Nidhi</span></label>
    //                         </div> */}
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col-1'></div>
    //                             <div className='col-3 ms-0 pt-0'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Address :</b> <span>{data.address.address}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-2'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Flat no : </b> <span>{data.address.f_no}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-3 ms-0 pt-0'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Pincode : </b> <span>{data.address.pincode}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-2'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>City : </b> <span>{data.address.city}</span>
    //                                 </label>
    //                             </div>
    //                             {/* <div className='col-2'>
    //                             <label className='text-dark' style={{ fontSize: "12px" }} ><b>Flat No: </b> <span>Nidhi</span></label>
    //                         </div> */}
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col-1'></div>
    //                             <div className='col-3 ms-0 pt-0'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>State : </b> <span>{data.address.state}</span>
    //                                 </label>
    //                             </div>
    //                             <div className='col-2'>
    //                                 <label
    //                                     className='text-dark'
    //                                     style={{ fontSize: '12px' }}>
    //                                     <b>Country :</b> <span>{data.address.country}</span>
    //                                 </label>
    //                             </div>
    //                         </div>
    //                     </>
    //                 );
    //             })}
    //             {/* </div> */}
    //             <hr
    //                 style={{
    //                     height: '2px',
    //                     borderWidth: '0',
    //                     color: 'gray',
    //                     backgroundColor: 'gray',
    //                 }}
    //             />
    //         </>
    //     );
    // };


    const expandDetails = () => {
        // let orderdata = [];
        // orderdata.push(data.order);
        return (
                <>
                <h6
                    className='text-primary text-capitalize ps-3'
                    style={{ padding: '10px', fontSize: '13px' }}>
                    <b>
                        <u>Oder Detial:</u>
                    </b>{' '}
                </h6>

                {/* <div className='row'> */}
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-11'>
                        <table>
                            <tr>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Product Name</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Color</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Size</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Price</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>User Qauntity</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Total Amount</th>
                            </tr>

                        </table>
                    </div>
                </div>
                </>
            )
    }

    
    const handelSearch = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };
                return (
                <div>
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
                                        <ul className="navbar-nav w-100">
                                            <li className="nav-item">
                                                <form className="nav-link mt-3 mt-md-0  d-lg-flex search">
                                                    <input type="text" className="form-control mr-2" onChange={handelSearch} placeholder="Search..." />
                                                    <input
                                                        type='date'
                                                        id='txtDate'
                                                        className='form-control mr-2'
                                                        name='date'
                                                        value={search.date}
                                                        onChange={handelSearch}
                                                        style={{ width: '300px', marginRight: 0 }}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='btn btn-warning mr-2'
                                                        onClick={() => {
                                                            ordersGet(search);
                                                            // setDeleteopen(true);
                                                            // setproductData(row);
                                                        }}>
                                                        {' '}
                                                        <i className='mdi mdi-magnify'></i>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn btn-warning mr-2'
                                                        onClick={() => {
                                                            setSearch({ search: "", date: "" });
                                                            ordersGet({ search: null, date: null });
                                                            // setDeleteopen(true);
                                                            // setproductData(row);
                                                        }}>
                                                        {' '}
                                                        <i className='mdi mdi-close'></i>
                                                    </button>
                                                </form>
                                            </li>
                                        </ul>
                                        <div className="row">

                                            <div class="col-lg-12 grid-margin stretch-card align-center">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <h4 class="card-title">All Orders</h4>
                                                        {/* <p class="card-description"> Add class <code>.table-hover</code>
                                                </p> */}
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>

                                                                        <th>ORDER ID</th>
                                                                        <th>ORDER AMOUNT</th>
                                                                        <th>DISCOUNT</th>
                                                                        <th>TRANSCATION ID</th>
                                                                        <th>ORDER DATE</th>
                                                                        <th>DISPACTH ORDER</th>
                                                                        <th>ORDER DETAIL</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {orderData?.map((item, index) => (
                                                                        <tr>

                                                                            <td> {item._id}</td>
                                                                            <td> {item.total_amt}</td>
                                                                            <td> {item.discount}</td>
                                                                            <td> {item.transaction_id}</td>
                                                                            <td> {item.order_date}</td>
                                                                            <td> <button type="button" className="btn btn-warning" style={{ marginLeft: "40px" }}  ><i className='mdi mdi-ambulance'></i></button></td>
                                                                            <td> <button type="button" className="btn btn-warning" style={{ marginLeft: "40px" }} onClick={expandDetails()} ><i className='mdi mdi-eye'></i></button></td>


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
                </div>
                );
}

                export default ViewOrder;
