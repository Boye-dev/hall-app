import { Navigate, useLocation, Outlet } from "react-router-dom";
import AuthService from "../../auth_service";
const { getCurrentType } = AuthService;
const SenatorRoute = () => {
  const location = useLocation();

  return getCurrentType() === "senator" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SenatorRoute;
