const express = require('express');
const { getNurses, getNurse, createNurse, updateNurse, deleteNurse } = require('../controllers/nurseController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', protect, getNurses);
router.get('/:id', protect, getNurse);
router.post('/', protect, checkRole('admin'), createNurse);
router.put('/:id', protect, checkRole('admin'), updateNurse);
router.delete('/:id', protect, checkRole('admin'), deleteNurse);

module.exports = router;