import './login-signup.css'
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgetPassword from './ForgetPassword';

function Login() {

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

  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [err, setErr] = useState('');
  const [captchaInitialized, setCaptchaInitialized] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!captchaInitialized) {
      initializeCaptcha();
      setCaptchaInitialized(true);
    }
  }, [captchaInitialized]);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = '';
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha.split('').sort(() => Math.random() - 0.5).join('');
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ['black', 'black'];
    const letterSpace = 150 / captcha.length;

    // Set background color to white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      const xPos = xInitialSpace + i * letterSpace;
      const yPos = Math.floor(Math.random() * 16 + 25);

      ctx.font = 'bold 20px Roboto Mono';
      ctx.fillStyle = 'black'; // Set text color to black
      ctx.fillText(captcha[i], xPos, yPos); // Actual text
    }
  };

  const initializeCaptcha = () => {
    setUserInput('');
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const result = async (e) => {
    // e.preventDefault();
    if (userInput === captchaText) {

      try {
        //  if (email == '' && password == '') {
        //    alert('please enter email and password..!')
        //  } else {
        const response = await axios.post("http://localhost:8080/login", {
          email: email,
          password: password,
        })

        // localStorage.setItem("user", JSON.stringify({  email, password}));
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', response.data.uid)

        //  }
        navigate('/');

      } catch (error) {
        console.log('Login failed:', error);
        setErr('Please enter a valid id and password');
      }
    } else {
      setErr('Captcha is incorrect');
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

  }
  // const handleCaptchaSubmit = async () => {
  //   if (userInput === captchaText) {
  //     try {
  //       const res = await axios.post('http://localhost:5000/login', {
  //         email,
  //         password,
  //       });
  //       localStorage.setItem('token', res.data.tok);
  //       navigate(res.data.data.isAdmin ? '/admin' : '/home');
  //     } catch (e) {
  //       console.log('Login failed:', e);
  //       setErr('Please enter a valid id and password');
  //     }
  //   } else {
  //     setErr('Captcha is incorrect');
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!email || !password) {
      setErr('Please fill in all fields');
      return;
    }
    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      setErr('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setErr('Password should be at least 6 characters long');
      return;
    }
    if (!userInput) {
      setErr('Please fill in the captcha');
      return;
    }
    result();
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
                step === 0 ? (<form className="sign-in-htm" onSubmit={handleFormSubmit}>
                  <div className="group">
                    <label htmlFor="email" className="label">Email</label>
                    <input id="user" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  </div>
                  <div className="container">
                    <div className="wrapper">
                      <canvas
                        // className='canvas'

                        ref={canvasRef}
                        width="200"
                        height="70"
                      // color="white"
                      ></canvas>
                      <br />
                      <button
                        // className="btn btn-primary"
                        // className="icon"
                        className="button "
                        onClick={initializeCaptcha}

                      >
                        <i className="icon" />
                      </button>

                    </div>
                    {/* <br /> */}
                    <div className="group">
                      <input
                        // className="form-control"
                        className="input"
                        type="text"
                        placeholder="Enter captcha text in the image"
                        value={userInput}
                        onChange={handleUserInputChange}

                      />
                    </div>
                  </div>
                  {/* <div className="group">
                      <div>{err}</div>
                    </div> */}

                  {/* <div className="group">
                    <input id="check" type="checkbox" className="check" defaultChecked />
                    <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
                  </div> */}
                  <div className="group">
                    <input type="submit" className="button" defaultValue="Sign In" />
                  </div>
                  <div className="hr" />
                  <div className="foot-lnk">
                    <Link to='/forgetpass'>Forgot Password?</Link>
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
                </form>
                )}
            </div>
          </div>
        </div>
      </div >



    </>
  )
}

export default Login;