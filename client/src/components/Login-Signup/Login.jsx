
import React, { useState } from 'react'
import './login-signup.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  // register
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");


  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);




  const result = async (e) => {
    e.preventDefault();

    if (email == '' && password == '') {
      alert('please enter email and password..!')
    } else {
      const response = await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
      })
      // console.log('result', response);
      // const data = response.data
      // console.log(data);
      // localStorage.setItem("user", JSON.stringify({  email, password}));
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', response.data.uid)


      navigate('/');
    }

    

  }



  const data = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/regis', {
      name: name,
      email: emails,
      mobile: mobile,
      password: pass,

    }).then((res) => {
      if (res.data.status == 1) {
        setStep(0)
        localStorage.setItem("user", JSON.stringify({ name, email, password, mobile }));
        setError(false);
        setSubmit(true);
        navigate('/login')
      } else {
        alert(setError(true));
      }
    })

    // localStorage.setItem("user", JSON.stringify({ name, email, password, mobile }));
    // if (name === '' || emails === '' || pass === '' || mobile === '') {
    //   alert(setError(true));
    // } else {
    //   setError(false);
    //   setSubmit(true);
    //   navigate('/login');
    // }

  }



  return (

    <>
      <div className='root'>
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" checked={step === 0} onClick={() => { setStep(0) }} /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" checked={step === 1} onClick={() => { setStep(1) }} /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              {
                step === 0 ? (<form className="sign-in-htm" onSubmit={result}>
                  <div className="group">
                    <label htmlFor="email" className="label">Email</label>
                    <input id="user" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </div>
                  <div className="group">
                    <input id="check" type="checkbox" className="check" defaultChecked />
                    <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                  </div>
                  <div className="group">
                    <input type="submit" className="button" defaultValue="Sign In" />
                  </div>
                  <div className="hr" />
                  <div className="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </form>) : (<form onSubmit={data}>
                  <div className="sign-up-htm">
                    <div className="group">
                      <label htmlFor="user" className="label">Username</label>
                      <input id="user" type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    </div>

                    <div className="group">
                      <label htmlFor="pass" className="label">Email Address</label>
                      <input id="pass" type="text" className="input" value={emails} onChange={(e) => setEmails(e.target.value)} />
                    </div>

                    <div className="group">
                      <label htmlFor="pass" className="label">Password</label>
                      <input id="pass" type="password" className="input" data-type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                    </div>

                    <div className="group">
                      <label htmlFor="mobile" className="label">Mobile No.</label>
                      <input id="mobile" type="number" className="input" data-type="number" placeholder="Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>

                    <div className="group">
                      <input type="submit" className="button" defaultValue="Sign Up" />
                    </div>
                    <div className="hr" />
                    <div className="foot-lnk">
                      <label htmlFor="tab-1">Already Member?
                      </label></div>
                  </div>
                </form>)
              }


            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Login