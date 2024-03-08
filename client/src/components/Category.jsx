import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
function Category() {
    const navigate = useNavigate()
    // const [profiles, setProfiles] = useState("")
    // const [search, setSearch] = useState();
    var token = localStorage.getItem("token");

    var {id} = useParams();
    // console.log(id,"iiiiiiiiiiiiiiiiiiiiippppppppppp");


    const [product, setProduct] = useState([]);
    const [productData, setProductData] = useState([])
    const [category,setCategory]=useState([])

    useEffect(() => {
        display();

    }, [])

    // const profile = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:8080/auth/${token}`);
    //         console.log(res.data);
    //         if (res.data === "Token is expired ") {
    //             // console.log(res.data);
    //             localStorage.removeItem("token");
    //             navigate("/login");
    //             alert("Token is expired ");
    //         }
    //         else {
    //             setProfiles(res.data);
    //             console.log("admin =" + res.data.isAdmin)
    //         }
    //     } catch (error) {
    //         console.log("profile err", error);
    //     }
    // };


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


    const display = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/category/${id}`).then((result) => {
                // setProduct(result?.data)
                // setProductData(result?.data)
                setCategory(result?.data)
                console.log(setProductData);
            })
        } catch (error) {
            console.log(error)
            // res.send(error)
        }
    }


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

    // const result = async (req, res) => {
    //     try {
    //         const response = await axios.get("http://localhost:8080/oneproduct/" + id);
    //         console.log("response");
    //     } catch (error) {
    //         res.send(error)
    //     }

    // }

    return (
        <>
            <Header searchFunction={searchFunction} />
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

            </div>
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Products</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" style={{ color: "white" }}>Home</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="" style={{ color: "white" }}>Pages</Link></li> */}
                    <li className="breadcrumb-item active text-white">Products</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    {/* <h1 className="mb-4">All Products</h1> */}

                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    {/* <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div> */}
                                </div>
                                <div className="col-6" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Default Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="volvo">Nothing</option>
                                            <option value="saab">Popularity</option>
                                            <option value="opel">Organic</option>
                                            <option value="audi">Fantastic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">

                                                <h4>Categories</h4>
                                                <ul className="list-unstyled fruite-categorie">
                                                    <li>
                                                        {category_name.map((item) => (
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                <Link to={`/category/${item._id}`} ><i className="fas fa-fruit-alt me-2" />{item.cname}</Link>
                                                                {/* <span>(3)</span> */}
                                                            </div>
                                                        ))}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <input type="range" className="form-range w-100" id="rangeInput" name="rangeInput" min={0} max={500} defaultValue={0} oninput="amount.value=rangeInput.value" />
                                                <output id="amount" name="amount" min-velue={0} max-value={500} htmlFor="rangeInput">0</output>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Additional</h4>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-1" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-1"> Organic</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-2" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-2"> Fresh</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-3" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-3"> Sales</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-4" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-4"> Discount</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id="Categories-5" name="Categories-1" defaultValue="Beverages" />
                                                    <label htmlFor="Categories-5"> Expired</label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-12">
                                            <h4 className="mb-3">Featured products</h4>
                                            {product.map((item) => (

                                                <div className="d-flex align-items-center justify-content-start" >
                                                    <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                                        <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid rounded" />
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-2">{item.product_name}</h6>
                                                        <div className="d-flex mb-2">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                        <div className="d-flex mb-2">
                                                            <h5 className="fw-bold me-2">₹{item.price}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div> */}
                                        {/* <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img src="assets/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                                                <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center" >
                                        {product.map((item) => (
                                            <div className="col-md-6 col-lg-6 col-xl-4" onClick={() => navigate(`/product-detail/${item._id}`)}>

                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img">
                                                        <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid w-100 h-100 rounded-top " alt />
                                                    </div>
                                                    {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h5 className='productName'>{item.product_name}</h5>
                                                        {/* <p>{item.description}</p> */}
                                                        <div className="d-flex justify-content-between flex-lg-wrap flex-column">
                                                            <p className="text-dark fs-5 fw-bold mb-0">₹{item.price}</p>
                                                            <button className="btn border border-secondary rounded-pill mt-3 px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button>

                                                        </div>
                                                        {/* <div className="d-flex .justify-content-around flex-lg-wrap"> */}
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <a href="#" className="rounded">«</a>
                                                <a href="#" className="active rounded">1</a>
                                                <a href="#" className="rounded">2</a>
                                                <a href="#" className="rounded">3</a>
                                                <a href="#" className="rounded">4</a>
                                                <a href="#" className="rounded">5</a>
                                                <a href="#" className="rounded">6</a>

                                                <a href="#" className="rounded">»</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Fruits Shop End*/}
            <Footer />

        </>
    )
}

export default Category
