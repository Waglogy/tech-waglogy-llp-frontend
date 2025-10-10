import { useState } from 'react';
import { FiMessageSquare, FiCalendar, FiTrash2, FiEye, FiFilter } from 'react-icons/fi';

const Queries = () => {
  const [queries] = useState([
    {
      id: 1,
      name: 'Robert Brown',
      email: 'robert.b@example.com',
      service: 'Web Development',
      budget: '$5,000 - $10,000',
      timeline: '2-3 months',
      description: 'Need a full-stack web application with payment integration.',
      date: '2025-10-09',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      service: 'Mobile App Development',
      budget: '$10,000 - $20,000',
      timeline: '3-4 months',
      description: 'Looking to develop a fitness tracking mobile app for iOS and Android.',
      date: '2025-10-08',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'David Wilson',
      email: 'david.w@example.com',
      service: 'UI/UX Design',
      budget: '$3,000 - $5,000',
      timeline: '1 month',
      description: 'Redesign existing website with modern UI/UX principles.',
      date: '2025-10-07',
      priority: 'Low'
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      service: 'E-commerce Development',
      budget: '$15,000 - $25,000',
      timeline: '4-5 months',
      description: 'Build a complete e-commerce platform with inventory management.',
      date: '2025-10-06',
      priority: 'High'
    },
    {
      id: 5,
      name: 'Chris Martin',
      email: 'chris.m@example.com',
      service: 'SEO & Marketing',
      budget: '$2,000 - $4,000',
      timeline: 'Ongoing',
      description: 'SEO optimization and digital marketing services for local business.',
      date: '2025-10-05',
      priority: 'Medium'
    }
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [filterPriority, setFilterPriority] = useState('All');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredQueries = filterPriority === 'All' 
    ? queries 
    : queries.filter(q => q.priority === filterPriority);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Service Queries</h1>
        <p className="text-gray-600 mt-2">Manage all service inquiries and quotes</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <FiFilter className="text-gray-600" size={20} />
          <label className="text-sm font-semibold text-gray-700">Filter by Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Timeline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-black">{query.name}</div>
                    <div className="text-gray-600 text-xs">{query.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiMessageSquare className="mr-2" size={14} />
                      {query.service}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{query.budget}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{query.timeline}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" size={14} />
                      {query.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(query.priority)}`}>
                      {query.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedQuery(query)}
                        className="text-black hover:text-gray-600 p-2 hover:bg-gray-100 rounded"
                        title="View"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-black">Query Details</h2>
              <button
                onClick={() => setSelectedQuery(null)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Name</label>
                  <p className="text-black">{selectedQuery.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <p className="text-black">{selectedQuery.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Service Type</label>
                <p className="text-black">{selectedQuery.service}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Budget Range</label>
                  <p className="text-black">{selectedQuery.budget}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Timeline</label>
                  <p className="text-black">{selectedQuery.timeline}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Project Description</label>
                <p className="text-black">{selectedQuery.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Date Submitted</label>
                  <p className="text-black">{selectedQuery.date}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Priority</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(selectedQuery.priority)}`}>
                    {selectedQuery.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;

