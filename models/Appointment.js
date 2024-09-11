import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: ["", ""]
    },
    title: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceBy: {
        type: [String],
        enum: ["video call", "audio call", "chat"],
        required: true,
    },
    appointmentSchedule: {
        type: Date,
        required: false,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "scheduled", "completed", "canceled"],
        default: "pending"
    },
    duration: {
        type: Number,
        default: 0
    },
    fee: {
        type: Number,
        required: false
    },
    notes: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
