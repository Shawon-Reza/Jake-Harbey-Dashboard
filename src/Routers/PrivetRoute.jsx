import { Navigate, useLocation } from "react-router-dom";
import { useCurrentUserQuery } from "../Api/authApi";

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem("auth")) || {};
  } catch {
    return {};
  }
};

export function PrivateRoute({ children }) {
  const location = useLocation();
  const { data: currentUser, isLoading, isError } = useCurrentUserQuery();
  const hasAccessToken = Boolean(getStoredAuth()?.access);

  if (!hasAccessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div className="p-6 text-gray-500">Checking access...</div>;
  }

  if (isError) {
    localStorage.removeItem("auth");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!currentUser || currentUser?.role !== "admin") {
    localStorage.removeItem("auth");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
