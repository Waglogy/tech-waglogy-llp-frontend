import { useState, useEffect } from 'react';
import { FiUsers, FiMail, FiMessageSquare, FiDollarSign, FiTrendingUp, FiActivity } from 'react-icons/fi';
import { getAllContacts } from '../../services/contactService';
import { getAllQueries } from '../../services/queryService';
import { getAllClients, getClientStats } from '../../services/clientService';
import { getAllPayments, getPaymentStats } from '../../services/paymentService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
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
      setLoading(true);

      // Fetch all data in parallel
      const [contactsRes, queriesRes, clientsRes, paymentsRes, clientStatsRes, paymentStatsRes] = await Promise.all([
        getAllContacts().catch(() => ({ data: [], count: 0 })),
        getAllQueries().catch(() => ({ data: [], count: 0 })),
        getAllClients().catch(() => ({ data: [], count: 0 })),
        getAllPayments().catch(() => ({ data: [], count: 0 })),
        getClientStats().catch(() => ({ data: null })),
        getPaymentStats().catch(() => ({ data: null })),
      ]);

      // Calculate active queries (new + read status)
      const activeQueries = queriesRes.data?.filter(
        q => q.status === 'new' || q.status === 'read'
      ).length || 0;

      // Calculate payments this month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const paymentsThisMonth = paymentsRes.data?.filter(p => {
        const paymentDate = new Date(p.date);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      }).reduce((sum, p) => sum + p.amount, 0) || 0;

      // Calculate active clients revenue
      const activeClientsRevenue = clientsRes.data?.filter(
        c => c.status === 'active'
      ).reduce((sum, c) => sum + c.revenue, 0) || 0;

      // Calculate completed payments
      const completedPayments = paymentsRes.data?.filter(
        p => p.status === 'completed'
      ).reduce((sum, p) => sum + p.amount, 0) || 0;

      setStats({
        totalContacts: contactsRes.count || contactsRes.data?.length || 0,
        activeQueries,
        totalClients: clientsRes.count || clientsRes.data?.length || 0,
        paymentsThisMonth,
        activeClientsRevenue,
        completedPayments,
      });

      // Generate recent activities from all sources
      const activities = [];

      // Add recent contacts
      if (contactsRes.data?.length > 0) {
        contactsRes.data.slice(0, 3).forEach(contact => {
          activities.push({
            type: 'Contact',
            name: contact.fullName,
            action: 'submitted a contact form',
            time: formatTimeAgo(contact.createdAt),
            timestamp: new Date(contact.createdAt).getTime(),
          });
        });
      }

      // Add recent queries
      if (queriesRes.data?.length > 0) {
        queriesRes.data.slice(0, 3).forEach(query => {
          activities.push({
            type: 'Query',
            name: 'User',
            action: `sent a query: "${query.message.substring(0, 50)}..."`,
            time: formatTimeAgo(query.createdAt),
            timestamp: new Date(query.createdAt).getTime(),
          });
        });
      }

      // Add recent payments
      if (paymentsRes.data?.length > 0) {
        paymentsRes.data.slice(0, 3).forEach(payment => {
          activities.push({
            type: 'Payment',
            name: payment.client,
            action: `made a payment of ${formatCurrency(payment.amount)}`,
            time: formatTimeAgo(payment.createdAt),
            timestamp: new Date(payment.createdAt).getTime(),
          });
        });
      }

      // Add recent clients
      if (clientsRes.data?.length > 0) {
        clientsRes.data.slice(0, 3).forEach(client => {
          activities.push({
            type: 'Client',
            name: client.company,
            action: `added as new client - ${client.service}`,
            time: formatTimeAgo(client.createdAt),
            timestamp: new Date(client.createdAt).getTime(),
          });
        });
      }

      // Sort by timestamp (most recent first) and take top 10
      activities.sort((a, b) => b.timestamp - a.timestamp);
      setRecentActivities(activities.slice(0, 10));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const calculatePercentage = (current, previous) => {
    if (previous === 0) return '+100%';
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(0)}%` : `${change.toFixed(0)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      icon: FiMail,
      color: 'bg-black',
      trend: 'Active submissions',
    },
    {
      title: 'Active Queries',
      value: stats.activeQueries,
      icon: FiMessageSquare,
      color: 'bg-gray-800',
      trend: 'Pending responses',
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: FiUsers,
      color: 'bg-gray-700',
      trend: 'In portfolio',
    },
    {
      title: 'Payments This Month',
      value: formatCurrency(stats.paymentsThisMonth),
      icon: FiDollarSign,
      color: 'bg-gray-600',
      trend: 'Current month',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Active Clients Revenue</h3>
              <p className="text-3xl font-bold text-black">{formatCurrency(stats.activeClientsRevenue)}</p>
            </div>
            <div className="bg-green-100 text-green-800 p-3 rounded-lg">
              <FiTrendingUp size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">From ongoing projects</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">Completed Payments</h3>
              <p className="text-3xl font-bold text-black">{formatCurrency(stats.completedPayments)}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
              <FiDollarSign size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-500">Successfully received</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <FiActivity className="mr-2" size={20} />
            <h2 className="text-xl font-bold text-black">Recent Activity</h2>
          </div>
          <button
            onClick={fetchDashboardData}
            className="text-sm text-gray-600 hover:text-black"
          >
            Refresh
          </button>
        </div>
        <div className="p-6">
          {recentActivities.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No recent activities</p>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                  <div className={`${
                    activity.type === 'Contact' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'Query' ? 'bg-yellow-100 text-yellow-800' :
                    activity.type === 'Payment' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  } text-xs font-semibold px-2 py-1 rounded mr-4 mt-1`}>
                    {activity.type}
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium">
                      {activity.name} <span className="text-gray-600 font-normal">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
