import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import LandingLayout from "../layout/Landing";
import LayoutApplications from "../layout/layoutApplications";
import LoginCover from "../pages/login-cover";

import LayoutSetting from "../layout/layoutSetting";

// import Home from "../pages/home/Home";

//My Account
import MyAccount from "../pages/my-account/MyAccount";

import LayoutAuth from "../layout/layoutAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";

//Users
import UserList from "../pages/users/Users";
//Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

//super admin home
import SuperAdminHome from "../pages/super-admin/Home";

const routes = [
  //routers for super-admin to manage domains and sitemap data
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <SuperAdminHome />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      //my account
      {
        path: "/my-account",
        element: (
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        ),
      },

      //users
      {
        path: "/users/manage-users",
        element: (
          <ProtectedRoute requiredPermission="can_manage_users">
            <UserList />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    element: <LayoutAuth />,
    children: [
      {
        path: "/authentication/login",
        element: <LoginCover />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
