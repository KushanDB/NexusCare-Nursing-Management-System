import Assignment from '../models/Assignment.js';

// Get all assignments
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('nurse', 'name specialization')
      .populate('patient', 'name medicalRecordNumber condition')
      .populate('assignedBy', 'name email');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create assignment
const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      assignedBy: req.user._id
    });
    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('nurse', 'name specialization')
      .populate('patient', 'name medicalRecordNumber');
    res.status(201).json(populatedAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update assignment
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('nurse patient');
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete assignment
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAssignments, createAssignment, updateAssignment, deleteAssignment };
