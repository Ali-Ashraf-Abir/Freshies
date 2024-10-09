import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import HomeBody from './Components/Home/HomeBody.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import ContextApi from './Components/ContextApi/ContextApi.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Dashboard from './Components/Profile/Dashboard.jsx';
import Account from './Components/Profile/Account.jsx';
import Security from './Components/Profile/Security.jsx';
import Business from './Components/Profile/Business.jsx';
import MyItems from './Components/Profile/MyItems.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path: "/",
        element:<HomeBody></HomeBody>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      {
        path: "/register",
        element:<Register></Register>
      },
      // paths for dashboard
      {
        path: "/profile",
        element:<Profile></Profile>,

        children:[{
          path:'/profile/dashboard',
          element:<Dashboard></Dashboard>
        },
        {
          path:'/profile/account',
          element:<Account></Account>
        },
        {
          path:'/profile/security',
          element:<Security></Security>
        },
        {
          path:'/profile/business',
          element:<Business></Business>
        },
        {
          path:'/profile/myitems',
          element:<MyItems></MyItems>
        }

      ],
       
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi> 
      <RouterProvider router={router} />
      </ContextApi>
  </StrictMode>,
)
