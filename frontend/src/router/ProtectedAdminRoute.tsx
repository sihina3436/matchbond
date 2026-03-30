import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  role?: string;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
  role,
}) => {
  const { admin } = useSelector((state: RootState) => state.admin);
  const location = useLocation();

  // Not logged in
  if (!admin) {
    return <Navigate to="/admin/signin" state={{ from: location }} replace />;
  }

  // Role mismatch
  if (role && admin.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
