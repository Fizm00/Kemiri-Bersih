import { useState, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import BackgroundPattern from '../BackgroundPattern';

// Pindahkan FormField component ke luar untuk menghindari re-creation
const FormField = memo(({
  label,
  name,
  type = 'text',
  placeholder,
  min,
  options,
  icon,
  value,
  onChange,
  error,
  isSubmitting,
  itemVariants
}) => (
  <motion.div variants={itemVariants} className="group">
    <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
      {icon && <i className={`${icon} text-gray-400 w-4`}></i>}
      {label}
      <span className="text-red-500">*</span>
    </label>
    {type === 'select' ? (
      <motion.select
        name={name}
        value={value}
        onChange={onChange}
        disabled={isSubmitting}
        className={`
          w-full px-5 py-4 rounded-xl border-2 backdrop-blur-sm text-sm font-medium
          transition-all duration-300 group-hover:border-gray-300
          ${error
            ? 'border-red-300 bg-red-50 text-red-700 focus:border-red-400 focus:ring-4 focus:ring-red-100'
            : 'border-gray-200 bg-white text-gray-800 focus:border-gray-900 focus:ring-4 focus:ring-gray-100'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-gray-400 shadow-sm
        `}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-gray-800">
            {option.label}
          </option>
        ))}
      </motion.select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        disabled={isSubmitting}
        className={`
          w-full px-5 py-4 rounded-xl border-2 backdrop-blur-sm text-sm font-medium
          transition-all duration-300 group-hover:border-gray-300
          ${error
            ? 'border-red-300 bg-red-50 text-red-700 focus:border-red-400 focus:ring-4 focus:ring-red-100'
            : 'border-gray-200 bg-white text-gray-800 focus:border-gray-900 focus:ring-4 focus:ring-gray-100'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-gray-400 shadow-sm
        `}
      />
    )}
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-red-500 text-sm mt-2 font-medium"
        >
          <div className="w-1 h-1 rounded-full bg-red-500"></div>
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
));

FormField.displayName = 'FormField';

const EditUserModal = ({ user, onClose, onConfirm }) => {
  const { addActivity } = useData();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    balance: user.balance,
    totalWaste: user.totalWaste,
    status: user.status,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modern animation variants
  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(12px)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      filter: "blur(5px)",
      transition: { duration: 0.25 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (formData.balance < 0) {
      newErrors.balance = "Saldo tidak boleh negatif";
    } else if (formData.balance > 999999999) {
      newErrors.balance = "Saldo terlalu besar";
    }

    if (formData.totalWaste < 0) {
      newErrors.totalWaste = "Total sampah tidak boleh negatif";
    } else if (formData.totalWaste > 999999) {
      newErrors.totalWaste = "Total sampah terlalu besar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Stable handleChange function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    // Clear error untuk field yang sedang diubah
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    // Update formData
    setFormData(prev => ({
      ...prev,
      [name]: name === 'balance' || name === 'totalWaste'
        ? value === '' ? 0 : Math.max(0, parseFloat(value) || 0)
        : value,
    }));
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      onConfirm({
        ...user,
        ...formData,
        updatedAt: new Date().toISOString(),
      });

      addActivity({
        type: 'edit_user',
        user: formData.name,
        action: `Data warga "${formData.name}" berhasil diperbarui`,
        time: new Date().toISOString(),
        icon: 'fa-user-edit',
        color: 'gray',
        admin: JSON.parse(localStorage.getItem('adminUser'))?.name || 'Admin',
      });

      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Elegant white card */}
          <div className="relative bg-white/95 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <BackgroundPattern />

            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="relative z-10 px-8 py-8 border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
                  <i className="fas fa-user-edit text-white text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Edit Data Pengguna</h2>
                  <p className="text-gray-500 text-sm">Perbarui informasi akun pengguna</p>
                </div>
              </div>
            </motion.div>

            {/* Form Content */}
            <div className="relative z-10 px-8 py-8 space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
              <motion.div variants={itemVariants}>
                <FormField
                  label="Nama Lengkap"
                  name="name"
                  placeholder="Masukkan nama lengkap"
                  icon="fas fa-user"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  isSubmitting={isSubmitting}
                  itemVariants={itemVariants}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="contoh@email.com"
                  icon="fas fa-envelope"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  isSubmitting={isSubmitting}
                  itemVariants={itemVariants}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <FormField
                  label="Saldo"
                  name="balance"
                  type="number"
                  placeholder="0"
                  min="0"
                  icon="fas fa-wallet"
                  value={formData.balance}
                  onChange={handleChange}
                  error={errors.balance}
                  isSubmitting={isSubmitting}
                  itemVariants={itemVariants}
                />
                <FormField
                  label="Total Sampah"
                  name="totalWaste"
                  type="number"
                  placeholder="0"
                  min="0"
                  icon="fas fa-trash-alt"
                  value={formData.totalWaste}
                  onChange={handleChange}
                  error={errors.totalWaste}
                  isSubmitting={isSubmitting}
                  itemVariants={itemVariants}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Status"
                  name="status"
                  type="select"
                  icon="fas fa-toggle-on"
                  options={[
                    { value: "active", label: "Aktif" },
                    { value: "inactive", label: "Nonaktif" }
                  ]}
                  value={formData.status}
                  onChange={handleChange}
                  error={errors.status}
                  isSubmitting={isSubmitting}
                  itemVariants={itemVariants}
                />
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="relative z-10 px-8 py-8 border-t border-gray-100 bg-gray-50/50"
            >
              <div className="flex gap-4">
                <motion.button
                  onClick={onClose}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
                >
                  Batal
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save text-sm"></i>
                      Simpan Perubahan
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditUserModal;