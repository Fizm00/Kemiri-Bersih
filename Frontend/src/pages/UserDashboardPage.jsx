import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext'; // Import context to get users

const UserDashboardPage = () => {
    const { users } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const navigate = useNavigate();
    
    // Animasi saat mount
    useEffect(() => {
        // No-op: previously used showAnimation, now removed
    }, []);
    // Urutkan dan filter pengguna
    const sortedUsers = [...users].sort((a, b) => b.balance - a.balance);
    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fungsi untuk mendapatkan ranking dengan style yang lebih clean
    const getRankDisplay = (index) => {
        const rank = index + 1;
        if (index === 0) return { icon: '👑', color: 'text-amber-500', bg: 'bg-gradient-to-br from-amber-50 to-yellow-50', border: 'border-amber-200' };
        if (index === 1) return { icon: '🥈', color: 'text-slate-500', bg: 'bg-gradient-to-br from-slate-50 to-gray-50', border: 'border-slate-200' };
        if (index === 2) return { icon: '🥉', color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-50 to-red-50', border: 'border-orange-200' };
        return { icon: `#${rank}`, color: 'text-slate-400', bg: 'bg-gradient-to-br from-slate-50 to-gray-50', border: 'border-slate-200' };
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, -120, 0],
                        y: [0, 120, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Header */}
            <motion.header 
                className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <motion.div 
                            className="flex items-center space-x-4"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-3">
                                <motion.div 
                                    className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-white text-lg">♻️</span>
                                </motion.div>
                                <div>
                                    <h1 className="text-xl font-semibold text-slate-900">Kemiri Bersih</h1>
                                    <p className="text-sm text-slate-500">Community Leaderboard</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-lg hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onClick={() => navigate('/')}
                        >
                            <span className="mr-2">←</span>
                            Kembali
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Page Header */}
                <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-emerald-800 bg-clip-text text-transparent mb-2">
                        Papan Peringkat Komunitas
                    </h2>
                    <motion.p 
                        className="text-slate-600 max-w-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Pantau kontribusi warga dalam menjaga kebersihan lingkungan dan berlomba menjadi pahlawan lingkungan terbaik.
                    </motion.p>
                </motion.div>

                {/* Search Bar and View Toggle */}
                <motion.div 
                    className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="relative max-w-md flex-1">
                        <motion.div 
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            animate={{ rotate: searchTerm ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-slate-400 text-sm">🔍</span>
                        </motion.div>
                        <motion.input
                            type="text"
                            placeholder="Cari berdasarkan nama atau email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl bg-white/80 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-slate-200">
                        <motion.button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                viewMode === 'grid' 
                                    ? 'bg-emerald-600 text-white shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📊 Grid
                        </motion.button>
                        <motion.button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                viewMode === 'list' 
                                    ? 'bg-emerald-600 text-white shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📋 List
                        </motion.button>
                    </div>
                </motion.div>

                {/* Stats Cards for Top 3 - Only show in grid mode */}
                {filteredUsers.length > 0 && viewMode === 'grid' && (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredUsers.slice(0, 3).map((user, index) => {
                            const rankDisplay = getRankDisplay(index);
                            return (
                                <motion.div
                                    key={user.id}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    onHoverStart={() => setHoveredCard(user.id)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    onClick={() => setSelectedUser(user)}
                                    className={`${rankDisplay.bg} rounded-2xl p-6 border-2 ${rankDisplay.border} cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
                                    style={{
                                        background: hoveredCard === user.id 
                                            ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(16,185,129,0.1) 100%)'
                                            : undefined
                                    }}
                                >
                                    {/* Floating particles effect */}
                                    <AnimatePresence>
                                        {hoveredCard === user.id && (
                                            <>
                                                {[...Array(6)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1 h-1 bg-emerald-500 rounded-full"
                                                        initial={{ 
                                                            opacity: 0, 
                                                            x: Math.random() * 100,
                                                            y: Math.random() * 100
                                                        }}
                                                        animate={{ 
                                                            opacity: [0, 1, 0],
                                                            y: -50,
                                                            x: Math.random() * 20 - 10
                                                        }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ 
                                                            duration: 2,
                                                            delay: i * 0.1,
                                                            repeat: Infinity
                                                        }}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex items-center justify-between mb-4">
                                        <motion.div 
                                            className={`text-3xl ${rankDisplay.color}`}
                                            animate={{ 
                                                scale: hoveredCard === user.id ? 1.2 : 1,
                                                rotate: hoveredCard === user.id ? 10 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {rankDisplay.icon}
                                        </motion.div>
                                        <motion.div 
                                            className="text-right"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="text-sm font-medium text-slate-600">Peringkat {index + 1}</div>
                                        </motion.div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3 mb-4">
                                        <motion.div 
                                            className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            {user.name.charAt(0).toUpperCase()}
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-slate-900 truncate">{user.name}</h3>
                                            <p className="text-sm text-slate-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <motion.div 
                                            className="text-2xl font-bold text-emerald-600"
                                            animate={{ 
                                                scale: hoveredCard === user.id ? 1.05 : 1 
                                            }}
                                        >
                                            Rp {user.balance.toLocaleString('id-ID')}
                                        </motion.div>
                                        <div className="text-sm text-slate-500 flex items-center">
                                            <span className="mr-1">⚖️</span>
                                            {user.totalWaste} kg total sampah
                                        </div>
                                    </motion.div>

                                    {/* Progress bar */}
                                    <motion.div 
                                        className="mt-4 bg-slate-200 rounded-full h-2 overflow-hidden"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                    >
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(user.balance / 1000000) * 100}%` }}
                                            transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
                                        />
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Full Leaderboard */}
                <motion.div 
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="px-6 py-4 border-b border-slate-200/50 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <h3 className="text-lg font-semibold text-slate-900">Semua Peserta</h3>
                        <p className="text-sm text-slate-500 mt-1">{filteredUsers.length} warga terdaftar</p>
                    </div>

                    <div className="divide-y divide-slate-200/50">
                        <AnimatePresence>
                            {filteredUsers.map((user, index) => {
                                const rankDisplay = getRankDisplay(index);
                                return (
                                    <motion.div 
                                        key={user.id} 
                                        className="px-6 py-4 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300 cursor-pointer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.01 }}
                                        onClick={() => setSelectedUser(user)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                                <motion.div 
                                                    className={`w-12 h-12 ${rankDisplay.bg} rounded-xl flex items-center justify-center text-sm font-bold ${rankDisplay.color} border ${rankDisplay.border}`}
                                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                                >
                                                    {rankDisplay.icon}
                                                </motion.div>
                                                <motion.div 
                                                    className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    {user.name.charAt(0).toUpperCase()}
                                                </motion.div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-semibold text-slate-900 truncate">{user.name}</h4>
                                                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <motion.div 
                                                className="flex items-center space-x-8"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-emerald-600">
                                                        Rp {user.balance.toLocaleString('id-ID')}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {user.totalWaste} kg sampah
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {filteredUsers.length === 0 && (
                        <motion.div 
                            className="px-6 py-12 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div 
                                className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <span className="text-slate-400 text-xl">🔍</span>
                            </motion.div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Tidak ada hasil</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Tidak ditemukan warga dengan kata kunci "{searchTerm}". Coba gunakan kata kunci yang berbeda.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </main>

            {/* User Detail Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedUser(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <motion.div 
                                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </motion.div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedUser.name}</h3>
                                <p className="text-slate-500 mb-4">{selectedUser.email}</p>
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-4">
                                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                                        Rp {selectedUser.balance.toLocaleString('id-ID')}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {selectedUser.totalWaste} kg total sampah dikumpulkan
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => setSelectedUser(null)}
                                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Tutup
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDashboardPage;