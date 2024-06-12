import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import NotFound from './pages/notFoundPage/NotFound';
import Home from './pages/homePage/Home';
import About from './pages/aboutPage/About';
import Login from './pages/userPage/Login';
import Product from './pages/productPage/Product';
import ProductFilter from './pages/productFilterPage/ProductFilter'
import Cart from './pages/cartPage/Cart';
import BuyPage from './pages/buyPage/Buy';

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/productFilter/:category" element={<ProductFilter />} />
        <Route path="/productFilter/:brand" element={<ProductFilter />} />
        <Route path="/productFilter" element={<ProductFilter />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<BuyPage/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);