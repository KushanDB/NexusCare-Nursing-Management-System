import Patient from '../models/Patient.js';

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('createdBy', 'name email');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single patient
const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create patient
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPatients, getPatient, createPatient, updatePatient, deletePatient };