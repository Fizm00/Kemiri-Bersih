// src/components/admin/DeleteUserModal.jsx
import { motion, AnimatePresence } from 'framer-motion';

const DeleteUserModal = ({ user, onClose, onConfirm }) => {
    if (!user) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-exclamation-triangle text-red-600"></i>
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Hapus Warga</h2>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Anda yakin ingin menghapus <b>{user.name}</b>? Aksi ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-end space-x-3">
                        <motion.button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Batal
                        </motion.button>
                        <motion.button
                            onClick={onConfirm}
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Ya, Hapus
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeleteUserModal;