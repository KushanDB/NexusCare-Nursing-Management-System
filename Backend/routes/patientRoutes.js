const express = require('express');
const { getPatients, getPatient, createPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', protect, getPatients);
router.get('/:id', protect, getPatient);
router.post('/', protect, checkRole('admin', 'nurse'), createPatient);
router.put('/:id', protect, checkRole('admin', 'nurse'), updatePatient);
router.delete('/:id', protect, checkRole('admin'), deletePatient);

module.exports = router;