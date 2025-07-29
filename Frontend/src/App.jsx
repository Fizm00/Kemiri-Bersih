import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import UsersListPage from './pages/UsersListPage';
import AddUserPage from './pages/AddUserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leaderboard" element={<UserDashboardPage />} /> {/* <-- TAMBAHKAN RUTE INI */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UsersListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/add"
        element={
          <ProtectedRoute>
            <AddUserPage />
          </ProtectedRoute>
        }
      />
      {/* Rute admin lain akan ditambahkan di sini nanti */}
    </Routes>
  );
}

export default App;