const express = require('express');
const { getAssignments, createAssignment, updateAssignment, deleteAssignment } = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/', protect, checkRole('admin'), createAssignment);
router.put('/:id', protect, checkRole('admin'), updateAssignment);
router.delete('/:id', protect, checkRole('admin'), deleteAssignment);

module.exports = router;