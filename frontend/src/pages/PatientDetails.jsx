import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import { FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const { data } = await api.get(`/patients/${id}`);
      setPatient(data);
    } catch (error) {
      toast.error('Failed to fetch patient details');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.delete(`/patients/${id}`);
        toast.success('Patient deleted successfully');
        navigate('/patients');
      } catch (error) {
        toast.error('Failed to delete patient');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/patients')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="text-2xl" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="text-gray-600">{patient.patientId}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                to={`/patients/edit/${patient._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <FiEdit className="mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                patient.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : patient.status === 'Critical'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {patient.status}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-medium">{patient.bloodGroup || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{patient.email || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Address</h2>
              <div className="space-y-1">
                {patient.address?.street && <p>{patient.address.street}</p>}
                {patient.address?.city && <p>{patient.address.city}</p>}
                {patient.address?.state && <p>{patient.address.state}</p>}
                {patient.address?.zipCode && <p>{patient.address.zipCode}</p>}
                {patient.address?.country && <p>{patient.address.country}</p>}
                {!patient.address?.street && <p className="text-gray-500">No address provided</p>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Emergency Contact</h2>
              {patient.emergencyContact?.name ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{patient.emergencyContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Relationship</p>
                    <p className="font-medium">{patient.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{patient.emergencyContact.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No emergency contact provided</p>
              )}
            </div>

            {/* Assignment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Assignment</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Assigned Doctor</p>
                  <p className="font-medium">
                    {patient.assignedDoctor
                      ? `Dr. ${patient.assignedDoctor.name} - ${patient.assignedDoctor.department}`
                      : 'Not assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assigned Nurse</p>
                  <p className="font-medium">
                    {patient.assignedNurse
                      ? `${patient.assignedNurse.name} - ${patient.assignedNurse.department}`
                      : 'Not assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ward</p>
                  <p className="font-medium">{patient.ward || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bed Number</p>
                  <p className="font-medium">{patient.bedNumber || 'Not assigned'}</p>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Medical History</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Allergies</p>
                  {patient.medicalHistory?.allergies?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {patient.medicalHistory.allergies.map((allergy, index) => (
                        <li key={index} className="text-gray-600">
                          {allergy}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">None recorded</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Chronic Diseases</p>
                  {patient.medicalHistory?.chronicDiseases?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {patient.medicalHistory.chronicDiseases.map((disease, index) => (
                        <li key={index} className="text-gray-600">
                          {disease}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">None recorded</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Medications</p>
                  {patient.medicalHistory?.medications?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {patient.medicalHistory.medications.map((medication, index) => (
                        <li key={index} className="text-gray-600">
                          {medication}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">None recorded</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Past Surgeries</p>
                  {patient.medicalHistory?.pastSurgeries?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {patient.medicalHistory.pastSurgeries.map((surgery, index) => (
                        <li key={index} className="text-gray-600">
                          {surgery}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">None recorded</p>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {patient.notes && (
              <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{patient.notes}</p>
              </div>
            )}

            {/* Timestamps */}
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Timeline</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Admission Date</p>
                  <p className="font-medium">
                    {new Date(patient.admissionDate).toLocaleDateString()}
                  </p>
                </div>
                {patient.dischargeDate && (
                  <div>
                    <p className="text-sm text-gray-600">Discharge Date</p>
                    <p className="font-medium">
                      {new Date(patient.dischargeDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="font-medium">
                    {new Date(patient.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;