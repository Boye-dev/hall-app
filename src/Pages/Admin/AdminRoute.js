import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../../auth_service";
const { getCurrentAdmin } = AuthService;
const AdminRoute = () => {
  const location = useLocation();

  return true ? (
    <Outlet />
  ) : (
    <Navigate to="/login-admin" state={{ from: location }} replace />
  );
};

export default AdminRoute;
