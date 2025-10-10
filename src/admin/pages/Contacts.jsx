import { useState } from 'react';
import { FiMail, FiPhone, FiCalendar, FiTrash2, FiEye } from 'react-icons/fi';

const Contacts = () => {
  const [contacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      subject: 'Website Development Inquiry',
      message: 'I am interested in developing a new website for my business.',
      date: '2025-10-08',
      status: 'New'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      subject: 'Mobile App Development',
      message: 'Looking for a team to build an iOS and Android app.',
      date: '2025-10-07',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+1 234 567 8902',
      subject: 'SEO Services',
      message: 'Need help with SEO optimization for my e-commerce site.',
      date: '2025-10-06',
      status: 'Replied'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+1 234 567 8903',
      subject: 'General Inquiry',
      message: 'What are your hourly rates for consulting services?',
      date: '2025-10-05',
      status: 'New'
    }
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Replied':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Contacts</h1>
        <p className="text-gray-600 mt-2">Manage all contact form submissions</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-black font-medium">{contact.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiMail className="mr-2" size={14} />
                      {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{contact.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" size={14} />
                      {contact.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
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

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-black">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <p className="text-black">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <p className="text-black">{selectedContact.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                <p className="text-black">{selectedContact.phone}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <p className="text-black">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <p className="text-black">{selectedContact.message}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Date</label>
                  <p className="text-black">{selectedContact.date}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <p className="text-black">{selectedContact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;

