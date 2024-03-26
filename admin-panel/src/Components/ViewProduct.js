import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
//pagination code
import { Pagination, PaginationItem, Typography, getListItemTextUtilityClass, Slider } from "@mui/material";
import ReactPaginate from "react-paginate";
// import Footer from '../admin2/Footer';

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

    // const [filterData, setFilterData] = useState({
    //     price: "All",
    //     product_name: "",
    // });
    // const [currentPage, setCurrentPage] = useState(1);
    // const perPage = 6;
    // const Price = [
    //     { id: 1, label: "0 - 100" },
    //     { id: 2, label: "100 - 200" },
    //     { id: 3, label: "200 - 300" },
    //     { id: 4, label: "400 - 500" },
    //     { id: 5, label: "500 - 1000" },
    //     { id: 5, label: "1000 - 2000" }

    // ]
    // const [filterProduct, setFilterProduct] = useState([]);


    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    //pagination code
    const prevIcon = () => <Typography color="white">Prev</Typography>;
    const nextIcon = () => <Typography color="white">Next</Typography>;
    const handlePage = (page) => setPage(page);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / 8);
    console.log(data.length,"total pages");
    const pageContent = data.slice((page - 1) * 8, page * 8);
    console.log(pageContent,"dataa");

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
                setProduct(result?.data)//filter data
                // setFilterProduct(result?.data)
                // setFilterData({ price: "", product_name: "" })

                // console.log("data", data)
            })
            // console.log(setFilterProduct,"aaaaaaaaa");

        } catch (error) {
            console.log(error)
        }
    }


    // const handleFilter = async (
    //     price,
       
    //     product_name,
    //     page,
    //     perPage
    // ) => {
    //     console.log(price, size_id, color_code, product_name, "&*****");
    //     const response = await filterProducts({
    //         price,
    //         size_id,
    //         color_code,
    //         product_name,
    //         page,
    //         perPage,
    //     });
    //     setData(response?.result);
    //     // console.log(response, "response");
    // };

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
                            {/* <ul className="navbar-nav w-100">
                                <li className="nav-item">
                                    <form className="nav-link mt-3 mt-md-0  d-lg-flex search">
                                        <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
                                    </form>
                                </li>
                            </ul> */}
                            <div className="row">
                                {pageContent.map((item, index) => (



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
                                                        <button type="text" className="btn btn-success mr-3" onClick={() => editProduct(item._id)}>Edit</button>
                                                        <button type="text" className="btn btn-danger" onClick={() => delProduct(item._id)} >Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                ))}

                            </div>
                            <Pagination
                                color="success"
                                align="center"
                                count={totalPages}
                                page={page}
                                onChange={(event, value) => handlePage(value)}
                                renderItem={(item) => (
                                    <PaginationItem
                                        sx={{
                                            color: "white", // Change text color to white
                                        }}
                                       
                                        components={{
                                            previous: prevIcon,
                                            next: nextIcon,
                                        }}
                                        {...item}
                                    />
                                )}
                            />
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