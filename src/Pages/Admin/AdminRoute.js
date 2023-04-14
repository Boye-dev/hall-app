import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../../auth_service";
const { getCurrentType } = AuthService;
const AdminRoute = () => {
  const location = useLocation();

  return getCurrentType() === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login-admin" state={{ from: location }} replace />
  );
};

export default AdminRoute;
