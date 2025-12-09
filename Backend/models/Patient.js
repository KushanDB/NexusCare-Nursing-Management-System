import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  medicalRecordNumber: {
    type: String,
    required: true,
    unique: true
  },
  admissionDate: {
    type: Date,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['admitted', 'discharged', 'critical'],
    default: 'admitted'
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Patient', patientSchema);