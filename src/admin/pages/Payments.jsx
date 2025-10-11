import { useState, useEffect } from 'react';
import { FiDollarSign, FiCalendar, FiCreditCard, FiPlus, FiTrash2, FiX, FiEdit2, FiFilter } from 'react-icons/fi';
import { getAllPayments, createPayment, updatePayment, deletePayment, getPaymentStats } from '../../services/paymentService';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    date: '',
    method: '',
    status: 'pending',
    description: '',
    comment: ''
  });

  // Fetch payments and stats on component mount
  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, [filterStatus]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = filterStatus !== 'All' ? { status: filterStatus } : {};
      const response = await getAllPayments(params);
      setPayments(response.data || []);
    } catch (err) {
      setError('Failed to load payments. Please try again.');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getPaymentStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPayment) {
        // Update existing payment - don't send invoiceNo
        const { invoiceNo, ...updateData } = formData;
        const response = await updatePayment(editingPayment._id, updateData);
        setPayments(payments.map(payment => 
          payment._id === editingPayment._id ? response.data : payment
        ));
      } else {
        // Create new payment - backend will auto-generate invoiceNo
        const response = await createPayment(formData);
        setPayments([response.data, ...payments]);
      }
      await fetchStats(); // Refresh stats
      resetForm();
    } catch (err) {
      alert(err.message || 'Failed to save payment. Please try again.');
      console.error('Error saving payment:', err);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      client: payment.client,
      amount: payment.amount,
      date: payment.date ? new Date(payment.date).toISOString().split('T')[0] : '',
      method: payment.method,
      status: payment.status,
      description: payment.description,
      comment: payment.comment || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this payment record?')) return;
    
    try {
      await deletePayment(id);
      setPayments(payments.filter(payment => payment._id !== id));
      await fetchStats(); // Refresh stats
    } catch (err) {
      alert('Failed to delete payment. Please try again.');
      console.error('Error deleting payment:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      client: '',
      amount: '',
      date: '',
      method: '',
      status: 'pending',
      description: '',
      comment: ''
    });
    setEditingPayment(null);
    setShowAddModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatMethod = (method) => {
    return method.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Calculate stats from local data
  const calculateLocalStats = () => {
    const completed = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    const failed = payments.filter(p => p.status === 'failed').reduce((sum, p) => sum + p.amount, 0);
    
    return { completed, pending, failed };
  };

  const localStats = calculateLocalStats();

  if (loading && payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (error && payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPayments}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            <h3 className="text-gray-600 text-sm font-medium">Completed</h3>
            <div className="bg-green-100 text-green-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">{formatCurrency(localStats.completed)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">{formatCurrency(localStats.pending)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Failed</h3>
            <div className="bg-red-100 text-red-800 p-2 rounded-lg">
              <FiDollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-black">{formatCurrency(localStats.failed)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <FiFilter className="text-gray-600" size={20} />
          <label className="text-sm font-semibold text-gray-700">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option>All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
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
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-black">
                      {payment.invoiceNo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{payment.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="truncate max-w-xs" title={payment.description}>
                        {payment.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" size={14} />
                        {formatDate(payment.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiCreditCard className="mr-2" size={14} />
                        {formatMethod(payment.method)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(payment)}
                          className="text-black hover:text-gray-600 p-2 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-black">
                {editingPayment ? 'Edit Payment' : 'Add New Payment'}
              </h2>
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
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    maxLength="100"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  >
                    <option value="">Select Method</option>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="upi">UPI</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                    <option value="other">Other</option>
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
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength="500"
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    maxLength="1000"
                    rows="2"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  {editingPayment ? 'Update Payment' : 'Add Payment'}
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
