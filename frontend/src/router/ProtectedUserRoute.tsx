import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // Not logged in
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
