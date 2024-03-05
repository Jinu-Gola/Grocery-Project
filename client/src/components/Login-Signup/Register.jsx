
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

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
     alert( setError(true));
    } else {
      setError(false);
      setSubmit(true);
      navigate('/login');
    }

  }



  return (
    <>

      <h1>Sign Up</h1>
      <div id='reg-form'>
        <form onSubmit={data} className="form-signup">
          <div className="social-login">
            <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign up with Facebook</span> </button>
          </div>
          <div className="social-login">
            <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign up with Google+</span> </button>
          </div>
          <p style={{ textAlign: 'center' }}>OR</p>
          <div>
            <input type="text" className="form-control" placeholder="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div><br />
          <div>
            <input type="email" className="form-control" name="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div><br />
          <div>
            <input type="number" className="form-control" name="mobile" placeholder="Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div><br />
          <div>
            <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPass(e.target.value)} />
          </div><br />

          <div>
            <button type="submit" className="btn btn-primary btn-block"><i className="fas fa-user-plus" />Sign Up</button>
            <Link to='/login' id="cancel_signup"><i className="fas fa-angle-left" /> Back</Link>

          </div>

        </form>
      </div>
    </>
  )
}

export default Register



