import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Overview from "../components/Overview/Overview";
import Recipe from "../components/Recipe/Recipe";
import Settings from "../components/Settings/Settings";
import Subscription from "../components/Subscription/Subscription";
import Clients from "../components/Clients/Clients";
import Workout from "../components/Workout/Workout";
import UserProfileDashboard from "../components/UserProfileDashboard UserProfileDashboard/UserProfileDashboard";
import RecipeDetails from "../components/RecipeDetails/RecipeDetails";
import SignIn from "../Pages/Auth/SignIn";
import RecipeUploadForm from "../components/Recipe/RecipeUploadForm";
import RecipeUpdate from "../components/Recipe/RecipeUpdate";
import WorkoutUploadForm from "../components/Workout/WorkoutUploadForm";
import WorkoutDetails from "../components/WorkoutDetails/WorkoutDetails";
import WorkoutUpdate from "../components/Workout/WorkoutUpdate";
import { PrivateRoute } from "./PrivetRoute";
import AddPackage from "../components/Subscription/AddPackage";
import EditPackage from "../components/Subscription/EditPackage";
import Inbox from "../components/Inbox/Inbox";
import Jobs from "../components/Jobs/Jobs";
import Technicians from "../components/Technicians/Technicians";
import Customers from "../components/Customers/Customers";
import Notifications from "../components/Notifications/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Overview />,
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
