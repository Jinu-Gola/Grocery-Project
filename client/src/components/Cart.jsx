import React, { useEffect } from 'react'
import Search from './Search'
import Header from './Header'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Cart() {
    var token = localStorage.getItem("token");

    const navigate = useNavigate()
    const [cartitem, setCartItem] = useState([])
    const [cartTotal, setCartTotal] = useState(0);
    const [profiles, setProfiles] = useState("")

    useEffect(() => {
        cartList()
        profile()
    }, [])

    const cartList = async () => {
        let cartlist = [];
        // uid = JSON.parse(localStorage.getItem('user'))
        // console.log(uid,"uiddd");

        // if(uid)
        cartlist = JSON.parse(localStorage.getItem('cartlist'))
        setCartItem(cartlist)
    }

    const totalPrice = () => 
        cartitem?.reduce((total, item) => parseInt(total) + (parseInt(item.uqty) * parseInt(item.price)), 0)
    

    const removeCart = (item) => {
        const newCart = cartitem.filter((cart) => cart._id !== item._id)
        setCartItem(newCart)
        localStorage.setItem('cartlist', JSON.stringify(newCart))
    }
    // console.log(cartitem,"after itemssss removed...");

    const handleQty = (qty, index, item) => {
        // console.log(parseInt(qty) * parseInt(item.price),"MMMMMMMMMMMMMMMMM");
        cartitem[index] = { ...item, uqty: parseInt(qty), total_amt: parseInt(qty) * parseInt(item.price) }
        setCartItem([...cartitem])
        // console.log(cartitem[index]);
        localStorage.setItem('cartlist', JSON.stringify(cartitem))
    }
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



  

    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to='/' style={{ color: "white" }}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to='' style={{ color: "white" }}>Pages</Link></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartitem && cartitem?.map((item, index) => {
                                    let p_total = parseInt(item?.uqty) * parseInt(item?.price);
                                    return (<tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{item.product_name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{item.price}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => {
                                                        if (item.uqty > 1) {
                                                            handleQty(+item.uqty - 1, index, item)
                                                        }
                                                        else {
                                                            alert("Not valid...")
                                                        }
                                                    }}>
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm text-center border-0" value={item.uqty} />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => {
                                               
                                                        if (item.uqty < item.qty) {
                                                            handleQty(+item.uqty + 1, index, item)
                                                        }
                                                        else {
                                                            alert('You cannot add product greater than total quantity of product..')
                                                        }
                                                    }}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{p_total}</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={(e) => {
                                                removeCart(item)
                                            }}  >
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="mt-5">
                        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                    </div> */}
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
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
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button" onClick={() => navigate('/billing') }>Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Cart Page End*/}
            <Footer />
        </>
    )
}

export default Cart
