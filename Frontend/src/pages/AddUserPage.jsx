import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import AdminHeader from '../components/admin/AdminHeader';

const AddUserPage = () => {
    const navigate = useNavigate();
    const { users, updateUsers } = useData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        balance: '0',
        address: '',
        status: 'active',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formProgress, setFormProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Page load animation
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Calculate form progress with animation
    useEffect(() => {
        const requiredFields = ['name', 'email', 'phone', 'address'];
        const filledFields = requiredFields.filter(field => formData[field] && formData[field].trim().length > 0);
        const progress = (filledFields.length / requiredFields.length) * 100;

        // Animate progress change
        const timer = setTimeout(() => {
            setFormProgress(progress);
        }, 100);

        return () => clearTimeout(timer);
    }, [formData]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear validation error immediately for better UX
        if (validationErrors[name]) {
            setValidationErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [validationErrors]);

    const handleBlur = useCallback((field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
        setFocusedField(null);
    }, []);

    const handleFocus = useCallback((field) => {
        setFocusedField(field);
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Nama lengkap wajib diisi';
        if (!formData.email.trim()) errors.email = 'Email wajib diisi';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Format email tidak valid';
        if (!formData.phone.trim()) errors.phone = 'Nomor telepon wajib diisi';
        else if (!/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone.replace(/\s/g, ''))) errors.phone = 'Format nomor telepon tidak valid';
        if (!formData.address.trim()) errors.address = 'Alamat wajib diisi';

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting || !validateForm()) return;
        setIsSubmitting(true);

        const newUser = {
            id: Date.now(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            balance: parseFloat(formData.balance.replace(/[,.]/g, '')) || 0,
            totalWaste: 0,
            status: formData.status,
            joinDate: new Date().toISOString().split('T')[0],
        };

        // Simulate API call
        setTimeout(() => {
            updateUsers([...users, newUser]);
            setIsSubmitting(false);
            navigate('/admin/users');
        }, 1500);
    };

    const formatCurrency = (value) => {
        const number = value.replace(/[^\d]/g, '');
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const handleBalanceChange = useCallback((e) => {
        const formatted = formatCurrency(e.target.value);
        setFormData(prev => ({ ...prev, balance: formatted }));
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const progressVariants = {
        initial: { width: 0 },
        animate: {
            width: `${formProgress}%`,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <AdminHeader />

            <AnimatePresence mode="wait">
                {isLoaded && (
                    <motion.main
                        className="max-w-5xl mx-auto px-6 py-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="space-y-8">
                            {/* Enhanced Header */}
                            <motion.div className="relative" variants={itemVariants}>
                                <motion.nav
                                    className="flex items-center space-x-2 text-sm text-slate-500 mb-6"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <motion.button
                                        onClick={() => navigate('/admin/users')}
                                        className="hover:text-slate-700 transition-all duration-200 flex items-center space-x-1 hover:bg-slate-100 px-3 py-2 rounded-lg"
                                        whileHover={{ x: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <i className="fas fa-arrow-left text-xs"></i>
                                        <span>Kembali ke Daftar Warga</span>
                                    </motion.button>
                                </motion.nav>

                                <div className="flex items-start justify-between">
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        <h1 className="text-3xl font-bold text-slate-900">Registrasi Warga Baru</h1>
                                        <p className="text-slate-600 text-lg">Daftarkan warga baru ke dalam sistem manajemen bank sampah</p>
                                    </motion.div>

                                    {/* Enhanced Progress indicator */}
                                    <motion.div
                                        className="flex items-center space-x-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 backdrop-blur-sm"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4, duration: 0.4 }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                        }}
                                    >
                                        <div className="text-right">
                                            <div className="text-xs font-medium text-slate-600">Progress</div>
                                            <motion.div
                                                className="text-sm font-bold text-slate-900"
                                                key={formProgress}
                                                initial={{ scale: 1.2 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {Math.round(formProgress)}%
                                            </motion.div>
                                        </div>
                                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                                                variants={progressVariants}
                                                initial="initial"
                                                animate="animate"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Enhanced Form */}
                            <motion.div
                                className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden backdrop-blur-sm"
                                variants={itemVariants}
                                whileHover={{
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
                                    {/* Personal Data Section */}
                                    <motion.div
                                        className="p-8"
                                        variants={sectionVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                    >
                                        <motion.div
                                            className="flex items-center space-x-3 mb-6"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <motion.div
                                                className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "#dbeafe",
                                                    rotate: 5
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <i className="fas fa-user text-blue-600"></i>
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Data Pribadi</h3>
                                                <p className="text-slate-500 text-sm">Informasi identitas warga</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, staggerChildren: 0.1 }}
                                        >
                                            {/* Name Input */}
                                            <motion.div className="space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-800">
                                                        Nama Lengkap
                                                        <span className="text-red-500 ml-1 text-xs">*</span>
                                                    </label>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'name' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-user text-sm"></i>
                                                    </motion.div>

                                                    <motion.input
                                                        id="name"
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        onFocus={() => handleFocus('name')}
                                                        onBlur={() => handleBlur('name')}
                                                        placeholder="Masukkan nama lengkap"
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 placeholder:text-slate-400 text-sm font-medium
                                                            hover:shadow-md focus:outline-none
                                                            ${validationErrors.name && touchedFields.name
                                                                ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                                : focusedField === 'name'
                                                                    ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                    : formData.name.length > 0
                                                                        ? 'border-emerald-300 bg-emerald-50/20'
                                                                        : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        required
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    <AnimatePresence>
                                                        {formData.name.length > 0 && !validationErrors.name && (
                                                            <motion.div
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <motion.div
                                                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: Infinity,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>

                                                <AnimatePresence>
                                                    {validationErrors.name && touchedFields.name && (
                                                        <motion.div
                                                            className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200"
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <motion.i
                                                                className="fas fa-exclamation-triangle text-xs"
                                                                animate={{ rotate: [0, -5, 5, 0] }}
                                                                transition={{ duration: 0.4 }}
                                                            />
                                                            <span>{validationErrors.name}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* Email Input */}
                                            <motion.div className="space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-800">
                                                        Alamat Email
                                                        <span className="text-red-500 ml-1 text-xs">*</span>
                                                    </label>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'email' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-envelope text-sm"></i>
                                                    </motion.div>

                                                    <motion.input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        onFocus={() => handleFocus('email')}
                                                        onBlur={() => handleBlur('email')}
                                                        placeholder="user@domain.com"
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 placeholder:text-slate-400 text-sm font-medium
                                                            hover:shadow-md focus:outline-none
                                                            ${validationErrors.email && touchedFields.email
                                                                ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                                : focusedField === 'email'
                                                                    ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                    : formData.email.length > 0
                                                                        ? 'border-emerald-300 bg-emerald-50/20'
                                                                        : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        required
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    <AnimatePresence>
                                                        {formData.email.length > 0 && !validationErrors.email && (
                                                            <motion.div
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <motion.div
                                                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: Infinity,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>

                                                <AnimatePresence>
                                                    {validationErrors.email && touchedFields.email && (
                                                        <motion.div
                                                            className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200"
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <motion.i
                                                                className="fas fa-exclamation-triangle text-xs"
                                                                animate={{ rotate: [0, -5, 5, 0] }}
                                                                transition={{ duration: 0.4 }}
                                                            />
                                                            <span>{validationErrors.email}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* Phone Input */}
                                            <motion.div className="space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-800">
                                                        Nomor Telepon
                                                        <span className="text-red-500 ml-1 text-xs">*</span>
                                                    </label>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'phone' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-phone text-sm"></i>
                                                    </motion.div>

                                                    <motion.input
                                                        id="phone"
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        onFocus={() => handleFocus('phone')}
                                                        onBlur={() => handleBlur('phone')}
                                                        placeholder="08123456789"
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 placeholder:text-slate-400 text-sm font-medium
                                                            hover:shadow-md focus:outline-none
                                                            ${validationErrors.phone && touchedFields.phone
                                                                ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                                : focusedField === 'phone'
                                                                    ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                    : formData.phone.length > 0
                                                                        ? 'border-emerald-300 bg-emerald-50/20'
                                                                        : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        required
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    <AnimatePresence>
                                                        {formData.phone.length > 0 && !validationErrors.phone && (
                                                            <motion.div
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <motion.div
                                                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: Infinity,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>

                                                <AnimatePresence>
                                                    {validationErrors.phone && touchedFields.phone && (
                                                        <motion.div
                                                            className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200"
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <motion.i
                                                                className="fas fa-exclamation-triangle text-xs"
                                                                animate={{ rotate: [0, -5, 5, 0] }}
                                                                transition={{ duration: 0.4 }}
                                                            />
                                                            <span>{validationErrors.phone}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* Balance Input */}
                                            <motion.div className="space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="balance" className="block text-sm font-semibold text-slate-800">
                                                        Saldo Awal
                                                    </label>
                                                    <span className="text-xs text-slate-500">Rupiah (Rp)</span>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'balance' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-wallet text-sm"></i>
                                                    </motion.div>

                                                    <motion.input
                                                        id="balance"
                                                        type="text"
                                                        name="balance"
                                                        value={formData.balance}
                                                        onChange={handleBalanceChange}
                                                        onFocus={() => handleFocus('balance')}
                                                        onBlur={() => handleBlur('balance')}
                                                        placeholder="0"
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 placeholder:text-slate-400 text-sm font-medium
                                                            hover:shadow-md focus:outline-none
                                                            ${focusedField === 'balance'
                                                                ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                : formData.balance.length > 0
                                                                    ? 'border-emerald-300 bg-emerald-50/20'
                                                                    : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    <AnimatePresence>
                                                        {formData.balance.length > 0 && formData.balance !== '0' && (
                                                            <motion.div
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <motion.div
                                                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: Infinity,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Address and Status Section */}
                                    <motion.div
                                        className="p-8"
                                        variants={sectionVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                    >
                                        <motion.div
                                            className="flex items-center space-x-3 mb-6"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <motion.div
                                                className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center"
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "#dcfce7",
                                                    rotate: -5
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <i className="fas fa-map-marker-alt text-emerald-600"></i>
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">Alamat & Status</h3>
                                                <p className="text-slate-500 text-sm">Informasi lokasi dan status warga</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, staggerChildren: 0.1 }}
                                        >
                                            {/* Address Input */}
                                            <motion.div className="lg:col-span-2 space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="address" className="block text-sm font-semibold text-slate-800">
                                                        Alamat Lengkap
                                                        <span className="text-red-500 ml-1 text-xs">*</span>
                                                    </label>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.005 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute top-3 left-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'address' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-home text-sm"></i>
                                                    </motion.div>

                                                    <motion.textarea
                                                        id="address"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        onFocus={() => handleFocus('address')}
                                                        onBlur={() => handleBlur('address')}
                                                        placeholder="Masukkan alamat lengkap (RT/RW, Kelurahan, Kecamatan, dll)"
                                                        rows={4}
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 placeholder:text-slate-400 text-sm font-medium
                                                            hover:shadow-md focus:outline-none resize-none
                                                            ${validationErrors.address && touchedFields.address
                                                                ? 'border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                                : focusedField === 'address'
                                                                    ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                    : formData.address.length > 0
                                                                        ? 'border-emerald-300 bg-emerald-50/20'
                                                                        : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        required
                                                        whileFocus={{ scale: 1.005 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    <AnimatePresence>
                                                        {formData.address.length > 0 && !validationErrors.address && (
                                                            <motion.div
                                                                className="absolute top-3 right-3 flex items-center pointer-events-none"
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <motion.div
                                                                    className="w-2 h-2 bg-emerald-500 rounded-full"
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: Infinity,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>

                                                <AnimatePresence>
                                                    {validationErrors.address && touchedFields.address && (
                                                        <motion.div
                                                            className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200"
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <motion.i
                                                                className="fas fa-exclamation-triangle text-xs"
                                                                animate={{ rotate: [0, -5, 5, 0] }}
                                                                transition={{ duration: 0.4 }}
                                                            />
                                                            <span>{validationErrors.address}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>

                                            {/* Status Select */}
                                            <motion.div className="space-y-2" variants={itemVariants}>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="status" className="block text-sm font-semibold text-slate-800">
                                                        Status Keanggotaan
                                                    </label>
                                                </div>

                                                <motion.div
                                                    className="relative group"
                                                    whileHover={{ scale: 1.01 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <motion.div
                                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'status' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-user-check text-sm"></i>
                                                    </motion.div>

                                                    <motion.select
                                                        id="status"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                        onFocus={() => handleFocus('status')}
                                                        onBlur={() => handleBlur('status')}
                                                        className={`
                                                            block w-full px-4 py-3 pl-10
                                                            bg-white border-2 rounded-xl shadow-sm transition-all duration-300
                                                            text-slate-900 text-sm font-medium
                                                            hover:shadow-md focus:outline-none appearance-none cursor-pointer
                                                            ${focusedField === 'status'
                                                                ? 'border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-lg'
                                                                : 'border-slate-200 hover:border-slate-300'
                                                            }
                                                        `}
                                                        whileFocus={{ scale: 1.01 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <option value="active">Aktif</option>
                                                        <option value="inactive">Tidak Aktif</option>
                                                        <option value="pending">Menunggu Verifikasi</option>
                                                    </motion.select>

                                                    <motion.div
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                                                        animate={{
                                                            color: focusedField === 'status' ? '#3b82f6' : '#94a3b8'
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <i className="fas fa-chevron-down text-xs"></i>
                                                    </motion.div>
                                                </motion.div>

                                                <motion.div
                                                    className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <i className="fas fa-info-circle"></i>
                                                    <span>Status dapat diubah sewaktu-waktu melalui halaman edit</span>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Submit Section */}
                                    <motion.div
                                        className="p-8 bg-slate-50/50"
                                        variants={sectionVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                    >
                                        <motion.div
                                            className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <motion.div
                                                className="flex items-center space-x-2 text-sm text-slate-600"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <motion.i
                                                    className="fas fa-shield-alt text-blue-500"
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, 5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        repeatDelay: 3
                                                    }}
                                                />
                                                <span>Data akan dienkripsi dan disimpan dengan aman</span>
                                            </motion.div>

                                            <div className="flex space-x-3">
                                                <motion.button
                                                    type="button"
                                                    onClick={() => navigate('/admin/users')}
                                                    className="px-6 py-3 text-slate-600 bg-white border-2 border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center space-x-2"
                                                    whileHover={{
                                                        scale: 1.02,
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <i className="fas fa-times text-xs"></i>
                                                    <span>Batal</span>
                                                </motion.button>

                                                <motion.button
                                                    type="submit"
                                                    disabled={isSubmitting || formProgress < 100}
                                                    className={`
                                                        px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 min-w-[140px] justify-center
                                                        ${isSubmitting || formProgress < 100
                                                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                                            : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                                                        }
                                                    `}
                                                    whileHover={formProgress >= 100 && !isSubmitting ? {
                                                        scale: 1.05,
                                                        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)"
                                                    } : {}}
                                                    whileTap={formProgress >= 100 && !isSubmitting ? { scale: 0.95 } : {}}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        {isSubmitting ? (
                                                            <motion.div
                                                                key="loading"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <motion.div
                                                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                />
                                                                <span>Menyimpan...</span>
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="submit"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <motion.i
                                                                    className="fas fa-plus text-xs"
                                                                    animate={formProgress >= 100 ? {
                                                                        rotate: [0, 180, 360],
                                                                        scale: [1, 1.2, 1]
                                                                    } : {}}
                                                                    transition={{
                                                                        duration: 0.6,
                                                                        repeat: formProgress >= 100 ? Infinity : 0,
                                                                        repeatDelay: 2
                                                                    }}
                                                                />
                                                                <span>Daftarkan Warga</span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            </div>
                                        </motion.div>

                                        {/* Progress hint */}
                                        <AnimatePresence>
                                            {formProgress < 100 && (
                                                <motion.div
                                                    className="mt-4 flex items-center space-x-2 text-xs text-slate-500 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.i
                                                        className="fas fa-exclamation-circle text-yellow-600"
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            repeatDelay: 1
                                                        }}
                                                    />
                                                    <span>Lengkapi semua field yang wajib diisi untuk melanjutkan</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AddUserPage;