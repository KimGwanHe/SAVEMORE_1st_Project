import mongoose from 'mongoose';
// import { Advertisement  } from '../db/database.js';

const advertisementSchema = new mongoose.Schema({
    company: { type: String, required: true },
    canvasser: { type: String, required: true },
    phone: { type: String, required: true },
    period: { type: String, required: true },
    cost: { type: String, required: true },
    day: { type: String, required: true },
    img_url: { type: String, required: true },
    detail_url: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'active'], default: 'pending' },
    position: { type: Number, default: null }
}, { timestamps: {currentTime: () => new Date(Date.now() + 9 * 60 * 60 * 1000) } });


const Advertisement = mongoose.model('Advertisement', advertisementSchema);

export default Advertisement;