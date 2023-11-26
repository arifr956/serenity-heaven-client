import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Layout/Root';
import Home from './Components/Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {

      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <div className='max-w-screen-xl mx-auto bg-[#394251]'>
            <RouterProvider router={router} />
          </div>
  </React.StrictMode>,
)
