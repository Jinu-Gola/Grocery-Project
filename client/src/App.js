import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Spinner from './components/Spinner';
import Home from './components/Home';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Billing from './components/Billing';
import Review from './components/Review';
import Login from './components/Login-Signup/Login'
import Signup from './components/Login-Signup/Register'
import Fruits from './components/Fruits';
import Vegitables from './components/Vegitables';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate some async operation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Client Router */}
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/review" element={<Review />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

              <Route path="/fruits" element={<Fruits />} />
              <Route path="/vegitable" element={<Vegitables />} />

            {/* End of client Router */}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
