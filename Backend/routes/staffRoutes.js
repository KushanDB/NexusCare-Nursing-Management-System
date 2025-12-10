import express from 'express';
import {
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  getDoctors,
  getNurses,
  getStaffStats,
} from '../controllers/staffController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/doctors', getDoctors);
router.get('/nurses', getNurses);

router.get('/stats', authorize('admin'), getStaffStats);
router.get('/', authorize('admin'), getAllStaff);

router
  .route('/:id')
  .get(authorize('admin'), getStaffById)
  .put(authorize('admin'), updateStaff)
  .delete(authorize('admin'), deleteStaff);

export default router;