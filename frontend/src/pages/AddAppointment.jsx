import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';

const AddAppointment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
        duration: 30,
        type: 'Checkup',
        reason: '',
        notes: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [patientsRes, doctorsRes] = await Promise.all([
                api.get('/patients'),
                api.get('/staff/doctors'),
            ]);
            setPatients(patientsRes.data.patients);
            setDoctors(doctorsRes.data);
        } catch (error) {
            toast.error('Failed to fetch data');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/appointments', formData);
            toast.success('Appointment scheduled successfully!');
            navigate('/appointments');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule appointment');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#CAF0C1]/20 to-[#87E4DB]/20">

            <div className="flex-1 p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Schedule Appointment</h1>
                        <p className="text-gray-600 mt-1">Create a new patient appointment</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Patient *
                                </label>
                                <select
                                    name="patient"
                                    value={formData.patient}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                >
                                    <option value="">Select Patient</option>
                                    {patients.map((patient) => (
                                        <option key={patient._id} value={patient._id}>
                                            {patient.firstName} {patient.lastName} ({patient.patientId})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
                                <select
                                    name="doctor"
                                    value={formData.doctor}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                >
                                    <option value="">Select Doctor</option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            Dr. {doctor.name} - {doctor.department}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                                <input
                                    type="date"
                                    name="appointmentDate"
                                    value={formData.appointmentDate}
                                    onChange={handleChange}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                                <input
                                    type="time"
                                    name="appointmentTime"
                                    value={formData.appointmentTime}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    min="15"
                                    step="15"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                >
                                    <option value="Checkup">Checkup</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Surgery">Surgery</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                placeholder="Describe the reason for appointment..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                                placeholder="Additional notes..."
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-[#015D67] to-[#00ACB1] text-white py-3 rounded-lg hover:opacity-90 transition disabled:bg-gray-400 font-medium"
                            >
                                {loading ? 'Scheduling...' : 'Schedule Appointment'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/appointments')}
                                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAppointment;