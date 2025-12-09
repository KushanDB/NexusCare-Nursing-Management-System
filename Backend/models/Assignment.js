const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  nurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nurse',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  notes: {
    type: String
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);