import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide date of birth'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    medicalHistory: {
      allergies: [String],
      chronicDiseases: [String],
      medications: [String],
      pastSurgeries: [String],
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    dischargeDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Active', 'Discharged', 'Critical'],
      default: 'Active',
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedNurse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ward: {
      type: String,
    },
    bedNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate patient ID
patientSchema.pre('save', async function (next) {
  if (!this.patientId) {
    const count = await mongoose.model('Patient').countDocuments();
    const year = new Date().getFullYear();
    this.patientId = `PAT-${year}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;