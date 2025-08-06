import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import AdminHeader from '../components/admin/AdminHeader';
import EditUserModal from '../components/admin/EditUserModal';
import DeleteUserModal from '../components/admin/DeleteUserModal';

const UsersListPage = () => {
    const { users, updateUsers, addActivity } = useData();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [showStats, setShowStats] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const results = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (sortConfig.key) {
                results.sort((a, b) => {
                    if (sortConfig.key === 'balance') {
                        return sortConfig.direction === 'asc' ? a.balance - b.balance : b.balance - a.balance;
                    }
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            setFilteredUsers(results);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, users, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };


    const handleEditClick = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleEditConfirm = (updatedUser) => {
        const updatedUsers = users.map((u) =>
            u.id === updatedUser.id ? updatedUser : u
        );
        updateUsers(updatedUsers);
        setShowEditModal(false);
        setUserToEdit(null);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            const updated = users.filter(user => user.id !== userToDelete.id);
            updateUsers(updated);
            addActivity({
                type: 'delete_user',
                user: userToDelete.name,
                action: `Warga "${userToDelete.name}" (Email: ${userToDelete.email}) telah dihapus.`,
                time: new Date().toISOString(),
                icon: 'fa-trash-alt',
                color: 'red',
                admin: JSON.parse(localStorage.getItem('adminUser'))?.name || 'Admin',
            });
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        }
        return 'fas fa-sort text-gray-400';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            x: 20,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.9,
            transition: { duration: 0.3 }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const floatingAnimation = {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const addUserButtonVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.05,
            y: -2,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        },
        tap: { scale: 0.95 }
    };

    const addUserIconVariants = {
        rest: { rotate: 0 },
        hover: {
            rotate: 360,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="min-h-screenbg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 text-slate-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl"
                    animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
                />
            </div>

            <AdminHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6"
                    >
                        <div className="space-y-2">
                            <motion.h1
                                className="text-4xl py-3 font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Manajemen Warga
                            </motion.h1>
                            <motion.p
                                className="text-gray-600 text-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Kelola data warga dan pantau aktivitas sistem
                            </motion.p>
                        </div>

                        <div className="flex items-center gap-4">
                            <AnimatePresence>
                                {showStats && (
                                    <motion.div
                                        variants={statsVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="hidden sm:flex items-center gap-6 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
                                    >
                                        <motion.div className="text-center" whileHover={pulseAnimation}>
                                            <motion.div
                                                className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                                                key={users.length}
                                                initial={{ scale: 1.2, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {users.length}
                                            </motion.div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total Warga</div>
                                        </motion.div>
                                        <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                                        <motion.div className="text-center" whileHover={pulseAnimation}>
                                            <motion.div
                                                className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                                                key={users.filter(u => u.status === 'active').length}
                                                initial={{ scale: 1.2, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                            >
                                                {users.filter(u => u.status === 'active').length}
                                            </motion.div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Aktif</div>
                                        </motion.div>
                                        <motion.button
                                            onClick={() => setShowStats(false)}
                                            className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <i className="fas fa-times text-xs"></i>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!showStats && (
                                <motion.button
                                    onClick={() => setShowStats(true)}
                                    className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg text-gray-600 hover:text-gray-900 transition-colors"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className="fas fa-chart-bar"></i>
                                </motion.button>
                            )}

                            <Link to="/admin/users/add">
                                <motion.button
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu"
                                    variants={addUserButtonVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <motion.i
                                        className="fas fa-plus text-sm"
                                        variants={addUserIconVariants}
                                    />
                                    <span>Tambah Warga</span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Controls Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-6"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <motion.i
                                    className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                                    animate={{ scale: searchTerm ? [1, 1.2, 1] : 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama atau email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-sm bg-white/70 backdrop-blur-sm placeholder-gray-400"
                                />
                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <i className="fas fa-times text-sm"></i>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center gap-4">
                                <AnimatePresence>
                                    {selectedUsers.size > 0 && (
                                        <motion.div
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                        >
                                            <i className="fas fa-check-circle"></i>
                                            <span>{selectedUsers.size} dipilih</span>
                                            <motion.button
                                                onClick={() => setSelectedUsers(new Set())}
                                                className="ml-1 text-blue-600 hover:text-blue-800"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <i className="fas fa-times text-xs"></i>
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                >
                                                    <i className="fas fa-spinner text-emerald-600"></i>
                                                </motion.div>
                                                <span>Memfilter...</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span
                                                key={filteredUsers.length}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                {filteredUsers.length} dari {users.length} warga
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200/50">
                                    <motion.button
                                        onClick={() => setViewMode('table')}
                                        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${viewMode === 'table'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <i className="fas fa-table mr-2"></i>
                                        Tabel
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setViewMode('grid')}
                                        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${viewMode === 'grid'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <i className="fas fa-th-large mr-2"></i>
                                        Grid
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            {viewMode === 'table' ? (
                                // Enhanced Table View
                                <motion.div
                                    key="table"
                                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200/50">
                                                <tr>
                                                    {[
                                                        { key: 'name', label: 'Warga' },
                                                        { key: 'balance', label: 'Saldo' },
                                                        { key: 'totalWaste', label: 'Total Sampah' },
                                                        { key: 'status', label: 'Status' }
                                                    ].map((column) => (
                                                        <th
                                                            key={column.key}
                                                            className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-white/50 transition-colors duration-200"
                                                            onClick={() => handleSort(column.key)}
                                                        >
                                                            <motion.div
                                                                className="flex items-center gap-2"
                                                                whileHover={{ x: 2 }}
                                                            >
                                                                <span>{column.label}</span>
                                                                <motion.i
                                                                    className={getSortIcon(column.key)}
                                                                    animate={{
                                                                        rotate: sortConfig.key === column.key
                                                                            ? (sortConfig.direction === 'asc' ? 0 : 180)
                                                                            : 0
                                                                    }}
                                                                    transition={{ duration: 0.2 }}
                                                                />
                                                            </motion.div>
                                                        </th>
                                                    ))}
                                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                        Aksi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100/50">
                                                <AnimatePresence>
                                                    {filteredUsers.map((user, index) => (
                                                        <motion.tr
                                                            key={user.id}
                                                            variants={tableRowVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            transition={{ delay: index * 0.02 }}
                                                            className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-emerald-50/50 transition-all duration-300 group"
                                                            onHoverStart={() => setHoveredCard(user.id)}
                                                            onHoverEnd={() => setHoveredCard(null)}
                                                        >
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <motion.div
                                                                        className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md"
                                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                                        animate={hoveredCard === user.id ? { scale: 1.05 } : { scale: 1 }}
                                                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                                    >
                                                                        {user.name.charAt(0).toUpperCase()}
                                                                    </motion.div>
                                                                    <div>
                                                                        <div className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                                                            {user.name}
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <motion.div
                                                                    className="font-semibold text-gray-900"
                                                                    whileHover={{ scale: 1.05 }}
                                                                >
                                                                    Rp {user.balance.toLocaleString('id-ID')}
                                                                </motion.div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <motion.div
                                                                    className="font-semibold text-gray-900"
                                                                    whileHover={{ scale: 1.05 }}
                                                                >
                                                                    {user.totalWaste} kg
                                                                </motion.div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <motion.span
                                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                                        ? 'bg-emerald-100 text-emerald-800'
                                                                        : 'bg-red-100 text-red-800'
                                                                        }`}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    animate={hoveredCard === user.id ? pulseAnimation : {}}
                                                                >
                                                                    <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'
                                                                        }`}></span>
                                                                    {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                                                </motion.span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    <motion.button
                                                                        onClick={() => handleEditClick(user)}
                                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <i className="fas fa-edit text-sm"></i>
                                                                    </motion.button>
                                                                    <motion.button
                                                                        onClick={() => handleDeleteClick(user)}
                                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <i className="fas fa-trash text-sm"></i>
                                                                    </motion.button>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))}
                                                </AnimatePresence>
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            ) : (
                                // Enhanced Grid View
                                <motion.div
                                    key="grid"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AnimatePresence>
                                        {filteredUsers.map((user, index) => (
                                            <motion.div
                                                key={user.id}
                                                variants={cardVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ delay: index * 0.05 }}
                                                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                                                onHoverStart={() => setHoveredCard(user.id)}
                                                onHoverEnd={() => setHoveredCard(null)}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                            >
                                                {/* Background gradient overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                                    initial={false}
                                                    animate={hoveredCard === user.id ? { opacity: 1 } : { opacity: 0 }}
                                                />

                                                {/* User avatar and info */}
                                                <div className="relative z-10 flex flex-col items-center text-center">
                                                    <motion.div
                                                        className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md mb-4"
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        animate={hoveredCard === user.id ? { scale: 1.05 } : { scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                    >
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </motion.div>

                                                    <motion.h3
                                                        className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-700 transition-colors"
                                                        animate={hoveredCard === user.id ? { scale: 1.05 } : { scale: 1 }}
                                                    >
                                                        {user.name}
                                                    </motion.h3>

                                                    <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                                                    {/* Stats */}
                                                    <div className="w-full space-y-3 mb-4">
                                                        <motion.div
                                                            className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl"
                                                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                                                        >
                                                            <span className="text-sm text-gray-600">Saldo</span>
                                                            <motion.span
                                                                className="font-semibold text-gray-900"
                                                                whileHover={{ scale: 1.05 }}
                                                            >
                                                                Rp {user.balance.toLocaleString('id-ID')}
                                                            </motion.span>
                                                        </motion.div>

                                                        <motion.div
                                                            className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl"
                                                            whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                                                        >
                                                            <span className="text-sm text-gray-600">Total Sampah</span>
                                                            <motion.span
                                                                className="font-semibold text-gray-900"
                                                                whileHover={{ scale: 1.05 }}
                                                            >
                                                                {user.totalWaste} kg
                                                            </motion.span>
                                                        </motion.div>

                                                        <div className="flex justify-center">
                                                            <motion.span
                                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                                    ? 'bg-emerald-100 text-emerald-800'
                                                                    : 'bg-red-100 text-red-800'
                                                                    }`}
                                                                whileHover={{ scale: 1.05 }}
                                                                animate={hoveredCard === user.id ? pulseAnimation : {}}
                                                            >
                                                                <motion.span
                                                                    className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'
                                                                        }`}
                                                                    animate={hoveredCard === user.id ? { scale: [1, 1.2, 1] } : {}}
                                                                    transition={{ duration: 1, repeat: Infinity }}
                                                                />
                                                                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                                            </motion.span>
                                                        </div>
                                                    </div>

                                                    {/* Action buttons */}
                                                    <div className="flex gap-2 w-full">
                                                        <motion.button
                                                            onClick={() => handleEditClick(user)}
                                                            className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                                                            whileHover={{ scale: 1.02, y: -1 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <i className="fas fa-edit text-sm"></i>
                                                            <span>Edit</span>
                                                        </motion.button>

                                                        <motion.button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                                                            whileHover={{ scale: 1.02, y: -1 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <i className="fas fa-trash text-sm"></i>
                                                            <span>Hapus</span>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Empty state */}
                        <AnimatePresence>
                            {filteredUsers.length === 0 && !isLoading && (
                                <motion.div
                                    className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <motion.div
                                        animate={floatingAnimation}
                                        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                                    >
                                        <motion.i
                                            className="fas fa-users text-3xl text-gray-400"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </motion.div>
                                    <motion.h3
                                        className="text-xl font-semibold text-gray-900 mb-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {searchTerm ? 'Tidak ditemukan' : 'Belum ada warga'}
                                    </motion.h3>
                                    <motion.p
                                        className="text-gray-500 mb-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {searchTerm
                                            ? 'Coba ubah kata kunci pencarian Anda'
                                            : 'Mulai dengan menambahkan warga baru ke sistem'
                                        }
                                    </motion.p>
                                    {!searchTerm && (
                                        <Link to="/admin/users/add">
                                            <motion.button
                                                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <i className="fas fa-plus"></i>
                                                <span>Tambah Warga Pertama</span>
                                            </motion.button>
                                        </Link>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>

            {/* Delete Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <DeleteUserModal
                        user={userToDelete}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <EditUserModal
                        user={userToEdit}
                        onClose={() => setShowEditModal(false)}
                        onConfirm={handleEditConfirm}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UsersListPage;