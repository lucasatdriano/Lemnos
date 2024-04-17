import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/notFoundPage/NotFound';
import { Home } from './pages/homePage/Home';
import { About } from './pages/aboutPage/About';
import { Login } from './pages/userPage/User';
import { Product } from './pages/productPage/Product';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path:"", element: <Home />},
      { path:"/product/:id", element: <Product />},
      { path:"/about", element: <About />},
      { path:"/login", element: <Login />},
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);