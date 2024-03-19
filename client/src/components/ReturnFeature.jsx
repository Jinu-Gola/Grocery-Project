import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import { Link } from 'react-router-dom'
// import { StrictMode } from 'react'

function ReturnFeature() {
    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header3 py-5 ">
                <h1 className="text-center text-white display-6">Returns</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" style={{ color: "white" }}>Home</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="" style={{ color: "white" }}>Pages</Link></li> */}
                    <li className="breadcrumb-item active text-white">Returns </li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-6">
                <div className="container py-5">
                    <div className="col-12">
                        <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                            <h1 className="text-primary">Returns</h1>
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
                                            backgroundImage: "url(" + "./assets/img/return1.jpg" + ")",
                                            paddingTop: "100px",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            marginTop: "20%"

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
                                    <h4 className="text-primary">TERMS OF RETURN  POLICY</h4>
                                    <p className="mb-4">
                                        You may initiate return of Products within the timelines and as per the terms stipulated under Annexure A
                                        (refer to the table provided at the end of this Policy) of this Policy. We would accept the request for return
                                        of such Product subject to the terms of this Policy. Reliance will not process return if you have placed the order
                                        for a wrong Product model, colour or incorrect Product.<br />
                                        <b>Category:-</b>Home Care , Baby Care , Home & Kitchen
                                        <br /><b>10 Days Returnable</b>
                                        You may return the Product if it is damaged, defective or is not in working condition, or if parts of the Product or
                                        accessory is missing, or if the Product delivered is different from what was ordered basis the Product description displayed on SuparGrocy.
                                        <br />
                                        <b>Category:-</b>
                                        Vegetables, Fruits, dairy & bakery,  Spices & Masala, Snacks & Foods<br />
                                        <b>Non-Returnable</b>Products under this category are non-returnable due to consumable nature of the Products. However, in an unlikely event
                                        of you having concerns with the quality, freshness, physical condition of the Product or if the Product delivered is different from what was
                                        ordered basis the Product description displayed on JioMart, you may return the Product on door-step delivery or you may contact SuperGrocy
                                        customer care for resolution within 24 hours of the delivery of the Product for the abovementioned reasons.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='shipping'>
                        <div className="p-5 bg-light rounded">
                            <div className="row g-4">

                                <div className="col-lg-7">
                                    <h4 className="text-primary">TERMS OF REFUND PAYMENT</h4>
                                    <p className="mb-4">
                                        Please be informed that when you opt to return the Products, upon our verification of the Products and the documents relating thereto,
                                        the refund amount for such Products which are eligible for return as per the terms of this Policy will be processed within a period
                                        of 1(one) business day from the date of us verifying the defect or the non-compliance in the Product. Your refund will be processed
                                        only when the conditions as may be stipulated by Reliance are fulfilled.
                                        <br />The refund amount will be credited to the original payment
                                        mode opted by you or in your wallet associated with the JioMart (“Wallet”) eligible for Wallet refund, as may be chosen by you.
                                        You acknowledge that after initiation of refund, it may take additional time for your refund to reflect in your account which is
                                        subject to your financial institution or payment solution provider terms and conditions.
                                        <br />
                                        Please be informed that for Products, for which you had opted for ‘Cash on Delivery’, as a payment option, you will receive refunds
                                        in your bank account (as per the bank account details provided by you to us) in case the Product is purchased from a third-party seller
                                        made available. However, if the Sale was consummated by Reliance, you will receive your refund in your Wallet.
                                        <br />We do not make any cash refunds.
                                        The amount claimed as refund will be refunded to you within 15(fifteen) working days depending upon the mode of payment chosen by you.
                                        Sometimes banks or financial intermediaries take a longer time to process the refund request. However, if the refund does not happen by the
                                        date advised, you may contact us, and we will gladly help you.
                                    </p>
                                </div>
                                <div className="col-lg-5">
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <p style={{
                                            height: "350px",
                                            width: "550px",
                                            backgroundImage: "url(" + "./assets/img/return2.jpg" + ")",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            marginTop: "20%"
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

export default ReturnFeature