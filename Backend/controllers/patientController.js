import Patient from '../models/Patient.js';

export const getPatients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = req.query.search || '';
    const query = searchQuery
      ? {
          $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { lastName: { $regex: searchQuery, $options: 'i' } },
            { patientId: { $regex: searchQuery, $options: 'i' } },
          ],
        }
      : {};

    if (req.query.status) {
      query.status = req.query.status;
    }

    const patients = await Patient.find(query)
      .populate('assignedDoctor', 'name department')
      .populate('assignedNurse', 'name department')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Patient.countDocuments(query);

    res.json({
      patients,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPatients: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('assignedDoctor', 'name email department phone')
      .populate('assignedNurse', 'name email department phone');

    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    await patient.populate('assignedDoctor', 'name department');
    await patient.populate('assignedNurse', 'name department');
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    Object.keys(req.body).forEach((key) => {
      patient[key] = req.body[key];
    });

    const updatedPatient = await patient.save();
    await updatedPatient.populate('assignedDoctor', 'name department');
    await updatedPatient.populate('assignedNurse', 'name department');

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await Patient.deleteOne({ _id: req.params.id });
    res.json({ message: 'Patient removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const activePatients = await Patient.countDocuments({ status: 'Active' });
    const dischargedPatients = await Patient.countDocuments({ status: 'Discharged' });
    const criticalPatients = await Patient.countDocuments({ status: 'Critical' });

    const genderStats = await Patient.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } },
    ]);

    const bloodGroupStats = await Patient.aggregate([
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
    ]);

    res.json({
      totalPatients,
      activePatients,
      dischargedPatients,
      criticalPatients,
      genderStats,
      bloodGroupStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};