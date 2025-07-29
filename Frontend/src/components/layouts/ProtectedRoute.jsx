// src/components/layout/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const adminUser = localStorage.getItem('adminUser');

  if (!adminUser) {
    // Jika tidak ada user admin di localStorage, arahkan ke halaman login
    return <Navigate to="/admin/login" />;
  }

  // Jika ada, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;