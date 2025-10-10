import { FiUsers, FiMail, FiMessageSquare, FiDollarSign } from 'react-icons/fi';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Contacts',
      value: '24',
      icon: FiMail,
      color: 'bg-black',
      change: '+12% from last month'
    },
    {
      title: 'Active Queries',
      value: '18',
      icon: FiMessageSquare,
      color: 'bg-gray-800',
      change: '+5% from last month'
    },
    {
      title: 'Total Clients',
      value: '42',
      icon: FiUsers,
      color: 'bg-gray-700',
      change: '+8% from last month'
    },
    {
      title: 'Payments This Month',
      value: '$12,450',
      icon: FiDollarSign,
      color: 'bg-gray-600',
      change: '+23% from last month'
    }
  ];

  const recentActivities = [
    { type: 'Contact', name: 'John Doe', action: 'submitted a contact form', time: '2 hours ago' },
    { type: 'Query', name: 'Jane Smith', action: 'sent a service inquiry', time: '4 hours ago' },
    { type: 'Payment', name: 'Acme Corp', action: 'made a payment of $5,000', time: '5 hours ago' },
    { type: 'Client', name: 'Tech Solutions Inc', action: 'updated their profile', time: '1 day ago' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-black text-white text-xs font-semibold px-2 py-1 rounded mr-4 mt-1">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

