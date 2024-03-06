// import React, { useState } from 'react'
// import './login-signup.css'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';


// function Login() {
//   const navigate=useNavigate();

//   const[email,setEmail]=useState("");
//   const[password,setPass]=useState("");

//   const result=async(e)=>{
//     e.preventDefault();
//     const response = await axios.post("http://localhost:8080/login",{
//       email:email,
//       password:password,
//     })
//     console.log('result',result);
//     const data=response.data
//     if(data.isAdmin!==true){
//       if(email=='' && password==''){
//         alert('please enter email and password..!')
//       }else{
//         localStorage.setItem('token',response.data.token)
//         navigate('/');
//       }
//       // alert('Admin login')
//     }else{
//       // alert('User Login')
//       navigate('/login')
//     }
// }

//   return (
//     <>



//       <div id="log-forms">
//         <form className="form-signin" onSubmit={result}>
//           <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}> Sign in</h1>
//           {/* <div className="social-login">
//             <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f" /> Sign in with Facebook</span> </button>
//             <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g" /> Sign in with Google+</span> </button>
//           </div>
//           <p style={{ textAlign: 'center' }}> OR</p> */}
//           <input type="email" id="inputEmail" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" />
//           <input type="password" id="inputPassword" className="form-control" value={password} onChange={(e)=>setPass(e.target.value)} placeholder="Password"  /><br /><br />
//           <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt" /> Sign in</button>
//           <a href="#" id="forgot_pswd">Forgot password?</a>
//           <hr />
//           <p>Don't have an account!</p> 
//           <Link to='/signup' className="btn btn-primary btn-block"><i className="fas fa-user-plus" /> Sign up New Account</Link>
//           <Link to='/' id="cancel_signup"><i className="fas fa-angle-left" /> Back</Link>

//         </form>
//         {/* <form action="/reset/password/" className="form-reset">
//           <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required autofocus />
//           <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
//   <a href="#" id="cancel_reset"><i className="fas fa-angle-left" /> Back</a> */}
//       {/* </form>  */}

//        </div>

//     </>
//   )
// }

// export default Login
import React, { useState } from 'react'
import './login-signup.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const result = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8080/login", {
      email: email,
      password: password,
    })
    // console.log('result', result);
    const data = response.data
    if (data.isAdmin !== true) {
      if (email == '' && password == '') {
        alert('please enter email and password..!')
      } else {
        localStorage.setItem('token', response.data.token)
        navigate('/');
      }
      // alert('Admin login')
    } else {
      // alert('User Login')
      navigate('/login')
    }
  }

  // register

  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");


  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);

  const data = async (e) => {

    e.preventDefault();
    axios.post('http://localhost:8080/regis', {
      name: name,
      email: emails,
      mobile: mobile,
      password: pass,

    })

    localStorage.setItem("user", JSON.stringify({ name, email, password, mobile }));
    if (name === '' || emails === '' || pass === '' || mobile === '') {
      alert(setError(true));
    } else {
      setError(false);
      setSubmit(true);
      navigate('/login');
    }

  }



  return (

    <>
      <div className='root'>
        <div className="login-wrap">
          <div className="login-html">
            <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
            <div className="login-form">
              <form className="sign-in-htm" onSubmit={result}>
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
              </form>
              <form onSubmit={data}>
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
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Login
