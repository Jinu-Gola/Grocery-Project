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
            <div className="container-fluid page-header1 py-5" >
                <h1 className="text-center text-white display-6">Shipping Policy</h1>
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
                                <h4 className="text-primary">TERMS OF SHIPPING AND DELIVERY</h4>
                                <p className="mb-4"> We partner with third party logistics service providers in order to effectuate Product
                                    <br /> shipping and delivery to you (“Logistics Partners”). We shall provide the details of the
                                    <br />Logistics Partner who will be responsible for processing the shipping and delivery of
                                    <br />any Product purchased by you on the Website at the time such Product is processed
                                    <br />and successfully handed over to the Logistics Partner by us. The Products are usually
                                    <br />dispatched within 2 to 4 days of receiving the Order on JioMart. In any case, the User
                                    <br />will be provided with an estimated timeline for the delivery of the Product purchased
                                    <br />from JioMart.
                                    <br />This estimated timeline shall be notified to the user on the order confirmation page
                                    <br />displayed at the time the order is confirmed by us. We will also share details about an
                                    <br /> your orders pursuant to their dispatch on the e-mail ID and/or mobile number the
                                    <br />provided by you/ registered with us.
                                    <br />You agree and understand that though we effectuate Product delivery to the Users
                                    <br />through our Logistics Partners, we reserve the right to ship and deliver the Products
                                    <br />on our own without engaging any Logistics Partners or third party service providers.
                                    <br />You agree and understand that though we endeavour to ship and deliver our
                                    <br />Products all across India, we may, in our sole discretion determine a select list of
                                    <br />areas which are unserviceable for delivery of Products, from time to time.
                                    <br />We or our Logistics Partners do not provide shipping and delivery services in such
                                    <br />unserviceable areas and may not process your orders on the Website in such cases.
                                    <br />In the event an area has been deemed unserviceable by us, we shall notify such user
                                    <br />at the time of placing an order for purchase of Products on the Website.
                                    <br />You may also verify whether an area is unserviceable for deliveries by us by entering
                                    <br />the relevant area pin-code on JioMart.</p>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    {/* <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                      
                                    </div> */}
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