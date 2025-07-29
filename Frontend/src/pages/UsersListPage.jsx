import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import AdminHeader from '../components/admin/AdminHeader';
import DeleteUserModal from '../components/admin/DeleteUserModal';

const UsersListPage = () => {
    const { users, updateUsers } = useData();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const results = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Apply sorting
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

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            const updated = users.filter(user => user.id !== userToDelete.id);
            updateUsers(updated);
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key === columnName) {
            return sortConfig.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        }
        return 'fas fa-sort text-slate-300';
    };

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            x: 20,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <AdminHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
                    >
                        <div className="space-y-2">
                            <motion.h1
                                className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Manajemen Warga
                            </motion.h1>
                            <motion.p
                                className="text-slate-600 text-lg"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Kelola semua akun warga yang terdaftar dengan mudah dan efisien
                            </motion.p>
                            <motion.div
                                className="flex items-center space-x-4 text-sm text-slate-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="flex items-center">
                                    <i className="fas fa-users mr-2"></i>
                                    {users.length} Total Warga
                                </span>
                                <span className="flex items-center">
                                    <i className="fas fa-user-check mr-2"></i>
                                    {users.filter(u => u.status === 'active').length} Aktif
                                </span>
                            </motion.div>
                        </div>

                        <Link to="/admin/users/add">
                            <motion.button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center hover:shadow-lg transition-all duration-300 group"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <motion.i
                                    className="fas fa-plus mr-2"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                ></motion.i>
                                <span className="group-hover:tracking-wide transition-all duration-300">
                                    Tambah Warga
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Search and Filter Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-6"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <motion.i
                                    className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                ></motion.i>
                                <input
                                    type="text"
                                    placeholder="Cari warga berdasarkan nama atau email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 bg-white/50"
                                />
                                {searchTerm && (
                                    <motion.button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <i className="fas fa-times"></i>
                                    </motion.button>
                                )}
                            </div>

                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <motion.div
                                    animate={isLoading ? { rotate: 360 } : {}}
                                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                                >
                                    <i className={`fas ${isLoading ? 'fa-spinner' : 'fa-filter'}`}></i>
                                </motion.div>
                                <span>
                                    {isLoading ? 'Memfilter...' : `${filteredUsers.length} hasil ditemukan`}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Table Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                                    <tr>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>Warga</span>
                                                <i className={getSortIcon('name')}></i>
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                                            onClick={() => handleSort('balance')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>Saldo</span>
                                                <i className={getSortIcon('balance')}></i>
                                            </div>
                                        </th>
                                        <th
                                            className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors duration-200"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <span>Status</span>
                                                <i className={getSortIcon('status')}></i>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <AnimatePresence>
                                        {filteredUsers.map((user, index) => (
                                            <motion.tr
                                                key={user.id}
                                                variants={tableRowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ delay: index * 0.05 }}
                                                className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all duration-300 group"
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <motion.div
                                                            className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                        >
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </motion.div>
                                                        <div>
                                                            <div className="font-semibold text-slate-900">{user.name}</div>
                                                            <div className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-200">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <motion.div
                                                        className="font-bold text-emerald-600 text-lg"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        Rp {user.balance.toLocaleString('id-ID')}
                                                    </motion.div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <motion.span
                                                        className={`px-3 py-1 text-xs font-bold rounded-full ${user.status === 'active'
                                                                ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800'
                                                                : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                                                            }`}
                                                        whileHover={{ scale: 1.05 }}
                                                        animate={{
                                                            boxShadow: user.status === 'active'
                                                                ? ["0 0 0 rgba(16, 185, 129, 0)", "0 0 10px rgba(16, 185, 129, 0.3)", "0 0 0 rgba(16, 185, 129, 0)"]
                                                                : ["0 0 0 rgba(239, 68, 68, 0)", "0 0 10px rgba(239, 68, 68, 0.3)", "0 0 0 rgba(239, 68, 68, 0)"]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        {user.status === 'active' ? '✓ Aktif' : '✗ Nonaktif'}
                                                    </motion.span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <motion.button
                                                            onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                                                            className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-300"
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </motion.button>
                                                        <motion.button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-300"
                                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>

                            {filteredUsers.length === 0 && !isLoading && (
                                <motion.div
                                    className="text-center py-12"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <motion.i
                                        className="fas fa-users text-6xl text-slate-300 mb-4"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    ></motion.i>
                                    <h3 className="text-xl font-semibold text-slate-600 mb-2">Tidak ada warga ditemukan</h3>
                                    <p className="text-slate-500">Coba ubah kata kunci pencarian atau tambah warga baru</p>
                                </motion.div>
                            )}
                        </div>
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
        </div>
    );
};

export default UsersListPage;