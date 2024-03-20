import React, { useEffect } from 'react'
import Search from './Search'
import Header from './Header'
import Footer from './Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Whishlist() {
    var token = localStorage.getItem("token");

    const navigate = useNavigate()
    const [favitem, setFavItem] = useState([])

    const [profiles, setProfiles] = useState("")

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        profile();
        whishList()
    }, [])



    const whishList = async () => {
        let whishlist = [];
        whishlist = JSON.parse(localStorage.getItem('whishlist'))
        setFavItem(whishlist)
    }
    const removeWhishlist = (item) => {
        const newFav = favitem.filter((fav) => fav._id !== item._id)
        setFavItem(newFav)
        localStorage.setItem('whishlist', JSON.stringify(newFav))
    }


    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/login");
                // alert("Token is expired ");
            }
            else {
                setProfiles(res.data);
                // console.log("admin =" + res.data.isAdmin)
            }
        } catch (error) {
            console.log("profile err", error);
        }
    };



    return (
        <>
            <Header />
            <Search />
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Whishlist</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to='/' style={{ color: "white" }}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to='' style={{ color: "white" }}>Pages</Link></li>
                    <li className="breadcrumb-item active text-white">Whishlist</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>

                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favitem && favitem?.map((item, index) => {

                                    return (<tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={`http://localhost:8080/images/${item.image[0]}`} className="img-fluid me-5 rounded-square" style={{ width: 120, height: 100 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{item.product_name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{item.price}</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={(e) => {
                                                removeWhishlist(item)
                                            }}  >
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>


                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
            {/*Cart Page End*/}
            <Footer />
        </>
    )
}

export default Whishlist
