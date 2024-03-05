import React, { useContext } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Main from './Main'
// import { Globle } from '..'
// import Footer from './Footer'
function Home() {
  // const [data] = useContext(Globle);
  // console.log(data);  
  
  return (
    <>
      <div className="container-scroller">
        {/* partial:partials/_sidebar */}
        <Sidebar />
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_navbar */}
          <Navbar  />
          {/* partial */}
          <Main />
          {/* partial:partials/_footer */}
          {/* <Footer /> */}
          {/* main-panel ends */}

          {/* partial */}
        </div>

        {/* page-body-wrapper ends */}
      </div>

    </>
  )
}

export default Home
