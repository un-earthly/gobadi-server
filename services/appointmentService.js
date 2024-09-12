import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import admin from '../firebase.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

// Create a new appointment

export async function createAppointmentService(appointmentData) {
    try {
        // Create appointment in your database (e.g., MongoDB)
        const firestore = getFirestore(admin);

        const appointment = new Appointment(appointmentData);
        const savedAppointment = await appointment.save();

        // Initialize chat in Firestore
        await firestore.collection('chats').doc(savedAppointment._id.toString()).set({
            appointmentId: savedAppointment._id.toString(),
            // participantIds: [appointmentData.provider, appointmentData.consumer, appointmentData._id],
            createdAt: FieldValue.serverTimestamp(),
        });

        return savedAppointment;
    } catch (error) {
        console.error('Error in createAppointmentService:', error);
        throw error;
    }
}



// export async function updateFirebaseCustomClaims(userId, appointmentId) {
//     try {
//         // Fetch the user's Firebase UID from your User model
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new Error(`User ${userId} not found or has no Firebase UID`);
//         }

//         // Get the user's current custom claims
//         // const { customClaims } = await admin.auth().getUser(user.firebaseUid);

//         // Update the appointments claim
//         const updatedClaims = {
//             ...customClaims,
//             appointments: {
//                 ...(customClaims?.appointments || {}),
//                 [appointmentId.toString()]: true
//             }
//         };

//         // Set the updated custom claims
//         await admin.auth().setCustomUserClaims(user.firebaseUid, updatedClaims);
//         console.log(`Updated Firebase custom claims for user ${userId} with appointment ${appointmentId}`);
//     } catch (error) {
//         console.error(`Error updating Firebase custom claims for user ${userId}:`, error);
//         // You might want to handle this error based on your application's needs
//         // For now, we'll just log it and not throw, to prevent the appointment creation from failing
//     }
// }
// Get all appointments
export async function getAppointmentsService() {
    return await Appointment.find()
        .populate('provider')
        .populate('consumer');
}

// Get a single appointment by ID
export async function getAppointmentByIdService(id) {
    return await Appointment.findById(id)
        .populate('provider')
        .populate('consumer');
}

// Update an appointment by ID
export async function updateAppointmentService(id, updateData) {
    return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
}

// Delete an appointment by ID
export async function deleteAppointmentService(id) {
    const result = await Appointment.findByIdAndDelete(id);
    return result ? true : false;
}

// Get all appointments for a specific consumer
export async function getAppointmentsForConsumerService(consumerId) {
    return await Appointment.find({ consumer: consumerId })
        .populate('provider', ["avatar", 'name'])
        .populate('consumer', ["avatar", 'name']);
}

// Get all appointments for a specific provider
export async function getAppointmentsForProviderService(providerId) {
    return await Appointment.find({ provider: providerId })
        .populate('provider', ["avatar", 'name'])
        .populate('consumer', ["avatar", 'name'])
}
