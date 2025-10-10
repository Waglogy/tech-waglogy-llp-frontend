import { useState } from 'react';
import { FiDollarSign, FiCalendar, FiCreditCard, FiPlus, FiTrash2, FiDownload, FiX } from 'react-icons/fi';

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      clientName: 'Acme Corporation',
      invoiceNumber: 'INV-001',
      amount: '$5,000',
      date: '2025-10-01',
      method: 'Bank Transfer',
      status: 'Paid',
      description: 'Web Development - Phase 1'
    },
    {
      id: 2,
      clientName: 'Tech Solutions Inc',
      invoiceNumber: 'INV-002',
      amount: '$12,000',
      date: '2025-10-05',
      method: 'Credit Card',
      status: 'Paid',
      description: 'Mobile App Development - Milestone 2'
    },
    {
      id: 3,
      clientName: 'Digital Ventures',
      invoiceNumber: 'INV-003',
      amount: '$3,500',
      date: '2025-10-08',
      method: 'PayPal',
      status: 'Pending',
      description: 'UI/UX Design Services'
    },
    {
      id: 4,
      clientName: 'E-Store Global',
      invoiceNumber: 'INV-004',
      amount: '$8,000',
      date: '2025-10-09',
      method: 'Bank Transfer',
      status: 'Paid',
      description: 'E-commerce Platform - Initial Payment'
    },
    {
      id: 5,
      clientName: 'Tech Solutions Inc',
      invoiceNumber: 'INV-005',
      amount: '$6,500',
      date: '2025-10-10',
      method: 'Check',
      status: 'Overdue',
      description: 'Consulting Services - Q4 2024'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    invoiceNumber: '',
    amount: '',
    date: '',
    method: '',
    status: 'Pending',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayments([...payments, { ...formData, id: Date.now() }]);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(payment => payment.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      invoiceNumber: '',
      amount: '',
      date: '',
      method: '',
      status: 'Pending',
      description: ''
    });
    setShowAddModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);

  const totalPending = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);

  const totalOverdue = payments
    .filter(p => p.status === 'Overdue')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">Payments</h1>
          <p className="text-gray-600 mt-2">Track and manage all payment transactions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <FiPlus size={20} />
          Add Payment
        </button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Total Paid</h3>
            <div className="bg-green-100 text-green-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">${totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Overdue</h3>
            <div className="bg-red-100 text-red-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">${totalOverdue.toLocaleString()}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Invoice</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-black">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.clientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.description}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">{payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" size={14} />
                      {payment.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiCreditCard className="mr-2" size={14} />
                      {payment.method}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="text-black hover:text-gray-600 p-2 hover:bg-gray-100 rounded"
                        title="Download Invoice"
                      >
                        <FiDownload size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(payment.id)}
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

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-black">Add New Payment</h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-black text-2xl"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                    placeholder="INV-001"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="$0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  >
                    <option value="">Select Method</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add Payment
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;

