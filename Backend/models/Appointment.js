import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 30,
    },
    type: {
      type: String,
      enum: ['Checkup', 'Follow-up', 'Emergency', 'Consultation', 'Surgery'],
      default: 'Checkup',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'No-Show'],
      default: 'Scheduled',
    },
    reason: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
    },
    prescription: {
      type: String,
    },
    notes: {
      type: String,
    },
    vitalSigns: {
      bloodPressure: String,
      temperature: String,
      pulse: String,
      weight: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;