//Contoh:

import mongoose from 'mongoose';

const wasteEntrySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Menghubungkan ke model User
    },
    type: { // Misal: "plastik", "kertas", "logam"
        type: String,
        required: true
    },
    weight: { // Berat sampah dalam kg atau gram
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const WasteEntry = mongoose.model('WasteEntry', wasteEntrySchema);

export default WasteEntry;