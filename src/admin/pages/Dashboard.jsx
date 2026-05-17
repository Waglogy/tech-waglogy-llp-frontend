import { useState, useEffect } from 'react';
import {
  FiUsers,
  FiMail,
  FiMessageSquare,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiRefreshCw,
  FiArrowRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getAllContacts } from '../../services/contactService';
import { getAllQueries } from '../../services/queryService';
import { getAllClients } from '../../services/clientService';
import { getAllPayments } from '../../services/paymentService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeQueries: 0,
    totalClients: 0,
    paymentsThisMonth: 0,
    activeClientsRevenue: 0,
    completedPayments: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      const [contactsRes, queriesRes, clientsRes, paymentsRes] = await Promise.all([
        getAllContacts().catch(() => ({ data: [], count: 0 })),
        getAllQueries().catch(() => ({ data: [], count: 0 })),
        getAllClients().catch(() => ({ data: [], count: 0 })),
        getAllPayments().catch(() => ({ data: [], count: 0 })),
      ]);

      const activeQueries = queriesRes.data?.filter(
        (q) => q.status === 'new' || q.status === 'read'
      ).length || 0;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const paymentsThisMonth = paymentsRes.data?.filter((p) => {
        const paymentDate = new Date(p.date);
        return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
      }).reduce((sum, p) => sum + p.amount, 0) || 0;

      const activeClientsRevenue = clientsRes.data?.filter(
        (c) => c.status === 'active'
      ).reduce((sum, c) => sum + c.revenue, 0) || 0;

      const completedPayments = paymentsRes.data?.filter(
        (p) => p.status === 'completed'
      ).reduce((sum, p) => sum + p.amount, 0) || 0;

      setStats({
        totalContacts: contactsRes.count || contactsRes.data?.length || 0,
        activeQueries,
        totalClients: clientsRes.count || clientsRes.data?.length || 0,
        paymentsThisMonth,
        activeClientsRevenue,
        completedPayments,
      });

      const activities = [];
      contactsRes.data?.slice(0, 3).forEach((c) => activities.push({
        type: 'Contact', name: c.fullName, action: 'submitted a contact form',
        time: formatTimeAgo(c.createdAt), timestamp: new Date(c.createdAt).getTime(),
      }));
      queriesRes.data?.slice(0, 3).forEach((q) => activities.push({
        type: 'Query', name: 'User',
        action: `sent a query: "${(q.message || '').substring(0, 60)}${q.message?.length > 60 ? '…' : ''}"`,
        time: formatTimeAgo(q.createdAt), timestamp: new Date(q.createdAt).getTime(),
      }));
      paymentsRes.data?.slice(0, 3).forEach((p) => activities.push({
        type: 'Payment', name: p.client, action: `made a payment of ${formatCurrency(p.amount)}`,
        time: formatTimeAgo(p.createdAt), timestamp: new Date(p.createdAt).getTime(),
      }));
      clientsRes.data?.slice(0, 3).forEach((c) => activities.push({
        type: 'Client', name: c.company, action: `added as new client — ${c.service}`,
        time: formatTimeAgo(c.createdAt), timestamp: new Date(c.createdAt).getTime(),
      }));

      activities.sort((a, b) => b.timestamp - a.timestamp);
      setRecentActivities(activities.slice(0, 10));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((Date.now() - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const activityPill = {
    Contact: 'admin-pill-blue',
    Query: 'admin-pill-amber',
    Payment: 'admin-pill-green',
    Client: 'admin-pill-purple',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    { title: 'Total Contacts', value: stats.totalContacts, icon: FiMail, trend: 'Active submissions', tint: 'bg-[#EFF6FF] text-[#1D4ED8]', link: '/admin/contacts' },
    { title: 'Active Queries', value: stats.activeQueries, icon: FiMessageSquare, trend: 'Pending responses', tint: 'bg-[#FFFBEB] text-[#B45309]', link: '/admin/queries' },
    { title: 'Total Clients', value: stats.totalClients, icon: FiUsers, trend: 'In portfolio', tint: 'bg-[#F5F3FF] text-[#6D28D9]', link: '/admin/clients' },
    { title: 'Payments This Month', value: formatCurrency(stats.paymentsThisMonth), icon: FiDollarSign, trend: 'Current month', tint: 'bg-[#ECFDF5] text-[#047857]', link: '/admin/payments' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Overview</span>
          <h1 className="admin-page-title mt-3">Dashboard</h1>
          <p className="admin-page-subtitle">Welcome back — here's what's happening today.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={refreshing}
          className="btn-outline text-sm py-2.5 px-4 disabled:opacity-60"
        >
          <FiRefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="admin-card p-5 hover:border-[#C9C4BB] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.tint} p-2.5 rounded-lg`}>
                <stat.icon size={18} />
              </div>
              <FiArrowRight size={16} className="text-[#C9C4BB] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-1">{stat.title}</h3>
            <p className="text-2xl font-semibold text-[#0C0C0C] tracking-tight mb-1 font-['Outfit']">{stat.value}</p>
            <p className="text-xs text-[#6E6B67]">{stat.trend}</p>
          </Link>
        ))}
      </div>

      {/* Revenue row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="admin-card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-2">
                Active Clients Revenue
              </h3>
              <p className="text-3xl font-semibold text-[#0C0C0C] tracking-tight font-['Outfit']">
                {formatCurrency(stats.activeClientsRevenue)}
              </p>
            </div>
            <div className="bg-[#ECFDF5] text-[#047857] p-2.5 rounded-lg">
              <FiTrendingUp size={18} />
            </div>
          </div>
          <p className="text-xs text-[#6E6B67]">From ongoing projects</p>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider mb-2">
                Completed Payments
              </h3>
              <p className="text-3xl font-semibold text-[#0C0C0C] tracking-tight font-['Outfit']">
                {formatCurrency(stats.completedPayments)}
              </p>
            </div>
            <div className="bg-[#EFF6FF] text-[#1D4ED8] p-2.5 rounded-lg">
              <FiDollarSign size={18} />
            </div>
          </div>
          <p className="text-xs text-[#6E6B67]">Successfully received</p>
        </div>
      </div>

      {/* Activity */}
      <div className="admin-card">
        <div className="px-6 py-4 border-b border-[#E5E2DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiActivity size={16} className="text-[#6E6B67]" />
            <h2 className="text-base font-semibold text-[#0C0C0C] font-['Outfit']">Recent activity</h2>
          </div>
          <span className="text-xs text-[#6E6B67]">
            Last {recentActivities.length} updates
          </span>
        </div>
        <div className="p-6">
          {recentActivities.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-[#6E6B67]">No recent activity yet.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {recentActivities.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-[#F0EDE8] last:border-0 last:pb-0"
                >
                  <span className={`admin-pill ${activityPill[a.type] || 'admin-pill-gray'} shrink-0 mt-0.5`}>
                    {a.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0C0C0C]">
                      <span className="font-medium">{a.name}</span>{' '}
                      <span className="text-[#6E6B67]">{a.action}</span>
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
