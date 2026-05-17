import { useState, useEffect } from 'react';
import {
  FiDollarSign, FiCalendar, FiCreditCard, FiPlus, FiTrash2, FiX, FiEdit2,
  FiAlertCircle, FiCheckCircle, FiClock, FiXCircle,
} from 'react-icons/fi';
import {
  getAllPayments, createPayment, updatePayment, deletePayment,
} from '../../services/paymentService';

const STATUS_OPTIONS = ['pending', 'completed', 'failed', 'refunded', 'cancelled'];

const statusPill = (status) => {
  switch (status) {
    case 'completed': return 'admin-pill-green';
    case 'pending': return 'admin-pill-amber';
    case 'failed': return 'admin-pill-red';
    case 'refunded': return 'admin-pill-blue';
    case 'cancelled': return 'admin-pill-gray';
    default: return 'admin-pill-gray';
  }
};

const formatDate = (d) => {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return 'Invalid';
  }
};

const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const formatMethod = (method) => {
  if (!method || typeof method !== 'string') return method || '—';
  return method.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const emptyForm = {
  client: '', amount: '', date: '', method: '', status: 'pending', description: '', comment: '',
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPayments();
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        const { invoiceNo, ...updateData } = formData;
        const response = await updatePayment(editingPayment._id, updateData);
        setPayments(payments.map((p) => (p._id === editingPayment._id ? response.data : p)));
      } else {
        const response = await createPayment(formData);
        setPayments([response.data, ...payments]);
      }
      resetForm();
    } catch (err) {
      alert(err.message || 'Failed to save payment. Please try again.');
      console.error(err);
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
      comment: payment.comment || '',
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this payment record?')) return;
    try {
      await deletePayment(id);
      setPayments(payments.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete payment. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPayment(null);
    setShowAddModal(false);
  };

  const localStats = {
    completed: payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0),
    pending: payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0),
    failed: payments.filter((p) => p.status === 'failed').reduce((s, p) => s + p.amount, 0),
  };

  if (loading && payments.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Loading payments…</p>
        </div>
      </div>
    );
  }

  if (error && payments.length === 0) {
    return (
      <div className="admin-card p-10 text-center">
        <FiAlertCircle size={32} className="mx-auto text-[#B91C1C] mb-3" />
        <p className="text-[#0C0C0C] font-medium mb-1">Couldn't load payments</p>
        <p className="text-sm text-[#6E6B67] mb-5">{error}</p>
        <button onClick={fetchPayments} className="btn-primary text-sm py-2.5 px-5">Try again</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Finance</span>
          <h1 className="admin-page-title mt-3">Payments</h1>
          <p className="admin-page-subtitle">Track and manage all payment transactions.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm py-2.5 px-5">
          <FiPlus size={16} /> Add payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Completed" value={formatCurrency(localStats.completed)}
          icon={FiCheckCircle} tint="bg-[#ECFDF5] text-[#047857]" />
        <StatCard label="Pending" value={formatCurrency(localStats.pending)}
          icon={FiClock} tint="bg-[#FFFBEB] text-[#B45309]" />
        <StatCard label="Failed" value={formatCurrency(localStats.failed)}
          icon={FiXCircle} tint="bg-[#FEF2F2] text-[#B91C1C]" />
      </div>

      {/* Filter */}
      <div className="admin-card p-4 mb-6 flex items-center gap-3">
        <label className="text-xs font-medium text-[#6E6B67]">Filter by status</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="admin-select w-auto"
        >
          <option>All</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="admin-th">Invoice</th>
                <th className="admin-th">Client</th>
                <th className="admin-th">Description</th>
                <th className="admin-th">Amount</th>
                <th className="admin-th">Date</th>
                <th className="admin-th">Method</th>
                <th className="admin-th">Status</th>
                <th className="admin-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center text-sm text-[#6E6B67]">
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment._id} className="admin-row">
                    <td className="admin-td font-mono text-xs text-[#1D4ED8]">{payment.invoiceNo}</td>
                    <td className="admin-td font-medium text-[#0C0C0C]">{payment.client}</td>
                    <td className="admin-td text-[#6E6B67]">
                      <div className="truncate max-w-xs" title={payment.description}>
                        {payment.description}
                      </div>
                    </td>
                    <td className="admin-td font-medium text-[#0C0C0C]">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="admin-td text-[#6E6B67]">
                      <span className="inline-flex items-center gap-2">
                        <FiCalendar size={13} className="text-[#9CA3AF]" />
                        {formatDate(payment.date)}
                      </span>
                    </td>
                    <td className="admin-td text-[#6E6B67]">
                      <span className="inline-flex items-center gap-2">
                        <FiCreditCard size={13} className="text-[#9CA3AF]" />
                        {formatMethod(payment.method)}
                      </span>
                    </td>
                    <td className="admin-td">
                      <span className={`admin-pill ${statusPill(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="admin-td">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => handleEdit(payment)} className="admin-icon-btn" title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(payment._id)}
                          className="admin-icon-btn admin-icon-btn-danger"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
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

      {/* Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={resetForm}>
          <div className="admin-modal-panel max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#E5E2DC] flex items-start justify-between">
              <h2 className="text-xl font-semibold text-[#0C0C0C] font-['Outfit'] tracking-tight">
                {editingPayment ? 'Edit Payment' : 'Add New Payment'}
              </h2>
              <button onClick={resetForm} className="admin-icon-btn" aria-label="Close">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Client Name *" name="client" value={formData.client}
                  onChange={handleInputChange} maxLength="100" required />
                <Input label="Amount *" name="amount" type="number" min="0" step="0.01"
                  value={formData.amount} onChange={handleInputChange} placeholder="0.00" required />
                <Input label="Date" name="date" type="date"
                  value={formData.date} onChange={handleInputChange} />
                <div>
                  <label className="admin-label">Payment Method *</label>
                  <select name="method" value={formData.method} onChange={handleInputChange}
                    className="admin-select" required>
                    <option value="">Select method</option>
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
                  <label className="admin-label">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}
                    className="admin-select" required>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Description *</label>
                  <textarea name="description" value={formData.description}
                    onChange={handleInputChange} maxLength="500" rows="3"
                    className="admin-textarea" required />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Comment</label>
                  <textarea name="comment" value={formData.comment}
                    onChange={handleInputChange} maxLength="1000" rows="2"
                    className="admin-textarea" />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#E5E2DC] bg-[#FAFAF8] flex justify-end gap-2 rounded-b-[14px]">
                <button type="button" onClick={resetForm} className="btn-outline text-sm py-2 px-4">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm py-2 px-5">
                  {editingPayment ? 'Update payment' : 'Add payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, tint }) => (
  <div className="admin-card p-5">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider">{label}</h3>
      <div className={`${tint} p-2 rounded-lg`}>
        <Icon size={16} />
      </div>
    </div>
    <p className="text-2xl font-semibold text-[#0C0C0C] tracking-tight font-['Outfit']">{value}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="admin-label">{label}</label>
    <input className="admin-input" {...props} />
  </div>
);

export default Payments;
