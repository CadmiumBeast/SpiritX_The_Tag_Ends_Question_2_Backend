import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;