import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
// import { Globle } from '..'


function Navbar(props) {
  const navigate = useNavigate()



  // const [data] = useContext(Globle);
  // console.log(data); 
  const [data, setData] = useState([]);
  var token = localStorage.getItem("token");
  // console.log(token);
  useEffect(() => {
    profile();
  }, [])


  const profile = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/auth/${token}`);
      // console.log("profile data", res.data)
      setData(res.data);
    } catch (error) {
      console.log("profile err", error);
    }
  };


  const [search, setSearch] = useState("")
  useEffect(() => {
    // console.log(search);
    if (search) {
      navigate('/productlist')
      props.searchFunction && props.searchFunction(search)
    }

  }, [search])



  return (
    <div>
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link to='/home' className="navbar-brand brand-logo-mini" >
            {/* <img src="assets/images/logo-mini.svg" alt="logo" /> */}
          </Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu" />
          </button>
          {/* <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
              </form>
            </li>
          </ul> */}

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                id="profileDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <div className="navbar-profile">
                  <img
                    className="img-xs rounded-circle"
                    src={`http://localhost:8080/images/${data.image}`}
                    alt=""
                  />
                  {/* <img className="img-xs rounded-circle " src="assets/images/faces/face3.jpg" alt /> */}

                  <h4 className="mb-0 d-none d-sm-block navbar-profile-name">
                    {data.name}
                  </h4>
                  <i className="mdi mdi-menu-down d-none d-sm-block" />
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="profileDropdown"
              >
                <h6 className="p-3 mb-0">Profile</h6>
                <div className="dropdown-divider" />
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <Link to='/' className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Log out</p>
                  </div>
                </Link>
                <div className="dropdown-divider" />
                <p className="p-3 mb-0 text-center">Advanced settings</p>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="mdi mdi-format-line-spacing" />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar