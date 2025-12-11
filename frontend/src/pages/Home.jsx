import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUsers, FiCalendar, FiActivity, FiShield } from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiUsers,
      title: 'Patient Management',
      description: 'Comprehensive patient records with medical history tracking',
      color: 'blue',
    },
    {
      icon: FiCalendar,
      title: 'Appointment Scheduling',
      description: 'Efficient appointment booking and management system',
      color: 'green',
    },
    {
      icon: FiActivity,
      title: 'Real-time Monitoring',
      description: 'Track patient status and vital signs in real-time',
      color: 'red',
    },
    {
      icon: FiShield,
      title: 'Secure & HIPAA Compliant',
      description: 'Enterprise-grade security for patient data protection',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern Healthcare{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Management System
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your healthcare operations with our comprehensive nursing management
            platform. Manage patients, appointments, and staff all in one place.
          </p>

          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
            >
              <div
                className={`bg-${feature.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className={`text-3xl text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-blue-600 mb-2">1000+</p>
              <p className="text-gray-600 font-medium">Patients Managed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2">50+</p>
              <p className="text-gray-600 font-medium">Healthcare Professionals</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-purple-600 mb-2">5000+</p>
              <p className="text-gray-600 font-medium">Appointments Scheduled</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Healthcare Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of healthcare professionals using MediCare
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-block bg-linear-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-medium hover:shadow-2xl transition"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;