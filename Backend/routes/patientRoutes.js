import express from 'express';
import { getPatients, getPatient, createPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', protect, getPatients);
router.get('/:id', protect, getPatient);
router.post('/', protect, checkRole('admin', 'nurse'), createPatient);
router.put('/:id', protect, checkRole('admin', 'nurse'), updatePatient);
router.delete('/:id', protect, checkRole('admin'), deletePatient);

export default router;