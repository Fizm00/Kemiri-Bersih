import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) setAdminUser(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
      ? 'bg-emerald-100 text-emerald-700'
      : 'text-slate-600 hover:bg-slate-100'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 text-base font-medium rounded-md transition-colors ${isActive
      ? 'bg-emerald-100 text-emerald-700'
      : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200/80 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* BAGIAN KIRI: LOGO */}
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white text-lg">♻️</span>
            </motion.div>
            <span className="text-lg font-bold text-slate-800 hidden sm:block">Admin Kemiri Bersih</span>
            <span className="text-sm font-bold text-slate-800 sm:hidden">Admin</span>
          </div>

          {/* BAGIAN TENGAH: NAVIGASI DESKTOP */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/admin/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/admin/users" end className={navLinkClass}>Warga</NavLink>
            <NavLink to="/admin/users/add" className={navLinkClass}>Tambah Warga</NavLink>
          </nav>

          {/* BAGIAN KANAN: INFO USER & HAMBURGER MENU */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              {adminUser?.name}
            </span>

            {/* HAMBURGER MENU BUTTON */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <i className="fas fa-times text-xl"></i>
                ) : (
                  <i className="fas fa-bars text-xl"></i>
                )}
              </motion.div>
            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200/80 bg-white/90 backdrop-blur-sm">
                {/* USER INFO ON MOBILE */}
                <div className="px-3 py-2 text-sm font-medium text-slate-700 border-b border-slate-200/50 mb-2">
                  Halo, {adminUser?.name || 'Admin'}
                </div>

                {/* NAVIGATION LINKS */}
                <NavLink
                  to="/admin/dashboard"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/users"
                  end
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-users mr-2"></i>
                  Warga
                </NavLink>
                <NavLink
                  to="/admin/users/add"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Tambah Warga
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default AdminHeader;