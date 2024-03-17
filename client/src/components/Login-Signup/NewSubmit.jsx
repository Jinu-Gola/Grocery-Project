import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'

function NewSubmit() {
    const navigate = useNavigate();


    const submit_alert = () => {
        toast.success("Password Changed Successfully..!", {
            position: "top-center"
        });
    };
    const submit_error = () => {
        toast.error("Server Error OR Wrong OTP", {
            position: "top-center"
        });
    };

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        console.log(otp, password);
        axios
            .post("http://localhost:8080/submit-otp", {
                otp: otp,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.code === 200) {
                    navigate("/login");
                    // alert("Password Updated.");
                    submit_alert()
                } else {
                    // alert("server err / wrong OTP");
                    submit_error()

                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <ToastContainer />

            {/* <h1 className="center"> FORGET PASSWORD </h1>

            <div className="outcard">
                OTP
                <input
                    style={{ marginBottom: "15px" }}
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }}
                    value={otp}
                    className="inputs"
                    type="text"
                />
                New Password
                <input
                    style={{ marginBottom: "20px" }}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    className="inputs"
                    type="text"
                />
                <button onClick={handleSubmit} className="btns">
                    {" "}
                    CHANGE PASSWORD{" "}
                </button>
            </div> */}
            <div className='root'>
                {/* <div className="login-wrap" > */}
                <div className="login-html" style={{ height: "500px", width: "400px" }}>
                    <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Forget Password</label>
                    {/* <input id="tab-2" type="radio" name="tab" className="sign-up" checked={step === 1} onClick={() => { setStep(1) }} /><label htmlFor="tab-2" className="tab">Sign Up</label> */}
                    <div className="login-form">

                        {/* <form className="sign-in-htm"> */}

                        <div className="group">
                            <label htmlFor="otp" className="label">OTP</label>
                            <input id="otp" type="text" className="input" data-type="text" value={otp} 
                            onChange={(e) => {
                                setOtp(e.target.value);
                            }} placeholder="Enter OTP" />
                        </div>
                        <div className="group">
                            <label htmlFor="pass" className="label">Password</label>
                            <input id="pass" type="password" className="input" data-type="password" value={password} 
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} placeholder="Enter Password" />
                        </div>
                        {/* <div className="group">
                            <label htmlFor="cpass" className="label">Password</label>
                            <input id="cpass" type="password" className="input" data-type="password" value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} placeholder="Password" />
                        </div> */}
                        <div className="group">
                            <button type="submit" className="button" onClick={handleSubmit} > CHANGE PASSWORD{" "}</button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewSubmit;
//otp submit mate