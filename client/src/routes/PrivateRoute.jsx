import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "../components/Loader.jsx";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
