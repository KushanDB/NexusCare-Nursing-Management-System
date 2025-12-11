import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import AppointmentCard from '../components/AppointmentCard';
import { FiPlus, FiCalendar } from 'react-icons/fi';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter]);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments', {
        params: {
          status: statusFilter,
          date: dateFilter,
        },
      });
      setAppointments(data.appointments);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, updates) => {
    try {
      await api.put(`/appointments/${id}`, updates);
      fetchAppointments();
      toast.success('Appointment updated successfully');
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#CAF0C1]/20 to-[#87E4DB]/20">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-1">Manage patient appointments</p>
          </div>
          <Link
            to="/appointments/add"
            className="bg-gradient-to-r from-[#015D67] to-[#00ACB1] text-white px-6 py-3 rounded-lg hover:opacity-90 transition flex items-center font-medium shadow-lg"
          >
            <FiPlus className="mr-2" />
            Schedule Appointment
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No-Show">No-Show</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00ACB1] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter('');
                  setDateFilter('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ACB1]"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No appointments found</p>
            <Link
              to="/appointments/add"
              className="inline-block bg-gradient-to-r from-[#015D67] to-[#00ACB1] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Schedule First Appointment
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onUpdate={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;