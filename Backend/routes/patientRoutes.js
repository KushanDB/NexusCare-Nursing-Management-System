import express from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientStats,
} from '../controllers/patientController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stats', authorize('admin', 'doctor'), getPatientStats);

router
  .route('/')
  .get(getPatients)
  .post(authorize('doctor', 'nurse', 'admin'), createPatient);

router
  .route('/:id')
  .get(getPatientById)
  .put(authorize('doctor', 'nurse', 'admin'), updatePatient)
  .delete(authorize('admin'), deletePatient);

export default router;