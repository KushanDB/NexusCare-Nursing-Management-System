import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiGrid,
  FiUsers,
  FiCalendar,
  FiUserCheck,
  FiUser,
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', icon: FiGrid, label: 'Dashboard', roles: ['admin', 'doctor', 'nurse'] },
    { path: '/patients', icon: FiUsers, label: 'Patients', roles: ['admin', 'doctor', 'nurse'] },
    { path: '/appointments', icon: FiCalendar, label: 'Appointments', roles: ['admin', 'doctor', 'nurse'] },
    { path: '/staff', icon: FiUserCheck, label: 'Staff', roles: ['admin'] },
    { path: '/profile', icon: FiUser, label: 'Profile', roles: ['admin', 'doctor', 'nurse'] },
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 pt-8">
      <nav className="px-4 space-y-2">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;