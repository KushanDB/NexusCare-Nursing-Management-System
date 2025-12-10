import User from '../models/User.js';

export const getAllStaff = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.role) {
      query.role = req.query.role;
    }

    if (req.query.department) {
      query.department = { $regex: req.query.department, $options: 'i' };
    }

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const staff = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await User.countDocuments(query);

    res.json({
      staff,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalStaff: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id).select('-password');

    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ message: 'Staff member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    staff.name = req.body.name || staff.name;
    staff.email = req.body.email || staff.email;
    staff.phone = req.body.phone || staff.phone;
    staff.department = req.body.department || staff.department;
    staff.role = req.body.role || staff.role;
    staff.specialization = req.body.specialization || staff.specialization;
    staff.isActive = req.body.isActive !== undefined ? req.body.isActive : staff.isActive;

    const updatedStaff = await staff.save();

    res.json({
      _id: updatedStaff._id,
      name: updatedStaff.name,
      email: updatedStaff.email,
      role: updatedStaff.role,
      department: updatedStaff.department,
      phone: updatedStaff.phone,
      specialization: updatedStaff.specialization,
      isActive: updatedStaff.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    if (staff._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Staff member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', isActive: true })
      .select('name department email phone specialization')
      .sort({ name: 1 });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNurses = async (req, res) => {
  try {
    const nurses = await User.find({ role: 'nurse', isActive: true })
      .select('name department email phone')
      .sort({ name: 1 });

    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStaffStats = async (req, res) => {
  try {
    const totalStaff = await User.countDocuments();
    const doctors = await User.countDocuments({ role: 'doctor' });
    const nurses = await User.countDocuments({ role: 'nurse' });
    const admins = await User.countDocuments({ role: 'admin' });
    const activeStaff = await User.countDocuments({ isActive: true });

    const departmentStats = await User.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalStaff,
      doctors,
      nurses,
      admins,
      activeStaff,
      inactiveStaff: totalStaff - activeStaff,
      departmentStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};