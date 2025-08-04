import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAccounts } from '../lib/data';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminUser')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const account = adminAccounts.find(
      acc => acc.username === username && acc.password === password
    );
    if (account) {
      localStorage.setItem('adminUser', JSON.stringify(account));
      navigate('/admin/dashboard');
    } else {
      setError('Username atau password salah.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl flex items-center justify-between">
          {/* Left side - Welcome content */}
          <motion.div
            className="hidden lg:block flex-1 pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="max-w-lg">
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">Admin Portal</span>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Kemiri Bersih
                <span className="text-emerald-400 block">KKN Management Platform</span>
              </motion.h1>

              <motion.p
                className="text-slate-300 text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Platform manajemen untuk program KKN Kemiri Bersih, mendukung pengelolaan bank sampah dan sistem kebersihan lingkungan di Dusun Kemiri.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center text-slate-300">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-chart-line text-emerald-400 text-sm"></i>
                  </div>
                  <span>Dashboard analitik real-time</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-users text-teal-400 text-sm"></i>
                  </div>
                  <span>Manajemen pengguna terpusat</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-shield-alt text-cyan-400 text-sm"></i>
                  </div>
                  <span>Keamanan data tingkat enterprise</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Login form */}
          <motion.div
            className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-user-shield text-white text-xl"></i>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
              <p className="text-slate-300">Masuk ke panel administrasi</p>
            </div>

            {/* Back button */}
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white transition-colors duration-200 mb-6"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-arrow-left"></i>
              <span>Kembali ke beranda</span>
            </motion.button>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-slate-200 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan username"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-slate-400"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                    disabled={isLoading}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Memproses...
                  </div>
                ) : (
                  'Masuk ke Dashboard'
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-slate-400 text-xs">
                © 2025 Kemiri Bersih KKN Management Platform. Secure & Professional.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;