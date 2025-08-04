import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Footer from '../components/layouts/Footer';

const UserCard = ({ user, index, isGridMode = false, isPodium = false, hoveredCard, setHoveredCard, setSelectedUser }) => {
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

    // Podium Card untuk top 3
    if (isPodium) {
        const podiumHeight = index === 0 ? 'h-80' : index === 1 ? 'h-72' : 'h-64';
        const podiumScale = index === 0 ? 'scale-110' : index === 1 ? 'scale-105' : 'scale-100';

        return (
            <motion.div
                variants={itemVariants}
                whileHover={{ y: -12, scale: index === 0 ? 1.15 : index === 1 ? 1.1 : 1.05 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onClick={handleClick}
                className={`${rankDisplay.bg} rounded-2xl p-6 border-2 ${rankDisplay.border} cursor-pointer relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group ${podiumHeight} ${podiumScale} flex flex-col justify-between`}
            >
                {/* Glowing effect for winner */}
                {index === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/20 to-amber-600/20 rounded-2xl animate-pulse" />
                )}

                {/* Floating particles effect */}
                <AnimatePresence>
                    {hoveredCard === user.id && (
                        <>
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-2 h-2 rounded-full ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-orange-400'}`}
                                    initial={{
                                        opacity: 0,
                                        x: Math.random() * 200,
                                        y: Math.random() * 200
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: -80,
                                        x: Math.random() * 60 - 30
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 3,
                                        delay: i * 0.1,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Crown or medal with animation */}
                <div className="flex flex-col items-center">
                    <motion.div
                        className={`text-6xl ${rankDisplay.color} drop-shadow-lg mb-4`}
                        animate={{
                            scale: hoveredCard === user.id ? 1.4 : 1.2,
                            rotate: hoveredCard === user.id ? (index === 0 ? [0, -10, 10, -5, 0] : 15) : 0,
                            y: index === 0 ? [0, -5, 0] : 0
                        }}
                        transition={{
                            duration: index === 0 ? 2 : 0.3,
                            repeat: index === 0 ? Infinity : 0
                        }}
                    >
                        {rankDisplay.icon}
                    </motion.div>

                    <div className={`text-lg font-bold ${rankDisplay.color} bg-white/70 px-4 py-2 rounded-full shadow-sm`}>
                        Peringkat {index + 1}
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        className={`w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-white/70 mb-4 ${index === 0 ? 'ring-amber-200' : index === 1 ? 'ring-slate-200' : 'ring-orange-200'}`}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className={`text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors ${index === 0 ? 'text-2xl' : ''}`}>
                        {user.name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate w-full px-2 mb-4">{user.email}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                        <div className={`font-bold text-emerald-600 mb-2 ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>
                            Rp {user.balance.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-slate-600 flex items-center justify-center">
                            <span className="mr-2">⚖️</span>
                            {user.totalWaste} kg total sampah
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-200 rounded-full h-4 overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full shadow-sm ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-600' :
                                index === 1 ? 'bg-gradient-to-r from-slate-500 to-gray-600' :
                                    'bg-gradient-to-r from-orange-500 to-red-600'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((user.balance / 1000000) * 100, 100)}%` }}
                            transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </motion.div>
        );
    }

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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    // Memoize callbacks untuk menghindari re-render
    const handleSetHoveredCard = useCallback((cardId) => {
        setHoveredCard(cardId);
    }, []);

    const handleSetSelectedUser = useCallback((user) => {
        setSelectedUser(user);
    }, []);

    const handleViewModeChange = useCallback((mode) => {
        setViewMode(mode);
        setCurrentPage(1); // Reset ke halaman pertama saat ganti mode
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

    const handleCurrentPageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleItemsPerPageChange = useCallback((items) => {
        setItemsPerPage(items);
        setCurrentPage(1); // Reset ke halaman pertama
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

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

    // Logic pagination yang diperbaiki
    const totalItems = filteredUsers.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // Untuk Grid Mode: Pisahkan top 3 dari pagination
    let topThree = [];
    let paginatedUsers = [];
    let showPagination = false;

    if (viewMode === 'grid') {
        // Di grid mode, top 3 selalu ditampilkan di podium (jika ada)
        topThree = filteredUsers.slice(0, 3);

        // Sisanya dipaginasi
        const remainingUsers = filteredUsers.slice(3);
        const remainingTotalPages = Math.ceil(remainingUsers.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        paginatedUsers = remainingUsers.slice(startIndex, endIndex);

        // Update pagination info untuk remaining users
        showPagination = remainingUsers.length > itemsPerPage;
        if (showPagination) {
            // Override totalPages untuk remaining users
            totalPages = remainingTotalPages;
        }
    } else {
        // Di list mode, semua user dipaginasi
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        showPagination = totalItems > itemsPerPage;
    }

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

                    {/* Items Per Page Filter */}
                    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-1 border border-slate-200 shadow-sm">
                        <span className="text-sm text-slate-600 px-2">Tampil:</span>
                        {[12, 24, 48, 72].map((count) => (
                            <motion.button
                                key={count}
                                onClick={() => handleItemsPerPageChange(count)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${itemsPerPage === count
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {count}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Content */}
                {filteredUsers.length > 0 ? (
                    <>
                        {/* Podium Section - Only in Grid Mode */}
                        {viewMode === 'grid' && topThree.length > 0 && (
                            <motion.div
                                className="mb-12"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.h3
                                    className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    🏆 Juara Komunitas 🏆
                                </motion.h3>

                                {/* Podium Layout */}
                                <div className="flex items-end justify-center gap-6 max-w-4xl mx-auto">
                                    {/* Rank 2 - Kiri */}
                                    {topThree[1] && (
                                        <motion.div
                                            className="flex-1 max-w-xs"
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <UserCard
                                                key={topThree[1].id}
                                                user={topThree[1]}
                                                index={1}
                                                isPodium={true}
                                                hoveredCard={hoveredCard}
                                                setHoveredCard={handleSetHoveredCard}
                                                setSelectedUser={handleSetSelectedUser}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Rank 1 - Tengah (Paling Tinggi) */}
                                    {topThree[0] && (
                                        <motion.div
                                            className="flex-1 max-w-xs"
                                            initial={{ opacity: 0, y: -50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.0 }}
                                        >
                                            <UserCard
                                                key={topThree[0].id}
                                                user={topThree[0]}
                                                index={0}
                                                isPodium={true}
                                                hoveredCard={hoveredCard}
                                                setHoveredCard={handleSetHoveredCard}
                                                setSelectedUser={handleSetSelectedUser}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Rank 3 - Kanan */}
                                    {topThree[2] && (
                                        <motion.div
                                            className="flex-1 max-w-xs"
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.2 }}
                                        >
                                            <UserCard
                                                key={topThree[2].id}
                                                user={topThree[2]}
                                                index={2}
                                                isPodium={true}
                                                hoveredCard={hoveredCard}
                                                setHoveredCard={handleSetHoveredCard}
                                                setSelectedUser={handleSetSelectedUser}
                                            />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Main List/Grid */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                                    : 'space-y-3'
                            }
                        >
                            {paginatedUsers.map((user, index) => {
                                // Adjust index untuk grid mode (karena top 3 sudah di podium)
                                const actualIndex = viewMode === 'grid' ? index + 3 : (currentPage - 1) * itemsPerPage + index;

                                return (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        index={actualIndex}
                                        isGridMode={viewMode === 'grid'}
                                        hoveredCard={hoveredCard}
                                        setHoveredCard={handleSetHoveredCard}
                                        setSelectedUser={handleSetSelectedUser}
                                    />
                                );
                            })}
                        </motion.div>

                        {/* Pagination */}
                        {showPagination && (
                            <motion.div
                                className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="text-sm text-slate-600">
                                    Menampilkan {Math.min(itemsPerPage, (viewMode === 'grid' ? filteredUsers.length - 3 : filteredUsers.length))} dari{' '}
                                    {viewMode === 'grid' ? filteredUsers.length - 3 : filteredUsers.length} pengguna
                                </div>

                                <div className="flex items-center space-x-2">
                                    <motion.button
                                        onClick={() => handleCurrentPageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                                    >
                                        ← Sebelumnya
                                    </motion.button>

                                    <div className="flex items-center space-x-1">
                                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <motion.button
                                                    key={pageNum}
                                                    onClick={() => handleCurrentPageChange(pageNum)}
                                                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === pageNum
                                                        ? 'bg-emerald-600 text-white shadow-sm'
                                                        : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                                                        }`}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {pageNum}
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    <motion.button
                                        onClick={() => handleCurrentPageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                                    >
                                        Selanjutnya →
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🔍
                        </motion.div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">Tidak ada pengguna ditemukan</h3>
                        <p className="text-slate-600 max-w-md mx-auto">
                            Coba ubah kata kunci pencarian atau reset filter untuk melihat semua pengguna.
                        </p>
                        <motion.button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset Pencarian
                        </motion.button>
                    </motion.div>
                )}
            </main>

            {/* User Detail Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Detail Pengguna</h3>
                                <motion.button
                                    onClick={handleCloseModal}
                                    className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>
                            </div>

                            <div className="text-center mb-6">
                                <motion.div
                                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </motion.div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-1">{selectedUser.name}</h4>
                                <p className="text-slate-600">{selectedUser.email}</p>
                            </div>

                            <div className="space-y-4">
                                <motion.div
                                    className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-emerald-700">Saldo</span>
                                        <span className="text-lg font-bold text-emerald-600">
                                            Rp {selectedUser.balance.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-blue-700">Total Sampah</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {selectedUser.totalWaste} kg
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-amber-700">Peringkat</span>
                                        <span className="text-lg font-bold text-amber-600">
                                            #{sortedUsers.findIndex(u => u.id === selectedUser.id) + 1}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-6 text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-sm text-slate-500">
                                    Bergabung sejak {new Date(selectedUser.joinDate || '2024-01-01').toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default UserDashboardPage;