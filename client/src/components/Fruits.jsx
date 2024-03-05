import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
function Fruits() {
    const navigate=useNavigate()
    const [product, setProduct] = useState([]);
    const [productData, setProductData] = useState([])


    useEffect(() => {
        display();
    }, [])

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
            const result = await axios.get("http://localhost:8080/getproduct").then((result) => {
                setProduct(result?.data)
                console.log(result.data);
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* Fruits Shop Start*/}
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Our Organic Products</h1>
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
                                                <div className="col-md-6 col-lg-4 col-xl-3">

                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid w-100 rounded-top" alt />
                                                        </div>
                                                        {/* <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div> */}
                                                        <div  className="p-4 border border-secondary border-top-0 rounded-bottom" >
                                                            <h4>{item.product_name}</h4>
                                                            {/* <p>{item.description}</p> */}
                                                            <div className="d-flex justify-content-between flex-lg-wrap">
                                                                <p className="text-dark fs-5 fw-bold mb-0">₹{item.price}</p>
                                                                <Link to='/cart/:id' className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</Link>
                                                            </div>
                                                            {/* <div className='d-flex .justify-content-around flex-lg-wrap'> */}
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
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
            {/*Fruits Shop End*/}

        </>
    )
}

export default Fruits
