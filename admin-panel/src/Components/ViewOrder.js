import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import { TextField } from '@mui/material';


function ViewOrder() {
    const navigate = useNavigate();
    // const { id } = useParams()
    // console.log(id,"idddddddddd");

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
    const dispatch_alerts = () => {
        toast.success("Order is Out of Delivery.....", {
            position: "top-center"
        });
    };

    const [orderData, setOrderData] = useState([]);
    // useEffect(() => {
    //     ordersGet();
    // }, [])



    const [searchvalue, setSearchvalue] = useState({
        search: null,
        date: null,
    });

    const ordersGet = async () => {
        // console.log(searchvalue, 'searchvalue');
        const result = await axios.post("http://localhost:8080/get-order", {
            'search': searchvalue
        })
        // console.log(result, 'resultresult');
        setOrderData(result?.data);
    };
    const login_list = JSON.parse(localStorage.getItem('user'));


    const dispatchOrderFun = async (o_id) => {
        console.log(o_id, "order id ");
        const result = await axios.post('http://localhost:8080/dispatch-order/' + o_id);

        if (result.status == 1) {
            dispatch_alerts()
            // successNotify('Order is out of delivery.....');
        }
        let reload = false;
        setTimeout(() => {
            if (!reload) {
                window.location.reload();
                reload = true;
            }
        }, 5000);
    };

    useEffect(() => {
        ordersGet();
    }, []);


    const column = [
        {
            name: 'ORDER ID',
            selector: (row, index) => index + 1,
        },
        {
            name: 'ORDER AMOUNT',
            selector: (row) => row.order.total_amt,
        },
        {
            name: 'DISCOUNT',
            selector: (row) => row.order.discount,
        },
        {
            name: "TRANSCATION ID",
            selector: (row) => row.order.transaction_id,
        },
        {
            name: 'ORDER DATE',
            selector: (row) => row.order.order_date,
        },
        {
            name: 'DISPACTH ORDER',
            cell: (row) => (
                <>
                    {console.log(row.order._id, "rowwwwwwwwwwwwww")}

                    <button
                        type='button'
                        className='btn btn-warning ' style={{ marginLeft: "30px" }}
                        onClick={() => {
                            dispatchOrderFun(row.order._id);
                        }}
                    >
                        <i className='mdi mdi-ambulance'></i>
                    </button>
                </>
            ),
        },
    ];

    console.log(column, "column........");
    const tablestyle = {
        headCells: {
            style: {
                fontSize: '16px',
                color: 'black',
                fontWeight: 'bold',
            },
        },
    };


    const expandDetails = ({ data }) => {
        let orderdata = [];
        orderdata.push(data.order);


        const handelChange = (e) => {
            
        }
        return (
            <>
                <h6
                    className='text-primary text-capitalize ps-3'
                    style={{ padding: '10px', fontSize: '14px' }}>
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
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Price</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>User Qauntity</th>
                                <th style={{ paddingRight: '110px', fontSize: '12px' }}>Total Amount</th>
                            </tr>
                            {data.details.map((data) => {
                                return (
                                    <>
                                        <tr>
                                            <td style={{ fontSize: '12px' }}>{data.product.product_name}</td>
                                            <td style={{ fontSize: '12px' }}>{data.price}</td>
                                            <td style={{ fontSize: '12px' }}>{data.uqty}</td>
                                            <td style={{ fontSize: '12px' }}>{data.total_amt}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </table>
                    </div>
                </div>

                <h6
                    className='text-primary text-capitalize ps-3'
                    style={{ padding: '10px', fontSize: '14px', paddingTop: '20px' }}>
                    <b>
                        <u>User information:</u>
                    </b>{' '}
                </h6>

                {orderdata?.map((data) => {
                    console.log(data, "dataaaaa");
                    return (
                        <>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-3 ms-0 pt-0'>
                                    <label
                                        className='text-dark'
                                        style={{ fontSize: '12px' }}>
                                        <b>User Id : </b> <span>{data.uid}</span>
                                    </label>
                                </div>
                                <div className='col-2'>
                                    <label
                                        className='text-dark'
                                        style={{ fontSize: '12px' }}>
                                        <b>User name : </b> <span>{data.fname + " " + data.lname}</span>
                                    </label>
                                </div>
                                <div className='col-3 ms-0 pt-0'>
                                    <label
                                        className='text-dark'
                                        style={{ fontSize: '12px' }}>
                                        <b>Email : </b> <span>{data.email}</span>
                                    </label>
                                </div>
                                <div className='col-2'>
                                    <label
                                        className='text-dark'
                                        style={{ fontSize: '12px' }}>
                                        <b>Phone : </b> <span>{data.mobile}</span>
                                    </label>
                                </div>
                                {/* <div className='col-2'>
                                    <label
                                        className='text-dark'
                                        style={{ fontSize: '12px' }}>
                                        <b>Address : </b> <span>{data.address}</span>
                                    </label>
                                </div> */}

                            </div>
                            {console.log("looooooog", data)}

                        </>
                    );
                })}
                {/* </div> */}
                <hr
                    style={{
                        height: '2px',
                        borderWidth: '0',
                        color: 'gray',
                        backgroundColor: 'gray',
                    }}
                />
            </>
        );
    };
    // const handelSearch = (e) => {
    //     setSearch({ ...search, [e.target.name]: e.target.value });
    // };

    const handelSearch = (e) => {
        setSearchvalue({ ...searchvalue, [e.target.name]: e.target.value });
    };

    console.log(searchvalue, "searchhhh");

    return (
        <div>
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
                        <div className="main-panel">
                            <div className="content-wrapper">


                                <ul className="navbar-nav w-100">
                                    <li className="nav-item">
                                        <form className="nav-link mt-3 mt-md-0  d-lg-flex search">
                                            <input
                                                type="text"
                                                className="form-control mr-2"
                                                value={searchvalue.search}
                                                onChange={handelSearch}
                                                placeholder="Search"
                                                name='search' />
                                            <input
                                                type='date'
                                                id='txtDate'
                                                className='form-control mr-2'
                                                name='date'
                                                value={searchvalue.date}
                                                onChange={handelSearch}
                                                style={{ width: '300px', marginRight: 0 }}
                                            />
                                            <button
                                                type='button'
                                                className='btn btn-warning mr-2'
                                                onClick={() => {
                                                    ordersGet(searchvalue);
                                                }}>
                                                {' '}
                                                <i className='mdi mdi-magnify'></i>
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-warning mr-2 '
                                                onClick={() => {
                                                    setSearchvalue({ search: "", date: "" });
                                                    ordersGet({ search: null, date: null });

                                                }}>
                                                {' '}
                                                <i className='mdi mdi-close'></i>
                                            </button>
                                        </form>
                                    </li>
                                </ul>
                                <div className="row">

                                    <div class="col-lg-12 grid-margin stretch-card align-center mt-2">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">All Orders</h4>

                                                <div class="table-responsive">
                                                    <DataTable
                                                        class="table"
                                                        data={orderData.result}
                                                        columns={column}
                                                        pagination
                                                        customStyles={tablestyle}
                                                        expandableRows
                                                        expandOnRowClicked
                                                        expandableRowsComponent={expandDetails}

                                                    />
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
