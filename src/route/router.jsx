import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/root";
import LandingLayout from "../layout/Landing";
// import LayoutApplications from "../layout/layoutApplications";
import LoginCover from "../pages/login-cover";

// import LayoutSetting from "../layout/layoutSetting";

import LayoutAuth from "../layout/layoutAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";

//Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

//super admin home
import Landing from "../pages/landing-page/Landing";

//private routes
import Resume from "../pages/resume/Resume";
import CoverLetter from "../pages/cover-letter/CoverLetter";
import QAndA from "../pages/q&a/QAndA";
import Interview from "../pages/interview/Interview";
import Analytics from "../pages/analytics/Analytics";
import Archive from "../pages/archive/Archive";
import Profile from "../pages/profile/Profile";
import Logout from "../pages/Logout";
import TechInterview from "../pages/interview/TechInterview";

import InterviewResult from "../pages/interview/InterviewResult";

const routes = [
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
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
      {
        path: "/resume",
        element: (
          <ProtectedRoute>
          <Resume />
           </ProtectedRoute>
        ),
      },
      {
        path: "/cover-letter",
        element: (
          <ProtectedRoute>
          <CoverLetter />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/q-and-a",
      //   element: (
      //     // <ProtectedRoute>
      //     <QAndA />
      //     // </ProtectedRoute>
      //   ),
      // },
      {
        path: "/q&a/behavioral",
        element: (
          <ProtectedRoute>
          <QAndA />
          </ProtectedRoute>
        ),
      },
      {
        path: "/q&a/technical",
        element: (
          <ProtectedRoute>
          <QAndA />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview",
        element: (
          <ProtectedRoute>
          <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview/behavioral",
        element: (
          <ProtectedRoute>
          <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview/technical",
        element: (
          <ProtectedRoute>
           {/* <TechInterview /> */}
            <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview",
        element: (
          <ProtectedRoute>
          <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview/result",
        element: (
          <ProtectedRoute>
          <InterviewResult />
          </ProtectedRoute>
        ),
      },
      {
        path: "/analytics",
        element: (
          <ProtectedRoute>
          <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "/archive",
        element: (
          <ProtectedRoute>
          <Archive />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute>
          <Logout />
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
