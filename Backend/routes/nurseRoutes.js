import express from 'express';
import { getNurses, getNurse, createNurse, updateNurse, deleteNurse } from '../controllers/nurseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
const router = express.Router();

router.get('/', protect, getNurses);
router.get('/:id', protect, getNurse);
router.post('/', protect, checkRole('admin'), createNurse);
router.put('/:id', protect, checkRole('admin'), updateNurse);
router.delete('/:id', protect, checkRole('admin'), deleteNurse);

export default router;