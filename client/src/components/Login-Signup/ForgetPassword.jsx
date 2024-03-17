import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer, toast } from 'react-toastify'

function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const submit_error = () => {
        toast.error("Server Error.. OR Email Error..", {
            position: "top-center"
        });
    };

    const handleSubmit = () => {
        console.log(email);
        axios
            .post("http://localhost:8080/send-otp", {
                email: email,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.code === 200) {
                    navigate("/newsubmit");
                } else {
                    // alert("Email / Server Error.");
                    submit_error();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <ToastContainer />

            <div className='root'>
                {/* <div className="login-wrap" > */}
                    <div className="login-html" style={{ height: "400px", width:"400px"}}>
                        <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab">Forget Password</label>
                        {/* <input id="tab-2" type="radio" name="tab" className="sign-up" checked={step === 1} onClick={() => { setStep(1) }} /><label htmlFor="tab-2" className="tab">Sign Up</label> */}
                        <div className="login-form">

                            {/* <form className="sign-in-htm"> */}

                                <div className="group">
                                    <label htmlFor="email" className="label">Email</label>
                                    <input id="email" type="email" className="input" data-type="email" value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} placeholder="Email" />
                                </div>
                                <div className="group">
                                    <button type="submit" className="button" onClick={handleSubmit} > SEND OTP{" "}</button>
                                </div>
                            {/* </form> */}
                        </div>
                    </div>
            </div>
        </>
    );
}

export default ForgetPassword;