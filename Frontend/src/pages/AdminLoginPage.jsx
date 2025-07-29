import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAccounts } from '../lib/data';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- 1. State baru
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminUser')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const account = adminAccounts.find(
      acc => acc.username === username && acc.password === password
    );
    if (account) {
      localStorage.setItem('adminUser', JSON.stringify(account));
      navigate('/admin/dashboard');
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-200 flex items-center justify-center p-4">
      <motion.div
        className="relative max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Kembali</span>
        </motion.button>
        <div className="text-center mb-8">
          <motion.div
            className="inline-block p-4 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-lg mb-4"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white text-lg">♻️</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-800">Waste Bank Admin</h1>
          <p className="text-slate-500 mt-2">Masuk untuk mengelola sistem kebersihan lingkungan</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg bg-white/80 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </motion.div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                <input
                  // 2. Ganti tipe input berdasarkan state showPassword
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg bg-white/80 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                  placeholder="Masukkan password"
                  required
                />
                {/* 3. Tombol untuk mengubah state showPassword */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </button>
              </div>
            </motion.div>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Masuk
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;