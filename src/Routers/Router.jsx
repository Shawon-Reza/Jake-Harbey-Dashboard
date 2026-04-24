import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../components/Overview/Overview";
import Settings from "../components/Settings/Settings";
import Subscription from "../components/Subscription/Subscription";
import UserProfileDashboard from "../components/UserProfileDashboard UserProfileDashboard/UserProfileDashboard";
import SignIn from "../Pages/Auth/SignIn";
import { PrivateRoute } from "./PrivetRoute";
import Inbox from "../components/Inbox/Inbox";
import Jobs from "../components/Jobs/Jobs";
import Technicians from "../components/Technicians/Technicians";
import Customers from "../components/Customers/Customers";
import Notifications from "../components/Notifications/Notifications";
import UserManage from "../components/UserManage/UserManage";
import CustomerProfileView from "../components/Customers/CustomerProfileView";
import JobDetails from "../components/Shared/JobDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    // errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "/users",
        element: <UserManage />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "/technicians",
        element: <Technicians />,
      },
      {
        path: "/clients/:id",
        element: <UserProfileDashboard />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/customers/:id",
        element: <CustomerProfileView />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },

      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);
