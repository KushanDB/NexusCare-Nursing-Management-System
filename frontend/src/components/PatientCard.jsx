import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const PatientCard = ({ patient, onDelete }) => {
  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Discharged: 'bg-blue-100 text-blue-800',
      Critical: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">{patient.patientId}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Gender:</span> {patient.gender}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Blood Group:</span> {patient.bloodGroup || 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Phone:</span> {patient.phone}
        </p>
        {patient.assignedDoctor && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Doctor:</span> {patient.assignedDoctor.name}
          </p>
        )}
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/patients/${patient._id}`}
          className="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
        >
          <FiEye className="mr-2" />
          View
        </Link>
        <Link
          to={`/patients/edit/${patient._id}`}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          <FiEdit />
        </Link>
        <button
          onClick={() => onDelete(patient._id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default PatientCard;