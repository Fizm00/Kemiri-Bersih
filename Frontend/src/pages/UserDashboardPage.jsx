import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

// Pindahkan UserCard ke luar komponen utama
const UserCard = ({ user, index, isGridMode = false, hoveredCard, setHoveredCard, setSelectedUser }) => {
    const getRankDisplay = useCallback((index) => {
        const rank = index + 1;
        if (index === 0) return {
            icon: '👑',
            color: 'text-amber-500',
            bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
            border: 'border-amber-200',
            ringColor: 'ring-amber-200'
        };
        if (index === 1) return {
            icon: '🥈',
            color: 'text-slate-500',
            bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
            border: 'border-slate-200',
            ringColor: 'ring-slate-200'
        };
        if (index === 2) return {
            icon: '🥉',
            color: 'text-orange-500',
            bg: 'bg-gradient-to-br from-orange-50 to-red-50',
            border: 'border-orange-200',
            ringColor: 'ring-orange-200'
        };
        return {
            icon: `#${rank}`,
            color: 'text-slate-400',
            bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
            border: 'border-slate-200',
            ringColor: 'ring-slate-200'
        };
    }, []);

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

    const rankDisplay = getRankDisplay(index);

    const handleHoverStart = useCallback(() => {
        setHoveredCard(user.id);
    }, [user.id, setHoveredCard]);

    const handleHoverEnd = useCallback(() => {
        setHoveredCard(null);
    }, [setHoveredCard]);

    const handleClick = useCallback(() => {
        setSelectedUser(user);
    }, [user, setSelectedUser]);

    if (isGridMode) {
        return (
            <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onClick={handleClick}
                className={`${rankDisplay.bg} rounded-2xl p-6 border-2 ${rankDisplay.border} cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group`}
            >
                {/* Floating particles effect */}
                <AnimatePresence>
                    {hoveredCard === user.id && (
                        <>
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
                                    initial={{
                                        opacity: 0,
                                        x: Math.random() * 200,
                                        y: Math.random() * 200
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: -60,
                                        x: Math.random() * 40 - 20
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 2.5,
                                        delay: i * 0.1,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-6">
                    <motion.div
                        className={`text-3xl ${rankDisplay.color} drop-shadow-sm`}
                        animate={{
                            scale: hoveredCard === user.id ? 1.3 : 1,
                            rotate: hoveredCard === user.id ? 15 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {rankDisplay.icon}
                    </motion.div>
                    <div className="text-right">
                        <div className={`text-sm font-semibold ${rankDisplay.color} bg-white/50 px-3 py-1 rounded-full`}>
                            Peringkat {index + 1}
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white/50 mb-4"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        {user.name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate w-full px-2">{user.email}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                            Rp {user.balance.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center justify-center">
                            <span className="mr-2">⚖️</span>
                            {user.totalWaste} kg total sampah
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-sm"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((user.balance / 1000000) * 100, 100)}%` }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </motion.div>
        );
    }

    // List Mode
    return (
        <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/80 transition-all duration-300 cursor-pointer border border-slate-200/60 hover:border-emerald-200 hover:shadow-lg group"
            whileHover={{ scale: 1.01, x: 8 }}
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    {/* Rank */}
                    <motion.div
                        className={`w-12 h-12 ${rankDisplay.bg} rounded-xl flex items-center justify-center text-sm font-bold ${rankDisplay.color} border ${rankDisplay.border} shadow-sm`}
                        whileHover={{ rotate: 8, scale: 1.1 }}
                    >
                        {rankDisplay.icon}
                    </motion.div>

                    {/* Avatar */}
                    <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-emerald-100"
                        whileHover={{ scale: 1.15 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                            {user.name}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6">
                    <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">
                            Rp {user.balance.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-slate-500 flex items-center">
                            <span className="mr-1">⚖️</span>
                            {user.totalWaste} kg
                        </div>
                    </div>
                    <motion.div
                        className="w-2 h-8 bg-gradient-to-t from-emerald-200 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const UserDashboardPage = () => {
    const { users } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();

    // Memoize callbacks untuk menghindari re-render
    const handleSetHoveredCard = useCallback((cardId) => {
        setHoveredCard(cardId);
    }, []);

    const handleSetSelectedUser = useCallback((user) => {
        setSelectedUser(user);
    }, []);

    const handleViewModeChange = useCallback((mode) => {
        setViewMode(mode);
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleNavigateBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleCloseModal = useCallback(() => {
        setSelectedUser(null);
    }, []);

    useEffect(() => {
    }, []);

    const sortedUsers = [...users].sort((a, b) => b.balance - a.balance);
    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
            {/* Animated Background */}
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
                className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
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
                            onClick={handleNavigateBack}
                        >
                            <span className="mr-2">←</span>
                            Kembali
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Title Section */}
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

                {/* Controls */}
                <motion.div
                    className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Search */}
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
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-xl bg-white/90 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-1 border border-slate-200 shadow-sm">
                        <motion.button
                            onClick={() => handleViewModeChange('grid')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${viewMode === 'grid'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>📊</span>
                            <span>Grid</span>
                        </motion.button>
                        <motion.button
                            onClick={() => handleViewModeChange('list')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2 ${viewMode === 'list'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>📋</span>
                            <span>List</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            : "space-y-3"
                    }
                >
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <UserCard
                                key={user.id}
                                user={user}
                                index={index}
                                isGridMode={viewMode === 'grid'}
                                hoveredCard={hoveredCard}
                                setHoveredCard={handleSetHoveredCard}
                                setSelectedUser={handleSetSelectedUser}
                            />
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-16"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <span className="text-slate-400 text-2xl">🔍</span>
                            </motion.div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Tidak ada hasil</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Tidak ditemukan warga dengan kata kunci "{searchTerm}". Coba gunakan kata kunci yang berbeda.
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Stats Footer */}
                {filteredUsers.length > 0 && (
                    <motion.div
                        className="mt-12 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center justify-between text-center">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">{filteredUsers.length}</div>
                                <div className="text-sm text-slate-500">Total Peserta</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-emerald-600">
                                    Rp {filteredUsers.reduce((sum, user) => sum + user.balance, 0).toLocaleString('id-ID')}
                                </div>
                                <div className="text-sm text-slate-500">Total Saldo</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-teal-600">
                                    {filteredUsers.reduce((sum, user) => sum + user.totalWaste, 0)} kg
                                </div>
                                <div className="text-sm text-slate-500">Total Sampah</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* User Detail Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-200"
                            initial={{ scale: 0.8, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 40 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-xl ring-4 ring-emerald-100"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </motion.div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedUser.name}</h3>
                                <p className="text-slate-500 mb-6">{selectedUser.email}</p>

                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-100">
                                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                                        Rp {selectedUser.balance.toLocaleString('id-ID')}
                                    </div>
                                    <div className="text-slate-600 flex items-center justify-center space-x-2">
                                        <span>⚖️</span>
                                        <span>{selectedUser.totalWaste} kg total sampah dikumpulkan</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <motion.button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Detail
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDashboardPage;