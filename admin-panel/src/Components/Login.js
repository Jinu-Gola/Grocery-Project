
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globle } from '..';
import axios from 'axios'
function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const [data ,setData] = useContext(Globle)
    const [errors, setErrors] = useState({});
    const handelchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
        setErrors({ ...errors, [name]: '' });
    }
    // const handelsubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(inputs);

    //     try {
    //         const res = await axios.post("http://localhost:8080/login", inputs);
    //         //console.log("login successful")
    //         // console.log("response data", res.data);
    //         //const isadmin = res.data.isAdmin;
    //         if (res.data.data.isAdmin === true) {
    //             localStorage.setItem('token', res.data.token)
    //             // localStorage.setItem('id', res.data.data._id)
    //             setData(res.data.data)
                
    //             navigate('/home')
    //         } else {
    //             navigate('/')
    //             alert("Sorry..!you can't login here because you are not an Admin..")

    //         }

    //     } catch (e) {
    //         console.log("failed")
    //     }

    // }


    const handelsubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs;

        // Validate email format
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setErrors({ ...errors, email: "Invalid email format" });
            return;
        }

        // Validate password length
        if (!password || password.length < 6) {
            setErrors({ ...errors, password: "Password must be at least 6 characters long" });
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/login", inputs);
            console.log("response data", res.data);
            if (res.data.data.isAdmin === true) {
                localStorage.setItem('token', res.data.token);
                navigate('/home');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log("Login failed", error);
            // Check if error.response exists before accessing its properties
            if (error.response && error.response.data) {
                setErrors({ ...errors, common: error.response.data.message });
            } else {
                // Handle network errors or other types of errors
                setErrors({ ...errors, common: "An error occurred. Please try again later." });
            }
        }
    }
    return (
        <div>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="row w-100 m-0">
                        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth lock-full-bg">
                            <div className="card col-lg-4 mx-auto">
                                <div className="card-body px-5 py-5">
                                    <h3 className="card-title text-left mb-3">Login</h3>
                                    <form onSubmit={handelsubmit}>
                                        <div className="form-group">
                                            <label>Username or email *</label>
                                            <input type="text" className="form-control p_input" name="email" onChange={handelchange} />
                                            {errors.email && <p className="text-danger">{errors.email}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label>Password *</label>
                                            <input type="password" className="form-control p_input" name="password" onChange={handelchange} />
                                            {errors.password && <p className="text-danger">{errors.password}</p>}
                                        </div>
                                        <div className="form-group d-flex align-items-center justify-content-between">
                                            <div className="form-check">
                                                <label className="form-check-label">
                                                    <input type="checkbox" className="" />{" "}
                                                    Remember me{" "}
                                                </label>
                                            </div>
                                            <a href="#" className="forgot-pass">
                                                Forgot password
                                            </a>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-block enter-btn"
                                            >
                                                Login
                                            </button>
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn btn-facebook mr-2 col">
                                                <i className="mdi mdi-facebook" /> Facebook{" "}
                                            </button>
                                            <button className="btn btn-google col">
                                                <i className="mdi mdi-google-plus" /> Google plus{" "}
                                            </button>
                                        </div>
                                        <p className="sign-up">
                                            Don't have an Account?<Link to="/signup"> Sign Up</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* content-wrapper ends */}
                    </div>
                    {/* row ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>

        </div>
    )
}

export default Login
