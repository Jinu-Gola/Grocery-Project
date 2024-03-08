import React, { useEffect, useState } from 'react'
import Header from './Header'
import Search from './Search'
import Slider from './Slider'
import Offers from './Offers'
// import Banner from './Banner'
import Bestseller from './Bestseller'
import Features from './Features'
import Footer from './Footer'
// import Review from './Review'
import Fruits from './Fruits'
import Vegitables from './Vegitables'
import axios from 'axios'
import { useNavigate ,Link} from 'react-router-dom'




function Home(props) {
    const navigate = useNavigate()
    var token = localStorage.getItem("token");

    const [profiles, setProfiles] = useState("")
    const [search, setSearch] = useState("")
    useEffect(() => {
        display();
        profile();

    }, [])

    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/login");
                alert("Token is expired ");
            }
            else {
                setProfiles(res.data);
                // console.log("admin =" + res.data.isAdmin)
            }
        } catch (error) {
            console.log("profile err", error);
        }
    };

    const [product, setProduct] = useState([]);
    const [productData, setProductData] = useState([])

    const display = async () => {
        try {
            const result = await axios.get("http://localhost:8080/getproduct").then((result) => {
                setProduct(result?.data)
                console.log(result.data);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const searchFunction = (data) => {
        // console.log(data);
        // console.log(product);
        const filterProduct = productData.filter((item) => {
            const filterName = item.product_name.toLowerCase()
            const searchData = data.toLowerCase()
            //    console.log(filterName.includes(searchData));
            return filterName.includes(searchData)

            // console.log(item);
        })
        //    console.log(filterProduct);
        setProduct(filterProduct)

    }
    return (
        <>



            {/* Navbar start */}

            <Header searchFunction={searchFunction} />
            {/* Navbar End */}



            <div>
                {/* Modal Search Start */}
                <Search />
                {/* Modal Search End */}
                {/* Hero Start */}
                <Slider />
                {/* Hero End */}
                {/* Featurs Section Start */}
                {/* <Features /> */}
                {/* Featurs Section End */}
                {/* Fruits Shop Start*/}
                {/* <Fruits /> */}
                <div className="container-fluid fruite py-5">
                    <div className="container py-5">
                        <div className="tab-class text-center">
                            <div className="row g-4">
                                <div className="col-lg-4 text-start">
                                    <h2>Our Organic Products</h2>
                                </div>
                                <div className="col-lg-8 text-end">
                                    <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                        <li className="nav-item">
                                            <Link to='/product' className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" >
                                                <span className="text-dark" style={{ width: 130 }}>All Products</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/vegitable' className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" >
                                                <span className="text-dark" style={{ width: 130 }}>Vegetables</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/fruits' className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" >
                                                <span className="text-dark" style={{ width: 130 }}>Fruits</span>
                                            </Link>
                                        </li>
                                        {/* <li className="nav-item">
                                        <Link to='' className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" >
                                            <span className="text-dark" style={{ width: 130 }}>Bread</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='' className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" >
                                            <span className="text-dark" style={{ width: 130 }}>Meat</span>
                                        </Link>
                                    </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                {product.map((item) => (
                                                    <div className="col-md-6 col-lg-4 col-xl-3" onClick={() => navigate(`/product-detail/${item._id}`)}>

                                                        <div className="rounded position-relative fruite-item">
                                                            <div className="fruite-img">
                                                                <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid w-100 rounded-top" alt />
                                                            </div>
                                                            <div className="  px-3 py-2 rounded position-absolute whishheart" style={{ top: "10px", right: "10px" }}><i className="fa fa-heart fa-2x text-black " /></div>

                                                            <div className="p-4 border border-secondary border-top-0 rounded-bottom" >
                                                                <h5 className='product'>{item.product_name}</h5>
                                                                {/* <p>{item.description}</p> */}
                                                                <div className="d-flex justify-content-between flex-lg-wrap">
                                                                    <p className="text-dark fs-5 fw-bold mb-0">₹{item.price}</p>
                                                                    <button className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button>
                                                                </div>
                                                                {/* <div className='d-flex .justify-content-around flex-lg-wrap'> */}
                                                                {/* </div> */}
                                                            </div>
                                                        </div>

                                                        {/* <div className="d-flex .justify-content-around flex-lg-wrap"> */}
                                                        {/* </div> */}
                                                        {/* </div> */}
                                                    </div>

                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* Fruits Shop End*/}
                {/* Featurs Section Start */}
                <Features />
                {/* Featurs Section End */}
                {/* offers Start */}
                <Offers />
                {/* offers End */}
                {/* Vesitable Shop Start*/}
                {/* <Vegitables /> */}
                {/* Vesitable Shop End */}
                {/* Banner Section Start*/}
                {/* <Banner /> */}
                {/* Banner Section End */}
                {/* Bestsaler Product Start */}
                <Bestseller />
                {/* Bestsaler Product End */}

                {/* Tastimonial Start */}
                {/* <Review /> */}
                {/* Tastimonial End */}
                {/* Footer Start */}
                <Footer />
                {/* Footer End */}

            </div>


        </>
    )
}

export default Home
