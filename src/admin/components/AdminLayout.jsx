import { useState, useEffect } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiDollarSign,
  FiMenu,
  FiX,
  FiLogOut,
  FiMail,
  FiFileText,
  FiCreditCard,
  FiExternalLink,
} from 'react-icons/fi';
import adminAuthService from '../../services/adminAuthService';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
  { name: 'Contacts', path: '/admin/contacts', icon: FiMail },
  { name: 'Queries', path: '/admin/queries', icon: FiMessageSquare },
  { name: 'Clients', path: '/admin/clients', icon: FiUsers },
  { name: 'Payments', path: '/admin/payments', icon: FiDollarSign },
  { name: 'Invoices', path: '/admin/invoices', icon: FiCreditCard },
  { name: 'Blogs', path: '/admin/blogs', icon: FiFileText },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Verifying authentication…</p>
        </div>
      </div>
    );
  }

  const currentPage = navItems.find((n) => location.pathname.startsWith(n.path))?.name || 'Admin';

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-[#E5E2DC] flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="px-5 h-[4.5rem] flex items-center justify-between border-b border-[#E5E2DC] shrink-0">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Waglogy" className="h-9 w-auto" />
          </a>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden admin-icon-btn"
            aria-label="Close sidebar"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-[0.08em] text-[#6E6B67] uppercase">
            Workspace
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EFF6FF] text-[#1D4ED8]'
                        : 'text-[#3D3A36] hover:bg-[#F5F4F0] hover:text-[#0C0C0C]'
                    }`
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="px-3 mt-7 mb-2 text-[11px] font-semibold tracking-[0.08em] text-[#6E6B67] uppercase">
            Shortcuts
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#3D3A36] hover:bg-[#F5F4F0] hover:text-[#0C0C0C] transition-colors"
          >
            <FiExternalLink size={18} className="shrink-0" />
            <span>View site</span>
          </a>
        </nav>

        {/* User / Logout */}
        <div className="p-3 border-t border-[#E5E2DC] shrink-0">
          {adminUser && (
            <div className="px-3 py-2 mb-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-sm font-semibold shrink-0">
                {(adminUser.name || 'A').slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#0C0C0C] truncate">
                  {adminUser.name || 'Admin'}
                </p>
                <p className="text-xs text-[#6E6B67] truncate">
                  {adminUser.email || 'Administrator'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#3D3A36] hover:bg-[#FEF2F2] hover:text-[#B91C1C] transition-colors"
          >
            <FiLogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-[margin] duration-200`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-[#E5E2DC]">
          <div className="px-6 h-[4.5rem] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="admin-icon-btn"
                aria-label="Toggle sidebar"
              >
                <FiMenu size={18} />
              </button>
              <div className="hidden sm:flex items-center text-sm text-[#6E6B67]">
                <span>Admin</span>
                <span className="mx-2 text-[#C9C4BB]">/</span>
                <span className="text-[#0C0C0C] font-medium">{currentPage}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#3D3A36] hover:bg-[#F5F4F0] transition-colors"
              >
                <FiExternalLink size={14} />
                View site
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-6 py-8 max-w-[1400px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
