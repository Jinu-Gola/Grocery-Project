import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';

function ViewProduct(props) {
    const navigate = useNavigate();

    var token = localStorage.getItem("token");
    const [profiles, setProfiles] = useState("")
    useEffect(() => {

        if (!token) {
            navigate('/')
            // alert("Please Login First..!")
        }
        else {
            profile();
            // data();

        }
    }, [])

    const profile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/${token}`);
            // console.log(res.data);
            if (res.data === "Token is expired ") {
                // console.log(res.data);
                localStorage.removeItem("token");
                navigate("/");
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


    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        display();
    }, [])

    const searchFunction = (data) => {
        // console.log(data);
        // console.log(product);
        const filterProduct = product.filter((item) => {
            const filterName = item.product_name.toLowerCase()
            const searchData = data.toLowerCase()
            //    console.log(filterName.includes(searchData));
            return filterName.includes(searchData)

            // console.log(item);
        })
        //    console.log(filterProduct);
        setData(filterProduct)
    }

    const display = async () => {
        try {
            await axios.get("http://localhost:8080/getproduct").then((result) => {
                // console.log("next")
                // console.log("api data", result)
                setData(result?.data)
                setProduct(result?.data)

                // console.log("data", data)
            })


        } catch (error) {
            console.log(error)
        }
    }

    const delProduct = async (id) => {
        // const {id}=useParams()
        try {
            console.log("delete id ", id);

            const result = await axios.delete("http://localhost:8080/delproduct/" + id);
            console.log("product deleted..")

            display();
        } catch (error) {
            console.log("Error : " + error)
        }
    }

    const editProduct = async (id) => {
        try {
            navigate(`/updateproduct/${id}`)

        } catch (error) {
            console.log("Error : " + error)
        }
    }
    const [search, setSearch] = useState("")
    useEffect(() => {
        // console.log(search);
        if (search) {
            // navigate('/productlist')
            props.searchFunction && props.searchFunction(search)
        }

    }, [search])

    return (
        <>

            <div className="container-scroller">
                {/* partial:partials/_sidebar.html */}
                <Sidebar />
                {/* partial */}
                <div className="container-fluid page-body-wrapper">
                    {/* partial:partials/_navbar.html */}
                    <Navbar searchFunction={searchFunction} />
                    {/* partial */}
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <ul className="navbar-nav w-100">
                                <li className="nav-item">
                                    <form className="nav-link mt-3 mt-md-0  d-lg-flex search">
                                        <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
                                    </form>
                                </li>
                            </ul>
                            <div className="row">
                                {data.map((item, index) => (



                                    <div key={index} className="col-md-4 col-sm-6 col-xs-12 col-lg-3 grid-margin stretch-card text-center">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="bg-gray  text-center ">
                                                    {/* d-flex d-md-block */}
                                                    <div className="text-md-center text-xl-center">
                                                        <img src={`http://localhost:8080/images/${item.image[0]}`}
                                                            height="170px" width="180px" />

                                                    </div><br />
                                                    <div className="text-md-center text-xl-center">

                                                        <h5>{item.product_name}</h5>
                                                        {/* <h2>Product name</h2> */}
                                                    </div>
                                                    {/* <div className="text-md-center text-xl-center">
                                                        <p>{item.description}</p> */}
                                                    {/* <p>This is description</p> navigate(`/updateproduct/${item._id}`)*/}
                                                    {/* </div> */}
                                                    <div className="text-md-center text-xl-center">
                                                        <h6>M.R.P: ₹{item.price}</h6>
                                                    </div>
                                                    <div className="text-md-center text-xl-center">
                                                        <button type="text" className="btn btn-success mr-3" onClick={() => editProduct(item._id) }>Edit</button>
                                                        <button type="text" className="btn btn-danger" onClick={() => delProduct(item._id)} >Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div>
            </div> */}

        </>

    )
}

export default ViewProduct