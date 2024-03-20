import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
function Product() {
    const navigate = useNavigate()
    var { id } = useParams();
    console.log(id);
    var token = localStorage.getItem("token");


    const defaultSearch = {
        search: '',
        cid: 0,
        start_price: 0,
        end_price: 0
    }
    const priceRange = [
        { id: 1, label: "10 - 100" },
        { id: 2, label: "100 - 500" },
        { id: 4, label: "500 - 1000" },
        { id: 5, label: "1000 - 2000" },
        { id: 3, label: "2000 - 5000" },


    ]

    const [search, setSearch] = useState();//for search with api get-product
    const [product, setProduct] = useState([]);//for search product
    const [productData, setProductData] = useState([]) //for all product
    // const [price, setPrice] = useState(0)


    const [page, setPage] = useState(1);//for page redirect
    const [pageSize, setPageSize] = useState(6);//perpage product size
    const [totalData, setTotalData] = useState();

    const [filterProduct, setFilterProduct] = useState([]);//for filter product data
    const [searchvalue, setSearchValue] = useState(defaultSearch)

    const wish_alerts = () => {
        toast.success("Product Added to Wishlist", {
            position: "top-center"
        });
    };
    const wishs_alerts = () => {
        toast.error("Product Added to Wishlist", {
            position: "top-center"
        });
    };
    const cart_alerts = () => {
        toast.success("Product Added to Cartlist", {
            position: "top-center"
        });
    };
    const carts_alerts = () => {
        toast.error("Product Already in Cart", {
            position: "top-center"
        });
    };
    const carts_alerts2 = () => {
        toast.error("Please Login First", {
            position: "top-center"
        });
    };
    const wishs_alerts2 = () => {
        toast.error("Please Login First", {
            position: "top-center"
        });
    };
    // useEffect(() => {
    //     // display();
    //     // profile()

    // }, [])

    // useEffect(() => {
    //     if(price >=1){
    //         try {
    //             axios.get(`http://localhost:8080/getproduct/?min=0=&max=${price}`).then((result) => {
    //                 setProduct(result?.data) //fiter product data
    //                 setProductData(result?.data) //all product data
    //             })
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }, [price])

    useEffect(() => {
        display(id)
        display1()
        // if (id) {
        //     try {
        //         axios.get(`http://localhost:8080/category/${id}`).then((result) => {
        //             console.log(result.data.data);
        //             setProduct(result?.data?.data) //fiter product data
        //             setProductData(result?.data?.data) //all product data
        //         })
        //     } catch (error) {
        //         console.log(error)
        //     }
        // } else {
        //     try {
        //         axios.get("http://localhost:8080/getproduct").then((result) => {
        //             setProduct(result?.data) //fiter product data
        //             setProductData(result?.data) //all product data
        //         })
        //     } catch (error) {
        //         console.log(error)
        //     }

        // }
    }, [id])




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

    const addToCart = async (cartProduct) => {
        if (token) {

            var cart = []
            cart = JSON.parse(localStorage.getItem('cartlist')) || [];
            if (cart.length > 0) {
                let count = cart.some(item => item._id === cartProduct._id)
                console.log(count, "aaaaaaaaaaaaaaa");
                if (!count) {
                    console.log({ ...cartProduct, uqty: 1, total_amt: cartProduct.price }, "***************");

                    cart.push({ ...cartProduct, uqty: 1, total_amt: cartProduct.price })
                    localStorage.setItem('cartlist', JSON.stringify(cart));
                    window.location.reload()
                    // alert("Product Added to Cartlist...!!")
                    cart_alerts()
                } else {
                    // alert("Product Already Exist in Cartlist")
                    carts_alerts()
                }
            } else {
                console.log({ ...cartProduct, uqty: 1, total_amt: cartProduct.price }, "BBBBBBBB");
                cart.push({ ...cartProduct, uqty: 1, total_amt: cartProduct.price })
                localStorage.setItem('cartlist', JSON.stringify(cart));
                window.location.reload()
                alert("Product Added to Cartlist...!!!")

            }
        } else {
            carts_alerts2();
        }
    }


    const addToFav = async (favProduct) => {
        if (token) {
            var fav = []
            console.log(fav, "fffffffffffff");
            console.log(favProduct, "pppppppppppp");
            fav = JSON.parse(localStorage.getItem('whishlist')) || [];
            if (fav.length > 0) {
                let count = fav.some(item => item._id === favProduct._id)
                console.log(count, "aaaaaaaaaaaaaaa");
                if (!count) {
                    fav.push({ ...favProduct })
                    localStorage.setItem('whishlist', JSON.stringify(fav));
                    window.location.reload()
                    // alert("Product Added to Whishlist...!!")
                    wish_alerts()

                } else {
                    // alert("Product Already Exist in Whishlist")
                    wishs_alerts()
                }
            } else {

                fav.push({ ...favProduct })
                localStorage.setItem('whishlist', JSON.stringify(fav));
                window.location.reload()
                wish_alerts()
                // alert("Product Added to Whishlist...!!!")

            }
        } else {
            wishs_alerts2()
        }
    }


    const display = async () => {
        if (id) {
            try {
                axios.get(`http://localhost:8080/category/${id}`).then((result) => {
                    console.log(result.data.data);
                    setProduct(result?.data?.data) //fiter product data
                    setProductData(result?.data?.data) //all product data
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                axios.get("http://localhost:8080/getproduct").then((result) => {
                    setProduct(result?.data) //fiter product data
                    setProductData(result?.data) //all product data
                })
            } catch (error) {
                console.log(error)
            }

        }



        // const result = await axios.get("http://localhost:8080/getproduct").then((result) => {
        //     setProduct(result?.data) //fiter product data
        //     setProductData(result?.data) //all product data
        // })

    }

    const display1 = async (data) => {
        const result = await axios.get("http://localhost:8080/getproduct", {
            ...data ,
            page: page, perPage: pageSize
        });
        console.log(result?.data,"result with filter");
        setProductData(result?.data)
        setTotalData(result?.count)

    }




    return (
        <>
            <ToastContainer />

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
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div>
                                </div>
                                <div className="col-6" />
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits"><i className="fa fa-sort" /> Sorting:</label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="">Nothing</option>
                                            <option value="">A-Z</option>
                                            <option value="">Z-A</option>
                                            {/* <option value="">Price High-Low</option>
                                            <option value="audi">Price Low-High</option> */}
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
                                                                <Link to={`/product/${item._id}`}><i className="fas fa-fruit-alt me-2" />{item.cname}</Link>
                                                                {/* <span>(3)</span> */}
                                                            </div>
                                                        ))}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <input type="range" className="form-range w-100" id="rangeInput" step="" name="rangeInput" min={0} max={1000} defaultValue={price} onChange={(e) => { setPrice(e.target.value); }} />
                                                <output id="amount" name="rangeInput" min-velue={0} max-value={1000} htmlFor="rangeInput">{price}</output>
                                            </div>
                                        </div> */}
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Price Range</h4>
                                                {priceRange?.map((pricerange) => {
                                                    console.log(pricerange, "rangeeee");
                                                    return (<div className="mb-2">
                                                        <input
                                                            type="radio"
                                                            className="me-2"
                                                            id={pricerange.label}
                                                            name="price_range"
                                                            value={searchvalue.price}
                                                            checked={searchvalue.price === pricerange.id}
                                                            onClick={(e) => {
                                                                const [start, end] = pricerange.label.split(' - ');
                                                                setSearchValue((prevState) => ({
                                                                    // ...prevState,
                                                                    start_price: start,
                                                                    end_price: end,
                                                                    price: pricerange.id,

                                                                }));
                                                                display1({ ...searchvalue, start_price: start, end_price: end })
                                                            }} />
                                                        <label htmlFor={pricerange.label}> {pricerange.label}</label>
                                                    </div>)
                                                })}

                                                {/* <div className="mb-2">
                                                    <input type="radio" className="me-2" id={pricerange.label} value={searchvalue.price } checked={searchvalue.price===pricerange.id} name="price_range"  onClick={(e)=>{
                                                        const[start,end]=pricerange.label.split(' - ');
                                                        setSearchValue((prevState)=>{
                                                            ...prevState,
                                                            start_price:start,

                                                        })
                                                    }} />
                                                    <label htmlFor="Categories-3"> 500-1000</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id={pricerange.label} value={searchvalue.price } checked={searchvalue.price===pricerange.id} name="price_range"  onClick={(e)=>{
                                                        const[start,end]=pricerange.label.split(' - ');
                                                        setSearchValue((prevState)=>{
                                                            ...prevState,
                                                            start_price:start,

                                                        })
                                                    }} />
                                                    <label htmlFor="Categories-4"> 1000-2000</label>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="radio" className="me-2" id={pricerange.label} value={searchvalue.price } checked={searchvalue.price===pricerange.id} name="price_range"  onClick={(e)=>{
                                                        const[start,end]=pricerange.label.split(' - ');
                                                        setSearchValue((prevState)=>{
                                                            ...prevState,
                                                            start_price:start,

                                                        })
                                                    }} />
                                                    <label htmlFor="Categories-5"> 2000-5000</label>
                                                </div> */}
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

                                        </div>
                                         */}
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 " >
                                        {product.map((item) => (

                                            <div className="col-md-6 col-lg-6 col-xl-4">

                                                <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img" onClick={() => navigate(`/product-detail/${item._id}`)}>
                                                        <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid w-100 rounded-top" alt />
                                                    </div>
                                                    <div className="   px-3 py-2 rounded position-absolute whishheart" style={{ top: "10px", right: "10px", color: JSON.parse(localStorage.getItem('whishlist'))?.find(obj => obj._id === item._id) ? "red" : "grey" }} onClick={() => { addToFav(item) }}><i className="fa fa-heart fa-2x text-black" /></div>

                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom" >
                                                        <h5 className='productName'>{item.product_name}</h5>
                                                        <b><p style={{ marginBottom: "0px" }}>{item.size}</p></b>
                                                        <div className="d-flex justify-content-between flex-lg-wrap">
                                                            <p className="text-dark fs-5 fw-bold mt-3">₹{item.price}</p>
                                                            {item?.qty < 1 ? <span type='button' className="btn border border-danger rounded-pill mt-3 px-3 text-danger"  ><i className="fa fa-ban me-2 text-danger" /> Not Available</span> :
                                                                <button type='button' className="btn border border-secondary rounded-pill mt-3 px-3 text-primary" onClick={() => { addToCart(item) }} ><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button>}

                                                            {/* <button className="btn border border-secondary rounded-pill px-3 text-primary" onClick={() => { addToCart(item) }} ><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button> */}
                                                        </div>
                                                        {/* <div className='d-flex .justify-content-around flex-lg-wrap'> */}
                                                        {/* </div> */}
                                                    </div>
                                                </div>

                                                {/* <div className="rounded position-relative fruite-item">
                                                    <div className="fruite-img" onClick={() => navigate(`/product-detail/${item._id}`)}>
                                                        <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid w-100 h-100 rounded-top " alt />
                                                    </div>
                                                    <div className="   px-3 py-2 rounded position-absolute whishheart" style={{ top: "10px", right: "10px", color: JSON.parse(localStorage.getItem('whishlist'))?.find(obj => obj._id === item._id) ? "red" : "grey" }} onClick={() => { addToFav(item) }}><i className="fa fa-heart fa-2x text-black" /></div>
                                                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                        <h5 className='productName'>{item.product_name}</h5>
                                                        <b><p>{item.size}</p></b>

                                                        <div className="d-flex justify-content-between flex-lg-wrap flex-column">
                                                            <p className="text-dark fs-5 fw-bold mb-0">₹{item.price}</p>
                                                            {item?.qty < 1 ? <span type='button' className="btn border border-danger rounded-pill mt-3 px-3 text-danger"  ><i className="fa fa-ban me-2 text-danger" /> Not Available</span> :<button type='button' className="btn border border-secondary rounded-pill mt-3 px-3 text-primary" onClick={() => { addToCart(item) }} ><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</button>}
                                                        </div>
                                                      
                                                    </div>
                                                </div> */}
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

export default Product
