import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';

const AppointmentCard = ({ appointment, onUpdate }) => {
  const getStatusColor = (status) => {
    const colors = {
      Scheduled: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      'No-Show': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {appointment.patient.firstName} {appointment.patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">{appointment.patient.patientId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="mr-2" />
          {new Date(appointment.appointmentDate).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="mr-2" />
          {appointment.appointmentTime}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiUser className="mr-2" />
          Dr. {appointment.doctor.name}
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Type:</span> {appointment.type}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Reason:</span> {appointment.reason}
        </p>
      </div>

      {appointment.status === 'Scheduled' && (
        <button
          onClick={() => onUpdate(appointment._id, { status: 'Completed' })}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;