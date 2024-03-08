import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Search from './Search'
import Footer from './Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Vegitables from './Vegitables'


function ProductDetail() {
    const navigate = useNavigate();
    const [oneproduct, setOneProduct] = useState([])
    const [oneCat, setOneCat] = useState([])
    const { id } = useParams();
    console.log(id,">>>>>>>>>>>>>>>>");
    useEffect(() => {
        getItem();
    }, []);

    // const show = () => {
    //     toast.success("Product Updated Successfully", {
    //         position: "top-center"
    //     });
    // };

    const getItem = async () => {
        try {
            console.log("get item")
            const product_res = await axios.get("http://localhost:8080/oneproduct/" + id);
            setOneProduct(product_res.data)
            const cid = product_res.data.cid
            if (product_res.data.cid){
                const category_res = await axios.get("http://localhost:8080/one-cat/" + product_res.data.cid);
                setOneCat(category_res.data)
            }
            console.log("data set")
            // console.log(product_res.data.cid);
        } catch (error) {
            console.log("error : " + error);
        }
    }

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

    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Product Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to='/' style={{ color: "white" }}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to='/product' style={{ color: "white" }}>Product</Link></li>
                    {/* <li className="breadcrumb-item"><Link to='/' style={{ color: "white" }}>Product</Link></li> */}
                    <li className="breadcrumb-item active text-white">Product Detail</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Single Product Start */}
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">

                            <div className="row g-4">
                                <div className="col-lg-6 " >
                                    <div className="border rounded ">
                                        {/* <div className='img-detail'>  */}
                                            <img src={`http://localhost:8080/images/${oneproduct?.image?.[0]}`} className="img-fluid rounded" alt="Image" />
                                        {/* </div>  */}
                                     </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{oneproduct.product_name}</h4>
                                    
                                    {/* <h6 className="mb-3">Category: {oneCat.cname}</h6> */}
                                    <h5 className="fw-bold mb-3">₹{oneproduct.price}</h5>
                                    {/* <div className="d-flex mb-4">
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star text-secondary" />
                                        <i className="fa fa-star" />
                                    </div> */}
                                    {/* <p className="mb-4">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p> */}
                                    <p className="mb-4">{oneproduct.description}</p>
                                    <div className="input-group quantity mb-5" style={{ width: 100 }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={1} />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <a href="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" aria-controls="nav-about" aria-selected="true">Description</button>
                                            <button className="nav-link border-white border-bottom-0" type="button" role="tab" id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission" aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">

                                            <p>{oneproduct.description}</p>
                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{oneproduct.size}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Brand Name</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{oneproduct.brand_name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Availabel Stock</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">{oneproduct.qty}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                            <div className="d-flex">
                                                <img src="assets/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: 100, height: 100 }} alt />
                                                <div className>
                                                    <p className="mb-2" style={{ fontSize: 14 }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Jason Smith</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src="assets/img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: 100, height: 100 }} alt />
                                                <div className>
                                                    <p className="mb-2" style={{ fontSize: 14 }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Sam Peters</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star text-secondary" />
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </div>
                                                    </div>
                                                    <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-vision" role="tabpanel">
                                            <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                                amet diam et eos labore. 3</p>
                                            <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                                Clita erat ipsum et lorem et sit</p>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <form action="#">
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text" className="form-control border-0 me-4" placeholder="Your Name *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email" className="form-control border-0" placeholder="Your Email *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea name id className="form-control border-0" cols={30} rows={8} placeholder="Your Review *" spellCheck="false" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                                        <i className="fa fa-star text-muted" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                </div>
                                                <a href="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</a>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                            </div>

                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    {/* <div className="input-group w-100 mx-auto d-flex mb-4">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                                    </div> */}
                                    <div className="mb-4">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled fruite-categorie">
                                            <li>
                                                {category_name.map((item) => (

                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#"><i className=" me-3" />{item.cname}</a>
                                                        {/* <span>(3)</span> */}
                                                    </div>
                                                ))}
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <h4 className="mb-4">Featured products</h4>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/featur-1.jpg" className="img-fluid rounded" alt="Image" />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/featur-2.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/featur-3.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/vegetable-item-4.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/vegetable-item-5.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src="assets/img/vegetable-item-6.jpg" className="img-fluid rounded" alt />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star text-secondary" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <img src="assets/img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                                        <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                                            <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="fw-bold mb-0">Related products</h1>
                    <Vegitables />
                    {/* <div className="vesitable">
                        <div className="owl-carousel vegetable-carousel justify-content-center">
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Banana</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Bell Papper</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-primary rounded position-relative vesitable-item">
                                <div className="vesitable-img">
                                    <img src="assets/img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                                </div>
                                <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
                                <div className="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                        <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <a href="#" className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            {/*Single Product End*/}
            <Footer />

        </>
    )
}

export default ProductDetail
