import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function PrivateRoute() {
  // Get JWT token from cookies
  const jwtToken = Cookies.get("jwt-authorization");
  // If token exists, allow access to nested routes (Outlet)
  // Otherwise, redirect user to "not-authorized" page
  return jwtToken ? <Outlet /> : <Navigate to="/not-authorized" />;
}