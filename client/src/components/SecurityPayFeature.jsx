import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import { Link } from 'react-router-dom'
// import { StrictMode } from 'react'

function SecurityPayFeature() {
    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header2 py-5 ">
                <h1 className="text-center text-white display-6">Security payment</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" style={{ color: "white" }}>Home</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="" style={{ color: "white" }}>Pages</Link></li> */}
                    <li className="breadcrumb-item active text-white">Security payment</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-6">
                <div className="container py-5">
                    <div className="col-12">
                        <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                            <h1 className="text-primary">Security payment</h1>
                            <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <Link to='tps://htmlcodex.com/contact-form'>Download Now</Link>.</p>
                        </div>
                    </div>

                    <div className='shipping'>
                        <div className=" p-5 bg-light rounded   ">
                            <div className="row g-4">

                                <div className="col-lg-5">
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <p style={{
                                            height: "350px",
                                            width: "550px",
                                            backgroundImage: "url(" + "./assets/img/payment1.png" + ")",
                                            paddingTop: "100px",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                        ></p>
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

                                <div className="col-lg-7">
                                    <h4 className="text-primary">TERMS SECURITY PAYMENT</h4>
                                    <p className="mb-4">
                                        You agree and understand that though we endeavour to ship and deliver our
                                        Products all across India, we may, in our sole discretion determine a select list of
                                        areas which are unserviceable for delivery of Products, from time to time.<br />
                                        We or our Logistics Partners do not provide shipping and delivery services in such
                                        unserviceable areas and may not process your orders on the Website in such cases.<br />
                                        In the event an area has been deemed unserviceable by us, we shall notify such user
                                        at the time of placing an order for purchase of Products on the Website.
                                        You may also verify whether an area is unserviceable for deliveries by us by entering
                                        the relevant area pin-code on SuperGrocy.
                                        <br />You agree and acknowledge that to effectuate timely delivery of the purchased Products to you we may inquire or collect specific information like your name, shipping address, billing address, landmarks, contact details, etc.
                                        You shall ensure that all information that is submitted by you to us on the Website is true, complete, accurate and sufficient to identify the actual place of delivery.
                                        <br /> You understand that you shall bear absolute liability in case of any failure by us in delivering the purchased Products due to your failure to provide correct, complete, sufficient and accurate information at the time of placing the order.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='shipping'>
                        <div className="p-5 bg-light rounded">
                            <div className="row g-4">

                                <div className="col-lg-7">
                                    <h4 className="text-primary">TERMS SECURITY PAYMENT</h4>
                                    <p className="mb-4"> We partner with third party logistics service providers in order to effectuate Product
                                        shipping and delivery to you (“Logistics Partners”). We shall provide the details of the
                                        <br />Logistics Partner who will be responsible for processing the shipping and delivery of
                                        <br />any Product purchased by you on the Website at the time such Product is processed
                                        <br />and successfully handed over to the Logistics Partner by us. The Products are usually
                                        <br />dispatched within 2 to 4 days of receiving the Order on SuperGrocy. In any case, the User
                                        <br />will be provided with an estimated timeline for the delivery of the Product purchased
                                        <br />from SuperGrocy.
                                        <br />This estimated timeline shall be notified to the user on the order confirmation page
                                        <br />displayed at the time the order is confirmed by us. We will also share details about an
                                        <br /> your orders pursuant to their dispatch on the e-mail ID and/or mobile number the
                                        <br />provided by you/ registered with us.
                                        <br />You agree and understand that though we effectuate Product delivery to the Users
                                        <br />through our Logistics Partners, we reserve the right to ship and deliver the Products
                                        <br />on our own without engaging any Logistics Partners or third party service providers.
                                        {/* <br />You agree and understand that though we endeavour to ship and deliver our
                                        <br />Products all across India, we may, in our sole discretion determine a select list of
                                        <br />areas which are unserviceable for delivery of Products, from time to time.
                                        <br />We or our Logistics Partners do not provide shipping and delivery services in such
                                        <br />unserviceable areas and may not process your orders on the Website in such cases.
                                        <br />In the event an area has been deemed unserviceable by us, we shall notify such user
                                        <br />at the time of placing an order for purchase of Products on the Website.
                                        <br />You may also verify whether an area is unserviceable for deliveries by us by entering
                                        <br />the relevant area pin-code on SuperGrocy. */}
                                    </p>
                                </div>
                                <div className="col-lg-5">
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <p style={{
                                            height: "350px",
                                            width: "550px",
                                            backgroundImage: "url(" + "./assets/img/Money-Transfer-1.png" + ")",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            // marginTop: "40%"
                                        }}
                                        ></p>
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
            </div>
            {/* Contact End */}
            <Footer />

        </>
    )
}

export default SecurityPayFeature