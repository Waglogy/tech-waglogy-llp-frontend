import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiMessageSquare, 
  FiDollarSign, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiMail
} from 'react-icons/fi';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'Contacts', path: '/admin/contacts', icon: FiMail },
    { name: 'Queries', path: '/admin/queries', icon: FiMessageSquare },
    { name: 'Clients', path: '/admin/clients', icon: FiUsers },
    { name: 'Payments', path: '/admin/payments', icon: FiDollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-black w-64`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-3">
            <h2 className="text-2xl font-bold text-white">Waglogy</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="mr-3" size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiLogOut className="mr-3" size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-black"
            >
              <FiMenu size={24} />
            </button>
            <div className="text-sm text-gray-600">
              Admin Panel
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

