import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

function Header(props) {
    const navigate=useNavigate()
    const [search,setSearch]=useState("")
    useEffect (()=>{
        // console.log(search);
        if(search){
            navigate('/product')
            props.searchFunction && props.searchFunction(search)
        }

    },[search])

    //========= category display =========
    const [category_name, setCategory_name] = useState([]);
    useEffect(() => {
        show();
    }, [])

    const show = async () => {
        try {
            const result = await axios.get("http://localhost:8080/categ").then((result) => {
                setCategory_name(result?.data)

            })
        } catch (error) {
            console.log(error)
        }
    }
    //cart count
    const[cart,setCart]=useState(0)
    const cartlist=JSON.parse(localStorage.getItem('cartlist'));
    // console.log(cartlist,"ccccccccccccccccc");

    //whishlist count
    const [fav, setFav] = useState(0)
    const whishlist = JSON.parse(localStorage.getItem('whishlist'));
    // console.log(whishlist,"wwwwwwwwwwwwwwww");

    //logout
    var token = localStorage.getItem("token");

    const[profiles,setProfiles]=useState("")
    const logOut=()=>{
        
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        navigate('/login')
        // profile();

    }
    // const profile = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:8080/auth/${token}`);
    //         console.log(res.data);
    //         if (res.data === "Token is expired ") {
    //             // console.log(res.data);
    //             localStorage.removeItem("token");
    //             navigate("/login");
    //             // alert("Token is expired ");
    //         }
    //         else {
    //             setProfiles(res.data);
    //             // console.log("admin =" + res.data.isAdmin)
    //         }
    //     } catch (error) {
    //         console.log("profile err", error);
    //     }
    // };

    // const icon_display=()=>{
    //     if(token){

    //     }
    // }

    return (
        <>
            {/* Navbar start */}
            <div className="container-fluid bg-white sticky-top">
                {/* <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </div> */}
                <div className="container px-0  bg-primary">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to='/' className="navbar-brand"><i className="fas fa-shopping-basket text-primary display-6"> SUPERGROCY</i></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary" />
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                               
                                <div className="nav-item dropdown">
                                    <Link onClick={()=>navigate('/product')} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Our Products</Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        {category_name.map((item) => (
                                            <Link to={`/product/${item._id}`} className="dropdown-item">{item.cname}</Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to="/cart" className="dropdown-item">Cart</Link>
                                        {/* <Link to="/billing" className="dropdown-item">Checkout</Link> */}
                                        <Link to="/review" className="dropdown-item">Testimonial</Link>
                                        {/* <Link to="404.html" className="dropdown-item">404 Page</Link> */}
                                    </div>
                                </div>
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <input type="search" className="form-control p-3 me-4" onChange={(e)=>setSearch(e.target.value)} id="search-icon-1" placeholder="Search" aria-describedby="search-icon-1"  />
                                {/* <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span> */}
                                {/* <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button> */}
                                <Link to="/cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x" />
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }} onClick={()=>{setCart(1)}} >{localStorage.getItem('cartlist') ? JSON.parse(localStorage.getItem('cartlist')).length : 0}</span>
                                </Link>
                                <Link to="/whishlist" className="position-relative me-4 my-auto">
                                    <i className="fa fa-heart fa-2x" />
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }} onClick={() => { setFav(1) }} >{localStorage.getItem('whishlist') ? JSON.parse(localStorage.getItem('whishlist')).length : 0}</span>
                                </Link>
                                {/* if(token) */}
                                
                                {!token ? 
                                <Link to="/login" className="position-relative me-4 my-auto">
                                    <i className="fas fa-user fa-2x" />
                                </Link> : 
                                <Link onClick={()=>logOut()} className="position-relative me-4 my-auto">
                                    <i className="fas fa-sign-out-alt fa-2x" />
                                </Link> }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Navbar End */}

        </>
    )
}

export default Header
