import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/notFoundPage/NotFound';
import { Home } from './pages/homePage/Home';
import { About } from './pages/aboutPage/About';
import { Login } from './pages/userPage/User';
import { Product } from './pages/productPage/Product';
import { Cart } from './pages/cartPage/Cart';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);