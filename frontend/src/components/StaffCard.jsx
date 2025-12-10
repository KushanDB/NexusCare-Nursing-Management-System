import { FiEdit, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

const StaffCard = ({ staff, onEdit, onDelete }) => {
  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      doctor: 'bg-blue-100 text-blue-800',
      nurse: 'bg-green-100 text-green-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{staff.name}</h3>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleColor(staff.role)}`}>
            {staff.role}
          </span>
        </div>
        <div className={`w-3 h-3 rounded-full ${staff.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Department:</span> {staff.department || 'N/A'}
        </p>
        {staff.specialization && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Specialization:</span> {staff.specialization}
          </p>
        )}
        <div className="flex items-center text-sm text-gray-600">
          <FiMail className="mr-2" />
          {staff.email}
        </div>
        {staff.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <FiPhone className="mr-2" />
            {staff.phone}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(staff)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
        >
          <FiEdit className="mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(staff._id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default StaffCard;