import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../../auth_service";
const { getCurrentAdmin } = AuthService;
const SenatorRoute = () => {
  const location = useLocation();

  return true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SenatorRoute;
