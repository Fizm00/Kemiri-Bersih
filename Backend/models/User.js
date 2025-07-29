import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { // 'user' atau 'admin'
        type: String,
        required: true,
        default: 'user'
    },
    balance: { // Saldo sampah, misal dalam gram atau poin
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Enkripsi password sebelum menyimpan
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Metode untuk membandingkan password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;