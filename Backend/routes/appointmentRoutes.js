import express from 'express';
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getTodayAppointments,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/today', getTodayAppointments);

router
  .route('/')
  .get(getAppointments)
  .post(authorize('doctor', 'nurse', 'admin'), createAppointment);

router
  .route('/:id')
  .get(getAppointmentById)
  .put(authorize('doctor', 'nurse', 'admin'), updateAppointment)
  .delete(authorize('admin'), deleteAppointment);

export default router;