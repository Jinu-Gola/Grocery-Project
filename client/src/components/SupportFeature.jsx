import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import { Link } from 'react-router-dom'
// import { StrictMode } from 'react'

function SupportFeature() {
    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header4 py-5 ">
                <h1 className="text-center text-white display-6">Support</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" style={{ color: "white" }}>Home</Link></li>
                    {/* <li className="breadcrumb-item"><Link to="" style={{ color: "white" }}>Pages</Link></li> */}
                    <li className="breadcrumb-item active text-white">Support </li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Contact Start */}
            <div className="container-fluid contact py-6">
                <div className="container py-5">
                    <div className="col-12">
                        <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                            <h1 className="text-primary">Support</h1>
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
                                            backgroundImage: "url(" + "./assets/img/support2.png" + ")",
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
                                    <h4 className="text-primary">TERMS OF SUPPORT</h4>
                                    <p className="mb-4">
                                        24/7 customer support is a model where customers can get their issues resolved anytime they need assistance. This is the support that is available 24 hours a day and 7 days a week.
                                        <br />
                                        When organizations are able to contact their customers whenever they need it by adopting digital channels such as self-service knowledge base and chatbots, they are providing 24-7 customer service.
                                        Customers are extremely happy when they receive aid when they demand it. This is how customers react to customer service.
                                        <br />
                                        Customers often resent waiting and expect rapid responses. Customers would have their difficulties addressed with proactive customer service support and consistency if a support crew was available 24 hours a day, seven days a week.
                                        When customers are satisfied with the level of support they receive, they are more inclined to stay loyal and less likely to switch brands.
                                        <br />
                                        If you would love to provide round-the-clock assistance to your customers and enjoy the benefits we talked about earlier, you need to know the best way to do this. Here are some tips.
                                        One of the best ways to show your customers that you truly care is by offering 24/7 customer support.
                                        <br />With this, they’ll be convinced that you prioritize their needs, which translates to customer loyalty. We all know that loyalty is essential for business growth as customers will be willing to stick with you long-term and even refer your brand to others.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='shipping'>
                        <div className="p-5 bg-light rounded">
                            <div className="row g-4">

                                <div className="col-lg-7">
                                    <h4 className="text-primary">TERMS OF SUPPORT</h4>
                                    <p className="mb-4">
                                        As a business owner, you should know when to use in-house teams and when to outsource some services. You can’t do it all.
                                        One of the best ways to enhance the customer service experience at your company is by outsourcing call center support.
                                        <br />
                                        When searching for the right team, ensure that you look out for important skills like excellent communication, empathy,
                                        and patience, as these are necessary for positive interaction with your customers. You should also take charge of the
                                        onboarding and training processes so that each member undergoes thorough training on your products.
                                        <br />
                                        Providing 24/7 customer service is a continuous process. Therefore, you should always be open to feedback from agents
                                        and customers and incorporate this into improving your support operation.
                                        <br />
                                        Clients reach customer support agents because they are their primary source of assistance, having an internal knowledge
                                        base enables all agents, regardless of experience, to consistently provide an excellent client experience.
                                        This also makes it easier to make updates or modifications to the support process without jeopardizing the overall client experience.
                                    </p>
                                </div>
                                <div className="col-lg-5">
                                    <div className="d-flex p-4 rounded mb-4 bg-white">
                                        <p style={{
                                            height: "350px",
                                            width: "550px",
                                            backgroundImage: "url(" + "./assets/img/support4.png" + ")",
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

export default SupportFeature