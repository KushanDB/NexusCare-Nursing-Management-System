import express from 'express';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/', protect, checkRole('admin'), createAssignment);
router.put('/:id', protect, checkRole('admin'), updateAssignment);
router.delete('/:id', protect, checkRole('admin'), deleteAssignment);

export default router;