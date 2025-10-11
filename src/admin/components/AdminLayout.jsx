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
  FiMail,
  FiFileText
} from 'react-icons/fi';
import adminAuthService from '../../services/adminAuthService';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify admin authentication
    const verifyAdmin = async () => {
      try {
        const data = await adminAuthService.verifyAdmin();
        setAdminUser(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Admin verification failed:', error);
        adminAuthService.logout();
        navigate('/admin/login');
      }
    };

    verifyAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await adminAuthService.logoutAPI();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
    { name: 'Contacts', path: '/admin/contacts', icon: FiMail },
    { name: 'Queries', path: '/admin/queries', icon: FiMessageSquare },
    { name: 'Clients', path: '/admin/clients', icon: FiUsers },
    { name: 'Payments', path: '/admin/payments', icon: FiDollarSign },
    { name: 'Blogs', path: '/admin/blogs', icon: FiFileText },
  ];

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-black w-64`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-3">
            <div>
              <h2 className="text-2xl font-bold text-white">Waglogy</h2>
              {adminUser && (
                <p className="text-xs text-gray-400 mt-1">{adminUser.name}</p>
              )}
            </div>
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
        <header className="bg-white shadow-sm border border-gray-200 rounded-lg m-4">
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
        <main className="p-6 pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

