import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'
import Footer from './Footer';
import Header from './Header';
import Search from './Search';

function Billing() {
    const [cartitems, setCartitems] = useState([]);
    const [inputs, setInputs] = useState({});
    const [err, setErr] = useState('');
    const [data, setData] = useState();
    const [payid, setPayid] = useState('');
    // 
    const navigat = useNavigate();

    const show = () => {
        toast.success("Network Error", {
            position: "top-center"
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const tok = localStorage.getItem("token");
            if (!tok) {
                navigat('/login');
            } else {
                try {
                    const res = await axios.get(`http://localhost:8080/auth/${tok}`);
                    if (res.data === "Token is expired ") {
                        localStorage.removeItem("token");
                        navigat("/login");
                    } else {
                        setData(res.data);
                        console.log("profile data", data);
                        getcart();
                    }
                } catch (error) {
                    console.log("profile err", error);
                }
            }
        };
        fetchData();
    }, [navigat]);

    const totalcart = () => {
        return cartitems?.reduce((total, item) => total + Number(item.price * item.uqty), 0)
    }

    const getcart = () => {
        const cartlist = JSON.parse(localStorage.getItem("cartlist"));
        console.log("cart ", cartlist)
        setCartitems(cartlist);
        console.log("cart ", cartitems)
    }

    const handelpayment = async (amt) => {
        try {
            // setLoading(true);
            const { data: paymentData } = await axios.post('http://localhost:8080/payment', { amount: amt });
            console.log("payment data", paymentData);
            handelopenrazorpay(paymentData);
        } catch (error) {
            console.log("payment error", error);
        } finally {
            // setLoading(false);
        }
    }

    const handelopenrazorpay = (dat) => {
        if (window.Razorpay) {
            const options = {
                "key": "rzp_test_8VysNy7EGQyYhF", // Enter the Key ID generated from the Dashboard
                "amount": dat.amount / 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": dat.currency,
                "name": "Lapworld",
                "description": "Test Transaction",
                "order_id": dat.id, // This is a sample Order ID. Pass the id obtained in the response of Step 1
                "handler": function (response) {
                    console.log("response", response);
                    setPayid(response.razorpay_payment_id);
                    // setOrid(response.razorpay_order_id);
                    // setSign(response.razorpay_signature);
                    let object = {
                        // orderInfo: {
                            uid: data._id,
                            fname: inputs.fname,
                            lname: inputs.lname,
                            adderss: inputs.adderss,
                            mobile: inputs.mobile,
                            email: inputs.email,
                            transaction_id: response.razorpay_payment_id,
                            total_amt: dat.amount,
                            subtotal: dat.amount,
                            discount: 0,
                            product: cartitems

                        // },
                    }
                    axios.post('http://localhost:8080/verify', { response: response }).then((res) => {
                        if (res.status === 200) {
                            axios.post('http://localhost:8080/check-out', { object });
                            console.log("Order placed successfully");
                            console.log("if condition", res);
                            localStorage.removeItem("cartlist");
                            getcart();
                            navigat('/');
                        } else {

                            console.log("else condition", res);
                        }
                    });
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        else {
            show();
            console.log("please login again")
        }



    }

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (!inputs.fname || !inputs.lname || !inputs.mobile || !inputs.address || !inputs.country || !inputs.email || !inputs.city || !inputs.pincode) {
            setErr("Please fill the all  fields");
            return;
        }
        else if (!inputs.fname.match(/^[a-zA-Z' ]+$/)) {
            setErr("Please enter valid first name");
            return;
        }
        else if (!inputs.lname.match(/^[a-zA-Z' ]+$/)) {
            setErr("Please enter valid last name");
            return;
        }
        else if (!inputs.mobile.match(/^[0-9]{10,}$/)) {
            setErr("Please enter valid phone number");
            return;
        }
        else if (!inputs.address.match(/^[a-zA-Z' ]{5,}$/)) {
            setErr("Please enter valid address");
            return;
        }
        else if (!inputs.country.match(/^[a-zA-Z' ]+$/)) {
            setErr("Please enter valid country name");
            return;
        }
        else if (!inputs.city.match(/^[a-zA-Z' ]+$/)) {
            setErr("Please enter valid city name");
            return ;
        }
        else if (!inputs.pincode.match(/^[0-9]{6,}$/)) {
            setErr("Please enter valid pincode ");
            return;
        }
        else if (!inputs.email.match(/^[a-z0-9._]+@[a-z]+\.[a-z]{2,4}$/)) {
            setErr("Please enter valid pincode ");
            return;
        }
        else {
            setErr('');
            handelpayment(totalcart());
        }
        console.log(inputs);

    }
    
    return (
        <>
                <ToastContainer />

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
                    <form onSubmit={handelSubmit}>
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">First Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name='fname' onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Last Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name='lname' onChange={handleChange} required />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="form-item">
                                    <label className="form-label my-3">Company Name<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div> */}
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="House Number Street Name" name='address' onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Town/City<sup>*</sup></label>
                                    <input type="text" className="form-control" name='city' onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Country<sup>*</sup></label>
                                    <input type="text" className="form-control" name='country' onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                    <input type="text" className="form-control" name='pincode' onChange={handleChange} />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input type="tel" className="form-control" name='mobile' onChange={handleChange} required />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address<sup>*</sup></label>
                                    <input type="email" className="form-control" name='email' onChange={handleChange} required />
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
                                            {cartitems.map((item, index) => {
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
                                            {/* <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-3">Subtotal</p>
                                                </td>
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">₹{totalPrice()}</p>
                                                    </div>
                                                </td>
                                            </tr> */}
                                            {/* <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-4">Shipping</p>
                                                </td>
                                                <td colSpan={3} className="py-5">
                                                    <div className="form-check text-start">
                                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value={0}/>
                                                        <label className="form-check-label" htmlFor="Shipping-1">Free Shipping</label>
                                                    </div>
                                                    <div className="form-check text-start">
                                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" value={10}/>
                                                        <label className="form-check-label" htmlFor="Shipping-2">Flat rate: ₹10.00</label>
                                                    </div>
                                                    {/* <div className="form-check text-start">
                                                        <input type="checkbox" className="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" defaultValue="Shipping" />
                                                        <label className="form-check-label" htmlFor="Shipping-3">Local Pickup: ₹50.00</label>
                                                    </div> 
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                                </td>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">₹{totalPrice()}</p>
                                                    </div>
                                                </td>
                                            </tr> */}

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
                                                    <p className="mb-0">₹{totalcart()}</p>
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
                                                <p className="mb-0 pe-4">₹{totalcart()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4 ">
                                    <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary" onClick={() => { handelpayment(totalcart()) }}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*Checkout Page End*/}
            <Footer />

        </>
       
    )
}

export default Billing;