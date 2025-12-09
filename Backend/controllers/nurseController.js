const Nurse = require('../models/Nurse');

// Get all nurses
const getNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find().populate('createdBy', 'name email');
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single nurse
const getNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create nurse
const createNurse = async (req, res) => {
  try {
    const nurse = await Nurse.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(nurse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update nurse
const updateNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete nurse
const deleteNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndDelete(req.params.id);
    if (!nurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.json({ message: 'Nurse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNurses, getNurse, createNurse, updateNurse, deleteNurse };