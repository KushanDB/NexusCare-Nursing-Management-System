import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { FiUsers, FiCalendar, FiUserCheck, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    patients: { total: 0, active: 0, discharged: 0, critical: 0 },
    appointments: { today: 0, scheduled: 0 },
    staff: { total: 0, doctors: 0, nurses: 0 },
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [patientStats, appointmentsToday, staffStats] = await Promise.all([
        api.get('/patients/stats'),
        api.get('/appointments/today'),
        user.role === 'admin' ? api.get('/staff/stats') : Promise.resolve({ data: {} }),
      ]);

      setStats({
        patients: {
          total: patientStats.data.totalPatients || 0,
          active: patientStats.data.activePatients || 0,
          discharged: patientStats.data.dischargedPatients || 0,
          critical: patientStats.data.criticalPatients || 0,
        },
        appointments: {
          today: appointmentsToday.data.length || 0,
          scheduled: appointmentsToday.data.filter((a) => a.status === 'Scheduled').length || 0,
        },
        staff: {
          total: staffStats.data.totalStaff || 0,
          doctors: staffStats.data.doctors || 0,
          nurses: staffStats.data.nurses || 0,
        },
      });

      setTodayAppointments(appointmentsToday.data.slice(0, 5));
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening in your healthcare facility today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={stats.patients.total}
            icon={FiUsers}
            color="blue"
          />
          <StatCard
            title="Active Patients"
            value={stats.patients.active}
            icon={FiActivity}
            color="green"
          />
          <StatCard
            title="Critical Patients"
            value={stats.patients.critical}
            icon={FiActivity}
            color="red"
          />
          <StatCard
            title="Today's Appointments"
            value={stats.appointments.today}
            icon={FiCalendar}
            color="purple"
          />
        </div>

        {user.role === 'admin' && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Staff"
              value={stats.staff.total}
              icon={FiUserCheck}
              color="blue"
            />
            <StatCard
              title="Doctors"
              value={stats.staff.doctors}
              icon={FiUserCheck}
              color="green"
            />
            <StatCard
              title="Nurses"
              value={stats.staff.nurses}
              icon={FiUserCheck}
              color="yellow"
            />
          </div>
        )}

        {/* Today's Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Appointments</h2>
            <Link
              to="/appointments"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </Link>
          </div>

          {todayAppointments.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No appointments scheduled for today</p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {appointment.patient.firstName} {appointment.patient.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{appointment.patient.patientId}</p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {appointment.appointmentTime}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {appointment.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Doctor:</span> Dr. {appointment.doctor.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link
            to="/patients/add"
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition shadow-lg text-center"
          >
            <FiUsers className="text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Add New Patient</h3>
          </Link>
          <Link
            to="/appointments/add"
            className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition shadow-lg text-center"
          >
            <FiCalendar className="text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Schedule Appointment</h3>
          </Link>
          {user.role === 'admin' && (
            <Link
              to="/staff"
              className="bg-purple-600 text-white rounded-lg p-6 hover:bg-purple-700 transition shadow-lg text-center"
            >
              <FiUserCheck className="text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-semibold">Manage Staff</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;