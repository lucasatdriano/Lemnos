import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/notFoundPage/NotFound';
import { Home } from './pages/homePage/Home';
import { About } from './pages/aboutPage/About';
import { Login } from './pages/loginPage/Login';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    errorElement: <NotFound />,
    children: [
      { path:"/", element: <Home />},
      // { path: "/*", element: <NotFound />},
      { path:"/about", element: <About />},
      { path:"/login", element: <Login />}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)