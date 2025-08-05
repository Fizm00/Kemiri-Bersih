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
    const windowSize = useWindowSize();

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
        // Mobile responsive heights
        const podiumHeight = index === 0 ? 'h-[26rem] sm:h-[32rem] lg:h-[36rem]' : index === 1 ? 'h-[22rem] sm:h-[28rem] lg:h-[32rem]' : 'h-[20rem] sm:h-[26rem] lg:h-[30rem]';
        const podiumOrder = index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3';
        const podiumWidth = 'w-full sm:w-[22rem] lg:w-[26rem] xl:w-[28rem]';

        return (
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8, scale: index === 0 ? 1.05 : index === 1 ? 1.03 : 1.02 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onClick={handleClick}
                className={`${rankDisplay.bg} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border-2 ${rankDisplay.border} cursor-pointer relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group ${podiumHeight} ${podiumOrder} ${podiumWidth} flex flex-col justify-between ${index === 0 ? 'transform scale-100 sm:scale-105' : ''}`}
            >
                {/* Glowing effect for winner */}
                {index === 0 && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-400/20 to-amber-600/20 rounded-xl sm:rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Floating particles effect - fixed responsive */}
                <AnimatePresence>
                    {hoveredCard === user.id && (
                        <>
                            {[...Array(windowSize.width < 640 ? 6 : 12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-orange-400'}`}
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

                {/* Crown or medal with animation - fixed untuk initial render */}
                <div className="flex flex-col items-center">
                    <motion.div
                        className={`text-3xl sm:text-4xl lg:text-6xl ${rankDisplay.color} drop-shadow-lg mb-3 sm:mb-4 lg:mb-6`}
                        initial={{ scale: 1, rotate: 0, y: 0 }}
                        animate={{
                            scale: hoveredCard === user.id ? 1.2 : 1,
                            rotate: hoveredCard === user.id ? (index === 0 ? [0, -5, 5, 0] : 10) : 0,
                            y: index === 0 ? [0, -3, 0] : 0
                        }}
                        transition={{
                            duration: index === 0 ? 2 : 0.3,
                            repeat: index === 0 ? Infinity : 0
                        }}
                    >
                        {rankDisplay.icon}
                    </motion.div>

                    <motion.div
                        className={`text-xs sm:text-lg font-bold ${rankDisplay.color} bg-white/70 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-sm`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Peringkat {index + 1}
                    </motion.div>
                </div>

                {/* Profile Section - added initial animation */}
                <motion.div
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl ring-2 sm:ring-4 ring-white/70 mb-2 sm:mb-4 ${index === 0 ? 'ring-amber-200' : index === 1 ? 'ring-slate-200' : 'ring-orange-200'}`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className={`text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-emerald-700 transition-colors ${index === 0 ? 'sm:text-2xl' : ''} truncate w-full px-2`}>
                        {user.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 truncate w-full px-2 mb-2 sm:mb-4">{user.email}</p>
                </motion.div>

                {/* Stats - added initial animation */}
                <motion.div
                    className="space-y-2 sm:space-y-3 lg:space-y-4 mt-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-white/50 shadow-lg">
                        <div className={`font-bold text-emerald-600 mb-1 sm:mb-2 ${index === 0 ? 'text-lg sm:text-xl lg:text-3xl' : 'text-base sm:text-lg lg:text-2xl'}`}>
                            Rp {user.balance.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs sm:text-sm lg:text-base text-slate-600 flex items-center justify-center">
                            <span className="mr-1 sm:mr-2">⚖️</span>
                            {user.totalWaste} kg total sampah
                        </div>
                    </div>

                    {/* Progress Bar - fixed initial animation */}
                    <div className="bg-slate-200 rounded-full h-2.5 sm:h-3 lg:h-4 overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full shadow-sm ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-600' :
                                index === 1 ? 'bg-gradient-to-r from-slate-500 to-gray-600' :
                                    'bg-gradient-to-r from-orange-500 to-red-600'
                                }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((user.balance / 1000000) * 100, 100)}%` }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    if (isGridMode) {
        return (
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, scale: 1.02 }}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onClick={handleClick}
                className={`${rankDisplay.bg} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${rankDisplay.border} cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
                {/* Floating particles effect - fixed responsive */}
                <AnimatePresence>
                    {hoveredCard === user.id && (
                        <>
                            {[...Array(windowSize.width < 640 ? 4 : 8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-400 rounded-full"
                                    initial={{
                                        opacity: 0,
                                        x: Math.random() * 200,
                                        y: Math.random() * 200
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: -40,
                                        x: Math.random() * 30 - 15
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

                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <motion.div
                        className={`text-2xl sm:text-3xl ${rankDisplay.color} drop-shadow-sm`}
                        animate={{
                            scale: hoveredCard === user.id ? 1.2 : 1,
                            rotate: hoveredCard === user.id ? 10 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {rankDisplay.icon}
                    </motion.div>
                    <div className="text-right">
                        <div className={`text-xs sm:text-sm font-semibold ${rankDisplay.color} bg-white/50 px-2 sm:px-3 py-1 rounded-full`}>
                            Peringkat {index + 1}
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                    <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-xl ring-2 sm:ring-4 ring-white/50 mb-3 sm:mb-4"
                        whileHover={{ scale: 1.05, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors truncate w-full px-2">
                        {user.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 truncate w-full px-2">{user.email}</p>
                </div>

                {/* Stats */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/40">
                        <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-1">
                            Rp {user.balance.toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-center">
                            <span className="mr-1 sm:mr-2">⚖️</span>
                            {user.totalWaste} kg total sampah
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
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

    // List Mode - Mobile Optimized
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gradient-to-r hover:from-emerald-50/80 hover:to-teal-50/80 transition-all duration-300 cursor-pointer border border-slate-200/60 hover:border-emerald-200 hover:shadow-lg group"
            whileHover={{ scale: 1.01, x: windowSize.width < 640 ? 4 : 8 }}
            onClick={handleClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                    {/* Rank */}
                    <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 ${rankDisplay.bg} rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold ${rankDisplay.color} border ${rankDisplay.border} shadow-sm`}
                        whileHover={{ rotate: 6, scale: 1.05 }}
                    >
                        {rankDisplay.icon}
                    </motion.div>

                    {/* Avatar */}
                    <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg ring-1 sm:ring-2 ring-emerald-100"
                        whileHover={{ scale: 1.1 }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                            {user.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 truncate">{user.email}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-2 sm:space-x-6">
                    <div className="text-right">
                        <div className="text-sm sm:text-lg font-bold text-emerald-600">
                            Rp {(user.balance / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-end">
                            <span className="mr-1">⚖️</span>
                            {user.totalWaste} kg
                        </div>
                    </div>
                    <motion.div
                        className="w-1.5 h-6 sm:w-2 sm:h-8 bg-gradient-to-t from-emerald-200 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
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
        setCurrentPage(1);
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
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, viewMode]);

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
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        topThree = currentPage === 1 ? filteredUsers.slice(0, Math.min(3, filteredUsers.length)) : [];
        paginatedUsers = filteredUsers.slice(
            currentPage === 1 ? 3 : startIndex,
            Math.min(endIndex, filteredUsers.length)
        );
        showPagination = totalItems > itemsPerPage;
        totalPages = Math.ceil(totalItems / itemsPerPage);
    } else {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        showPagination = totalItems > itemsPerPage;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
            {/* Animated Background - Simplified for mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-5 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, -60, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Header - Mobile Optimized */}
            <motion.header
                className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <motion.div
                            className="flex items-center space-x-2 sm:space-x-4"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <motion.div
                                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-white text-sm sm:text-lg">♻️</span>
                                </motion.div>
                                <div>
                                    <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Kemiri Bersih</h1>
                                    <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">Community Leaderboard</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.button
                            className="inline-flex items-center px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-lg hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onClick={handleNavigateBack}
                        >
                            <span className="mr-1 sm:mr-2">←</span>
                            Kembali
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
                {/* Title Section - Mobile Optimized */}
                <motion.div
                    className="mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-emerald-800 bg-clip-text text-transparent mb-2">
                        Papan Peringkat Komunitas
                    </h2>
                    <motion.p
                        className="text-sm sm:text-base text-slate-600 max-w-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Pantau kontribusi warga dalam menjaga kebersihan lingkungan dan berlomba menjadi pahlawan lingkungan terbaik.
                    </motion.p>
                </motion.div>

                {/* Controls - Mobile Optimized */}
                <motion.div
                    className="mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Search */}
                    <div className="relative w-full sm:max-w-md">
                        <motion.div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            animate={{ rotate: searchTerm ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-slate-400 text-sm">🔍</span>
                        </motion.div>
                        <motion.input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm border border-slate-300 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            whileFocus={{ scale: 1.01 }}
                        />
                    </div>

                    {/* Controls Row */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 border border-slate-200 shadow-sm">
                            <motion.button
                                onClick={() => handleViewModeChange('grid')}
                                className={`flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${viewMode === 'grid'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>📊</span>
                                <span>Grid</span>
                            </motion.button>
                            <motion.button
                                onClick={() => handleViewModeChange('list')}
                                className={`flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 sm:space-x-2 ${viewMode === 'list'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>📋</span>
                                <span>List</span>
                            </motion.button>
                        </div>

                        {/* Items per page - only show for list view on desktop */}
                        {viewMode === 'list' && (
                            <div className="hidden sm:flex items-center space-x-2">
                                <span className="text-sm text-slate-600">Tampilkan:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                    className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={48}>48</option>
                                </select>
                                <span className="text-sm text-slate-600">per halaman</span>
                            </div>
                        )}

                        {viewMode === 'grid' && (
                            <div className="hidden sm:flex items-center space-x-2">
                                <span className="text-sm text-slate-600">Tampilkan:</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                    className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    <option value={15}>15</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm text-slate-600">per halaman</span>
                            </div>
                        )}

                        {/* Stats Summary */}
                        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-slate-600 bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-2 border border-slate-200">
                            <span>👥 {filteredUsers.length} pengguna</span>
                            <span className="text-slate-400">|</span>
                            <span>💰 Rp {filteredUsers.reduce((sum, user) => sum + user.balance, 0).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 sm:space-y-8"
                >
                    {/* Top 3 Podium - Only for Grid Mode on first page */}
                    {viewMode === 'grid' && currentPage === 1 && topThree.length > 0 && (
                        <motion.div
                            className="mb-8 sm:mb-12"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <div className="text-center mb-6 sm:mb-8">
                                <motion.h3
                                    className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    🏆 Top 3 Pahlawan Lingkungan
                                </motion.h3>
                                <motion.p
                                    className="text-sm sm:text-base text-slate-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                >
                                    Mereka yang paling berkontribusi dalam menjaga kebersihan lingkungan
                                </motion.p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6 lg:gap-8 max-w-full lg:max-w-7xl mx-auto px-2 sm:px-4">
                                {topThree.map((user, index) => (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        index={index}
                                        isPodium={true}
                                        hoveredCard={hoveredCard}
                                        setHoveredCard={handleSetHoveredCard}
                                        setSelectedUser={handleSetSelectedUser}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Main Content Grid/List */}
                    {filteredUsers.length > 0 ? (
                        <div>
                            {viewMode === 'grid' && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                                        {searchTerm ? `Hasil Pencarian: "${searchTerm}"` : (currentPage === 1 && topThree.length > 0 ? 'Peringkat Lainnya' : 'Semua Peringkat')}
                                    </h3>
                                    <p className="text-sm sm:text-base text-slate-600">
                                        {searchTerm
                                            ? `Menampilkan ${filteredUsers.length} pengguna yang cocok dengan pencarian`
                                            : `Kontribusi seluruh warga dalam program kebersihan lingkungan (${filteredUsers.length} total pengguna)`}
                                    </p>
                                </div>
                            )}
                            {viewMode === 'list' && (
                                <div className="mb-4 sm:mb-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                                        {searchTerm ? `Hasil Pencarian: "${searchTerm}"` : 'Semua Peringkat'}
                                    </h3>
                                    <p className="text-sm sm:text-base text-slate-600">
                                        {searchTerm
                                            ? `Menampilkan ${filteredUsers.length} pengguna yang cocok dengan pencarian`
                                            : `Kontribusi seluruh warga dalam program kebersihan lingkungan (${filteredUsers.length} total pengguna)`}
                                    </p>
                                </div>
                            )}

                            <motion.div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                                        : 'space-y-2 sm:space-y-3'
                                }
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {paginatedUsers.map((user, index) => {
                                    const actualIndex = viewMode === 'grid'
                                        ? ((currentPage - 1) * itemsPerPage + index + (currentPage === 1 ? 3 : 0))
                                        : ((currentPage - 1) * itemsPerPage + index);

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
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-12 sm:py-16 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg max-w-2xl mx-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="text-5xl sm:text-6xl mb-4 text-slate-600"
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                🔍
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                                Tidak Ada Pengguna Ditemukan
                            </h3>
                            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-4">
                                {searchTerm
                                    ? `Tidak ada pengguna yang cocok dengan "${searchTerm}". Coba gunakan kata kunci lain atau periksa ejaan.`
                                    : 'Tidak ada pengguna tersedia. Coba muat ulang atau hubungi dukungan.'}
                            </p>
                            {searchTerm && (
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                                    <motion.button
                                        onClick={() => setSearchTerm('')}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Hapus Pencarian
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setSearchTerm(searchTerm.slice(0, -1))}
                                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm sm:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Ubah Pencarian
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {showPagination && (
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200/60"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="text-xs sm:text-sm text-slate-600 order-2 sm:order-1">
                                Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems} pengguna
                            </div>

                            <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
                                <motion.button
                                    onClick={() => handleCurrentPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-md sm:rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                                >
                                    ‹ Prev
                                </motion.button>

                                {/* Page Numbers - Limited for mobile */}
                                {Array.from({ length: Math.min(totalPages, window.innerWidth < 640 ? 5 : 7) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 7 || window.innerWidth < 640) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 4) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 3) {
                                        pageNum = totalPages - 6 + i;
                                    } else {
                                        pageNum = currentPage - 3 + i;
                                    }

                                    if (pageNum > totalPages) return null;

                                    return (
                                        <motion.button
                                            key={pageNum}
                                            onClick={() => handleCurrentPageChange(pageNum)}
                                            className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 backdrop-blur-sm ${currentPage === pageNum
                                                ? 'bg-emerald-600 text-white border border-emerald-600 shadow-sm'
                                                : 'text-slate-700 bg-white/80 border border-slate-300 hover:bg-emerald-50'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {pageNum}
                                        </motion.button>
                                    );
                                })}

                                <motion.button
                                    onClick={() => handleCurrentPageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-md sm:rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                                >
                                    Next ›
                                </motion.button>
                            </div>
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
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
                            initial={{ scale: 0.7, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.7, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <motion.div
                                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-2xl mx-auto mb-4 sm:mb-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    {selectedUser.name.charAt(0).toUpperCase()}
                                </motion.div>

                                <motion.h3
                                    className="text-xl sm:text-2xl font-bold text-slate-900 mb-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {selectedUser.name}
                                </motion.h3>

                                <motion.p
                                    className="text-sm sm:text-base text-slate-600 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {selectedUser.email}
                                </motion.p>

                                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                    <motion.div
                                        className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                                            Rp {selectedUser.balance.toLocaleString('id-ID')}
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600">Saldo Total</div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                                            {selectedUser.totalWaste} kg
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-600">Total Sampah</div>
                                    </motion.div>
                                </div>

                                <motion.button
                                    onClick={handleCloseModal}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    Tutup
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default UserDashboardPage;