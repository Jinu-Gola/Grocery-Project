import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AHome from './Components/Home';
import Login from './Components/Login';
// import Signup from './Components/Signup';
import AddProduct from './Components/AddProduct'
import AddCategory from './Components/AddCategory'
import AddSubCateg from './Components/AddSubcateg'

import ViewProduct from './Components/ViewProduct';
import ViewCategory from './Components/ViewCategory';

import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <>
      {/* <div className="container-scroller">
        {/* partial:partials/_sidebar.html */}
      {/* <Sidebar /> */}
      {/* partial */}
      {/* <div className="container-fluid page-body-wrapper"> */}
      {/* partial:partials/_navbar.html */}
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          {/* Admin Router */}
          <Route path="/home" element={<AHome />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addcat" element={<AddCategory />} />
          <Route path='/addsubcat' element={<AddSubCateg />} />
          <Route path="/productlist" element={<ViewProduct />} />
          <Route path="/categorylist" element={<ViewCategory />} />

          <Route path="/updateproduct/:id" element={<UpdateProduct />} />

          {/* End of Admin Router */}
        </Routes>
      </BrowserRouter>
      {/* </div>
      </div> */}
    </>
  );
}

export default App;
