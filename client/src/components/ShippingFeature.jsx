import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import { Link } from 'react-router-dom'

function ShippingFeature() {
    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5" >
                <h1 className="text-center text-white display-6">Products</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" style={{ color: "white" }}>Home</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="" style={{ color: "white" }}>Pages</Link></li> */}
                    <li className="breadcrumb-item active text-white">Shipping</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="col-12">
                        <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                            <h1 className="text-primary">Get in touch</h1>
                            <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <Link to='tps://htmlcodex.com/contact-form'>Download Now</Link>.</p>
                        </div>
                    </div>
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">


                            <div className="col-lg-7">

                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">402 Yamuna Chowk, Mota-Varachha</p>
                                    </div>
                                </div>
                                {/* <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2">supergrocey@gmail.com</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2">(+012) 3456 7890</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
            <Footer />

        </>
    )
}

export default ShippingFeature