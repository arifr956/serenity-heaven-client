import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Layout/Root';
import Home from './Components/Home/Home';
import Apartments from './Components/Home/Apartments';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/AuthProvider';
import Login from './Components/User/Login';
import Registration from './Components/User/Registration/Registration';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';

import AdminHome from './Components/Dashboard/Admin/AdminHome';
import ManageMember from './Components/Dashboard/Admin/ManageMember';
import Announcements from './Components/Dashboard/Admin/Announcements';

import UserHome from './Components/Dashboard/User/UserHome';
import DashboardAnnouncement from './Components/Dashboard/DashboardAnnouncement';
import PaymentHistory from './Components/Dashboard/Member/PaymentHistory';
import MakePayment from './Components/Dashboard/Member/MakePayment';
import AdminRoute from './Routes/AdminRoute';
import Agreements from './Components/Dashboard/Admin/Agreements';
import CouponsPage from './Components/Dashboard/Admin/CouponsPage';
import PayNow from './Components/Dashboard/Member/PayNow';


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
        path: "/apartments",
        element: <Apartments></Apartments>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "registration",
        element: <Registration></Registration>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

       // admin routes
      {
        path: "coupons",
        element: <AdminRoute><CouponsPage></CouponsPage></AdminRoute>
      },
      {
        path: "adminHome",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "manageMember",
        element: <AdminRoute><ManageMember></ManageMember></AdminRoute>
      },
      {
        path: "announcements",
        element: <AdminRoute><Announcements></Announcements></AdminRoute>
      },
      {
        path: "agreements",
        element: <AdminRoute><Agreements></Agreements></AdminRoute>
      },

      //user routes
      {
        path: "userHome",
        element: <UserHome></UserHome>
      },
      {
        path: "dashboardAnnouncement",
        element: <DashboardAnnouncement></DashboardAnnouncement>
      },

      //member routes
      {
        path: "memberHome",
        element: <UserHome></UserHome>
      },
      {
        path: "history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "makePayment",
        element: <MakePayment></MakePayment>
      },
      {
        path: "payNow",
        element: <PayNow></PayNow>
      },
    

    ]
  }
]);

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className='max-w-screen-xl mx-auto bg-[#394251]'>
            <RouterProvider router={router} />
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);