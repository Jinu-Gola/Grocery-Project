
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import './login-signup.css'


function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [mobile, setMobile] = useState("");


  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);

  const data = async (e) => {

    e.preventDefault();
    axios.post('http://localhost:8080/regis', {
      name: name,
      email: email,
      mobile: mobile,
      password: password,

    })

    localStorage.setItem("user", JSON.stringify({ name, email, password, mobile }));
    if (name === '' || email === '' || password === '' || mobile === '') {
      alert(setError(true));
    } else {
      setError(false);
      setSubmit(true);
      navigate('/login');
    }

  }



  return (
    <>

      {/* <h1>Sign Up</h1>
      <div id='reg-form'> */}
      <div className='root'>
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" /><label htmlFor="tab-1" className="tab"><Link to='/login' >Sign In</Link></label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab"><Link to='/signup'>Sign Up</Link></label>
            {/* <div className="login-form"> */}
              <form onSubmit={data}>
                <div className="sign-up-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">Username</label>
                    <input id="user" type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                  </div>

                  <div className="group">
                    <label htmlFor="pass" className="label">Email Address</label>
                    <input id="pass" type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                  </div>

                  <div className="group">
                    <label htmlFor="mobile" className="label">Mobile No.</label>
                    <input id="pass" type="number" className="input" data-type="password" placeholder="Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                  </div>

                  <div className="group">
                    <button type="submit" className="btn btn-primary btn-block"><i className="fas fa-user-plus" />Sign Up</button>
                    <Link to='/login' id="cancel_signup"><i className="fas fa-angle-left" /> Back</Link>

                  </div>
                  <div className="hr" />
                  <div className="foot-lnk">
                    <label htmlFor="tab-1">Already Member?
                    </label></div>
                </div>
              </form>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  )
}

export default Register



