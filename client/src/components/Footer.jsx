import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div>
        {/* Footer Start */}
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
          <div className="container py-5">
            <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
              <div className="row g-4">
                <div className="col-lg-3">
                  <Link to='/'>
                    <h1 className="text-primary mb-0">SuperGrocey</h1>
                    <p className="text-secondary mb-0">All House Need Products</p>
                  </Link>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative mx-auto">
                    <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                    <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{ top: 0, right: 0 }}>Subscribe Now</button>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex justify-content-end pt-3">
                    <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-light mb-3">Why People Like us!</h4>
                  <p className="mb-4">
                    Because we are focused on the customer services and our products are really well and good it's not our statement but it is our customer review.
                  </p>
                  {/* <a href className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                  <h4 className="text-light mb-3">Shop Info</h4>
                  <Link to='' className="btn-link" >About Us</Link>
                  <Link to='/contact' className="btn-link" >Contact Us</Link>
                  <Link to='' className="btn-link" >Privacy Policy</Link>
                  <Link to='' className="btn-link" >Terms &amp; Condition</Link>
                  <Link to='' className="btn-link" >Return Policy</Link>
                  <Link to='' className="btn-link" >FAQs &amp; Help</Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="d-flex flex-column text-start footer-item">
                  <h4 className="text-light mb-3">Account</h4>
                  <Link to='' className="btn-link" >My Account</Link>
                  <Link to='/product-detail' className="btn-link" >Shop details</Link>
                  <Link to='/cart' className="btn-link" >Shopping Cart</Link>
                  <Link to='/whishlist' className="btn-link" >Wishlist</Link>
                  <Link to='' className="btn-link" >Order History</Link>
                  <Link to='' className="btn-link" >International Orders</Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="text-light mb-3">Contact</h4>
                  <p>Address: 402 Yamuna Chowk, Mota-Varachha</p>
                  <p>Email:supergrocey@gmail.com</p>
                  <p>Phone: (+012) 3456 7890</p>
                  <p>Payment Accepted</p>
                  <img src="assets/img/payment.png" className="img-fluid" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Copyright Start */}
        <div className="container-fluid copyright bg-dark py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <span className="text-light"><Link to='/'><i className="fas fa-copyright text-light me-2" />supergrocey@gmail.com</Link>, All right reserved.</span>
              </div>
              <div className="col-md-6 my-auto text-center text-md-end text-white">
                {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
                {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
                {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
                Designed By  <Link className="border-bottom" to='/'>Super Grocery</Link>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright End */}
        <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i className="fa fa-arrow-up" /></a>

      </div>

    </>
  )
}

export default Footer
