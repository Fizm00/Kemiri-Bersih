import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const adminUser = localStorage.getItem('adminUser');

  if (!adminUser) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;