import React, { useState, useEffect } from 'react'
import Header from './Header'
import Search from './Search'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// import {useRazorpay} from 'react-razorpay';



function Billing() {
    const navigate = useNavigate();
    var token = localStorage.getItem("token");

    const [userData, setuserData] = useState({
        fname: "",
        lname: "",
        address: "",
        mobile: "",
        email: "",


    });

    const [cartitem, setCartItem] = useState([])
    const [cartTotal, setCartTotal] = useState(0);
    const [profiles, setProfiles] = useState("")
    const [formerror, setformerror] = useState({});


    // const [inputs, setInputs] = useState({})
    const [err, setErr] = useState("")


    // const handleChange = (e) => {
    //     const name = e?.target?.name;
    //     const value = e?.target?.value;
    //     setInputs({ ...inputs, [name]: value })
    // }


    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log(userData, "hhhhhhhhhhhhiiiiiiiiiiiiiiiii");
        // hadelpayment(userData)

        // var userId = localStorage.getItem("user")
        // var total = Number(totalPrice())

        // console.log(userData);
        // const data2 = axios.post('http://localhost:8080/check-out', {
        //     fname: userData.fname,
        //     lname: userData.lname,
        //     address: userData.address,
        //     mobile: userData.mobile,
        //     email: userData.email,
        //     // order_date: moment.orderdate,
        //     uid: userId,
        //     order_status: 0,
        //     // transaction_id: response.razorpay_payment_id,
        //     total_amt: parseInt(total),
        //     subtotal: parseInt(total),
        //     discount: 0,

        // })
        // console.log(data2, "alll dataaaaa");

        const error = {}
        const emailpattern = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,4}$/
        const namepattern = /^[a-zA-Z\s]{2,50}$/;
        const phonepattern = /^[0-9]{10,}$/;


        if (!userData.fname) {
            error.fname = "Name is required!"
        }
        else if (!namepattern.test(userData.fname)) {
            error.fname = "Please Enter valid name"
        }

        if (!userData.lname) {
            error.lname = "Name is required!"
        }
        else if (!namepattern.test(userData.lname)) {
            error.lname = "Please Enter valid name"
        }

        if (!userData.email) {
            error.email = "Email is required!"
        }
        else if (!emailpattern.test(userData.email)) {
            error.email = "Please Enter valid email address"
        }

        if (!userData.mobile) {
            error.mobile = "Phone number is required!"
        }
        else if (!phonepattern.test(userData.mobile)) {
            error.mobile = "Please Enter valid phone number"
        }

        if (!userData.city) {
            error.city = "Phone number is required!"
        }
        else if (!phonepattern.test(userData.city)) {
            error.city = "Please Enter valid phone number"
        }

        if (!userData.country) {
            error.country = "Phone number is required!"
        }
        else if (!namepattern.test(userData.country)) {
            error.country = "Please Enter valid phone number"
        }

        if (!userData.pincode) {
            error.pincode = "Phone number is required!"
        }
        else if (!phonepattern.test(userData.pincode)) {
            error.pincode = "Please Enter valid phone number"
        }

        if (!userData.address) {
            error.address = "Phone number is required!"
        }
        else if (!namepattern.test(userData.address)) {
            error.address = "Please Enter valid phone number"
        }


        return error;
    }

    const handleChange = (e) => {
        // console.log(e.target.value, "KKKKKKK");
        setuserData({ ...userData, [e.target.name]: e.target.value })
    }
    // console.log(userData, "hhhhhhhhhhhhiiiiiiiiiiiiiiiii");



    const cart_list = JSON.parse(localStorage.getItem('cartlist'))
    // const login_list = JSON.parse(localStorage.getItem('user'))




    // useEffect(() => {
    //     // const user_id = login_list === null ? "" : login_list[0]?.email

    //     const data = cart_list?.filter((data) => data.uid === login_list)
    //         .map((datas) => {
    //             return datas
    //         })
    //     //   cartitem(data)
    // }, []);


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        profile();
        cartList();
        totalPrice();
    }, [])


    const cartList = async () => {
        let cartlist = [];
        cartlist = JSON.parse(localStorage.getItem('cartlist'))
        setCartItem(cartlist)
    }

    const totalPrice = () =>
        cartitem?.reduce((total, item) => parseInt(total) + (parseInt(item.uqty) * parseInt(item.price)), 0)



    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/login");
                // alert("Token is expired ");
            }
            else {
                setProfiles(res.data);
                // console.log("admin =" + res.data.isAdmin)
            }
        } catch (error) {
            console.log("profile err", error);
        }
    };



    const hadelpayment = (e) => {
        // console.log("HandlePaymenttttttttttttttttttt");
        // const Razorpay = useRazorpay();
        setformerror(handleSubmit(userData));
        e.preventDefault()
        const user_id = localStorage.getItem('user')
        // console.log(user_id, "uuuuuuu");
        var total = Number(totalPrice())
        var options = {
            key: "rzp_test_8VysNy7EGQyYhF", // Enter the Key ID generated from the Dashboard
            amount: parseInt(total) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "SuperGrocy",
            description: "Test Transaction",
            order_id: "", //This is a sample Order ID. Pass the id obtained in the response of Step 1
            handler: function (response) {
                console.log("response", response);
                // let object = {
                //     orderInfo: {
                //         uid: user_id,
                //         fname: userData.fname,
                //         lname: userData.lname,
                //         address: userData.address,
                //         mobile: userData.mobile,
                //         email: userData.email,
                //         transaction_id: response.razorpay_payment_id,
                //         order_id: response.razorpay_order_id,
                //         total_amt: parseInt(total),
                //         subtotal: parseInt(total),
                //         discount: 0,

                //     },
                //     orderDetail: cartitem
                // }

                const order_id = response.razorpay_order_id;
                const object = {
                    orderInfo: {
                        uid: user_id,
                        fname: userData.fname,
                        lname: userData.lname,
                        address: userData.address,
                        mobile: userData.mobile,
                        email: userData.email,
                        transaction_id: response.razorpay_payment_id,
                        order_id: order_id, // Setting the order_id obtained from Razorpay
                        total_amt: parseInt(total),
                        subtotal: parseInt(total),
                        discount: 0,
                    },
                    orderDetail: cartitem
                };
                console.log(cartitem, "dddddddddddddddddd");
                console.log(object, 'LLLLLLLLLLLLL');
                axios.post('http://localhost:8080/check-out', object).then((res) => {
                    if (res.status === 200) {
                        console.log("if condition", res)
                        localStorage.removeItem("cartlist");

                        cartList()
                        navigate('/');
                    }
                    else {
                        console.log("else condition", res);
                    }
                })



            },
            theme: {
                "color": "#81c408"
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Checkout</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to='/' style={{ color: "white" }}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to='' style={{ color: "white" }}>Pages</Link></li>
                    <li className="breadcrumb-item active text-white">Checkout</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Checkout Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Billing details</h1>
                    <form onSubmit={hadelpayment}>
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">First Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name='fname' value={userData.fname} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Last Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name='lname' value={userData.lname} onChange={handleChange} required />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-item">
                                    <label className="form-label my-3">Company Name<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div> */}
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="House Number Street Name" name='address' value={userData.address} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">City<sup>*</sup></label>
                                    <input type="text" className="form-control" name='city' value={userData.city} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Country<sup>*</sup></label>
                                    <input type="text" className="form-control" name='country' value={userData.country} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Poincode<sup>*</sup></label>
                                    <input type="text" className="form-control" name='pincode' value={userData.pincode} onChange={handleChange} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input type="tel" className="form-control" name='mobile' value={userData.mobile} onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address<sup>*</sup></label>
                                    <input type="email" className="form-control" name='email' value={userData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-check my-3">
                                    <input type="checkbox" className="form-check-input" id="Account-1" name="Accounts" defaultValue="Accounts" />
                                    <label className="form-check-label" htmlFor="Account-1">Create an account?</label>
                                </div>
                                <hr />
                                <div className="form-check my-3">
                                    <input className="form-check-input" type="checkbox" id="Address-1" name="Address" defaultValue="Address" />
                                    <label className="form-check-label" htmlFor="Address-1">Ship to a different address?</label>
                                </div>
                                {/* <div className="form-item">
                                    <textarea name="text" className="form-control" spellCheck="false" cols={30} rows={11} placeholder="Oreder Notes (Optional)" defaultValue={""} />
                                </div> */}
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartitem && cartitem?.map((item, index) => {
                                                let p_total = parseInt(item?.uqty) * parseInt(item?.price);
                                                return (<tr>
                                                    <th scope="row">
                                                        <div className="d-flex align-items-center mt-2">
                                                            <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid rounded-circle" style={{ width: 90, height: 90 }} alt />
                                                        </div>
                                                    </th>
                                                    <td className="py-5">{item.product_name}</td>
                                                    <td className="py-5">₹{item.price}</td>
                                                    <td className="py-5">{item.uqty}</td>
                                                    <td className="py-5">₹{p_total}</td>
                                                </tr>)
                                            })}
                                    

                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 justify-content-end">
                                    <div className="col-8" />
                                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-8">
                                        <div className="bg-light rounded">
                                            <div className="p-4">
                                                <h3 className=" mb-4">Final <span className="fw-normal">Amount</span></h3>
                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                                    <p className="mb-0">₹{totalPrice()}</p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="mb-0 me-4">Shipping</h5>
                                                    <div className>
                                                        <p className="mb-0">{0}</p>
                                                    </div>
                                                </div>
                                                {/* <p className="mb-0 text-end">Shipping to Ukraine.</p> */}
                                            </div>
                                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                                <h5 className="mb-0 ps-4 me-4">Total</h5>
                                                {/* cartitem!=null?g_Total:item?.reduce(tot,obj)=>parseInt(tot) */}
                                                <p className="mb-0 pe-4">₹{totalPrice()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                               
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4 ">
                                    <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary" >Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* // {/Checkout Page End/} */}
            <Footer />

        </>
    )
}


export default Billing