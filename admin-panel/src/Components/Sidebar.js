import React, { useState, useEffect ,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Globle } from '..'
 

function Sidebar() {


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
  


    
    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <Link to='/home' className="sidebar-brand brand-logo" ><i className="fas fa-shopping-basket text-white "><b> SUPERGROCY</b></i></Link>
                    <Link to='/home' className="sidebar-brand brand-logo-mini" ><img src="assets/images/logo-mini.svg" alt="logo" /></Link>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic">
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " src="assets/images/faces/face3.jpg" alt />
                                    <span className="count bg-success" />
                                </div>
                                <div className="profile-name">
                                    <h5 className="mb-0 font-weight-normal">{data.name}</h5>
                                    {/* <span>Gold Member</span> */}
                                </div>
                            </div>
                            <a href="#" id="profile-dropdown" data-toggle="dropdown"><i className="mdi mdi-dots-vertical" /></a>
                            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-primary" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-onepassword  text-info" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                                    </div>
                                </a>
                                {/* <div className="dropdown-divider" />
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-calendar-today text-success" />
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
                        <Link to='/home' className="nav-link" >
                            <span className="menu-icon">
                                <i className="mdi mdi-speedometer" />
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <span className="menu-icon">
                                <i className="mdi mdi-security" />
                            </span>
                            <span className="menu-title">Category Pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link to='/addcat' className="nav-link" >Add Category</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/addsubcat' className="nav-link" >Add Sub-Category</Link>
                                </li>
                                <li className="nav-item"> <Link to='/categorylist' className="nav-link" >Category List</Link></li>
                                <li className="nav-item"> <Link to='/sub-categorylist' className="nav-link" > Sub-Category List </Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="mdi mdi-cart-plus" />
                            </span>
                            <span className="menu-title">Product Pages</span>
                            <i className="menu-arrow" />
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">

                                <li className="nav-item">
                                    <Link to='/addproduct' className="nav-link" >Add Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/productlist' className="nav-link" >Product List</Link>
                                </li>
                               
                            </ul>
                        </div>
                    </li>
                    {/* <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/forms/basic_elements.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-playlist-play" />
                            </span>
                            <span className="menu-title">Form Elements</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/tables/basic-table.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-table-large" />
                            </span>
                            <span className="menu-title">Tables</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/charts/chartjs.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-chart-bar" />
                            </span>
                            <span className="menu-title">Charts</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="pages/icons/mdi.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-contacts" />
                            </span>
                            <span className="menu-title">Icons</span>
                        </a>
                    </li> */}
                    
                    {/* <li className="nav-item menu-items">
                        <a className="nav-link" href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
                            <span className="menu-icon">
                                <i className="mdi mdi-file-document-box" />
                            </span>
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
        </ >
    )
}

export default Sidebar