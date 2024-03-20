import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AHome from './Components/Home';
import Login from './Components/Login';
// import Signup from './Components/Signup';
import AddProduct from './Components/AddProduct'
import ViewProduct from './Components/ViewProduct';
import UpdateProduct from './Components/UpdateProduct';

import AddCategory from './Components/AddCategory'
import ViewCategory from './Components/ViewCategory';

import AddSubCateg from './Components/AddSubcateg'
import ViewSubCateg from './Components/ViewSubCateg';

import ManageUser from './Components/ManageUser';

import ViewOrder from './Components/ViewOrder';
import ViewDispatchOrder from './Components/ViewDispatchOrder';
import ViewDeliveredOrder from './Components/ViewDeliveredOrder';


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
          <Route path="/sub-categorylist" element={<ViewSubCateg />} />
          <Route path="/orderlist" element={<ViewOrder />} />

          <Route path="/manageuser" element={<ManageUser />} />

          <Route path="/dispatchorder" element={<ViewDispatchOrder />} />
          <Route path="/deliveredorder" element={<ViewDeliveredOrder />} />



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
