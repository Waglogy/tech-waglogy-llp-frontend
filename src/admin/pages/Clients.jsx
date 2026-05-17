import { useState, useEffect } from 'react';
import {
  FiBriefcase, FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiAlertCircle,
} from 'react-icons/fi';
import {
  getAllClients, createClient, updateClient, deleteClient,
  getClientStats, searchClients,
} from '../../services/clientService';

const STATUS_OPTIONS = ['active', 'inactive', 'pending', 'completed', 'on-hold', 'cancelled'];

const statusPill = (status) => {
  switch (status) {
    case 'active': return 'admin-pill-green';
    case 'inactive': return 'admin-pill-gray';
    case 'pending': return 'admin-pill-amber';
    case 'completed': return 'admin-pill-blue';
    case 'on-hold': return 'admin-pill-orange';
    case 'cancelled': return 'admin-pill-red';
    default: return 'admin-pill-gray';
  }
};

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const emptyForm = {
  company: '', contactPerson: '', email: '', phone: '', service: '',
  startDate: '', endDate: '', revenue: '', status: 'active', address: '', notes: '',
};

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchClients();
  }, [filterStatus]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = filterStatus !== 'All' ? { status: filterStatus } : {};
      const response = await getAllClients(params);
      setClients(response.data || []);
    } catch (err) {
      setError('Failed to load clients. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) { fetchClients(); return; }
    try {
      setLoading(true);
      const response = await searchClients(searchQuery);
      setClients(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        const response = await updateClient(editingClient._id, formData);
        setClients(clients.map((c) => (c._id === editingClient._id ? response.data : c)));
      } else {
        const response = await createClient(formData);
        setClients([response.data, ...clients]);
      }
      resetForm();
    } catch (err) {
      alert(err.message || 'Failed to save client. Please try again.');
      console.error(err);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      company: client.company,
      contactPerson: client.contactPerson,
      email: client.email || '',
      phone: client.phone || '',
      service: client.service,
      startDate: client.startDate ? new Date(client.startDate).toISOString().split('T')[0] : '',
      endDate: client.endDate ? new Date(client.endDate).toISOString().split('T')[0] : '',
      revenue: client.revenue,
      status: client.status,
      address: client.address || '',
      notes: client.notes || '',
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this client?')) return;
    try {
      await deleteClient(id);
      setClients(clients.filter((c) => c._id !== id));
    } catch (err) {
      alert('Failed to delete client. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingClient(null);
    setShowAddModal(false);
  };

  const localStats = {
    activeRevenue: clients.filter((c) => c.status === 'active').reduce((s, c) => s + c.revenue, 0),
    completedRevenue: clients.filter((c) => c.status === 'completed').reduce((s, c) => s + c.revenue, 0),
    totalRevenue: clients.reduce((s, c) => s + c.revenue, 0),
  };

  if (loading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Loading clients…</p>
        </div>
      </div>
    );
  }

  if (error && clients.length === 0) {
    return (
      <div className="admin-card p-10 text-center">
        <FiAlertCircle size={32} className="mx-auto text-[#B91C1C] mb-3" />
        <p className="text-[#0C0C0C] font-medium mb-1">Couldn't load clients</p>
        <p className="text-sm text-[#6E6B67] mb-5">{error}</p>
        <button onClick={fetchClients} className="btn-primary text-sm py-2.5 px-5">Try again</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Portfolio</span>
          <h1 className="admin-page-title mt-3">Clients</h1>
          <p className="admin-page-subtitle">Manage your client portfolio and ongoing engagements.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm py-2.5 px-5">
          <FiPlus size={16} /> Add client
        </button>
      </div>

      {/* Revenue stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Active revenue" value={formatCurrency(localStats.activeRevenue)} tint="bg-[#ECFDF5] text-[#047857]" />
        <StatCard label="Completed revenue" value={formatCurrency(localStats.completedRevenue)} tint="bg-[#EFF6FF] text-[#1D4ED8]" />
        <StatCard label="Total revenue" value={formatCurrency(localStats.totalRevenue)} tint="bg-[#F5F3FF] text-[#6D28D9]" />
      </div>

      {/* Search + filter */}
      <div className="admin-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by company, contact, service, or email…"
                className="admin-input pl-10"
              />
            </div>
            <button onClick={handleSearch} className="btn-primary text-sm py-2.5 px-5">Search</button>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); fetchClients(); }}
                className="btn-outline text-sm py-2.5 px-4"
              >
                Clear
              </button>
            )}
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="admin-select w-auto"
          >
            <option>All</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="admin-th">Company</th>
                <th className="admin-th">Contact</th>
                <th className="admin-th">Service</th>
                <th className="admin-th">Start</th>
                <th className="admin-th">Revenue</th>
                <th className="admin-th">Status</th>
                <th className="admin-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-sm text-[#6E6B67]">
                    No clients found.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client._id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#F5F4F0] text-[#6E6B67] flex items-center justify-center shrink-0">
                          <FiBriefcase size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#0C0C0C] truncate">{client.company}</div>
                          {client.email && (
                            <div className="text-xs text-[#6E6B67] truncate">{client.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="admin-td">
                      <div className="font-medium text-[#0C0C0C]">{client.contactPerson}</div>
                      {client.phone && <div className="text-xs text-[#6E6B67]">{client.phone}</div>}
                    </td>
                    <td className="admin-td text-[#6E6B67]">
                      <div className="truncate max-w-xs" title={client.service}>
                        {client.service}
                      </div>
                    </td>
                    <td className="admin-td text-[#6E6B67]">{formatDate(client.startDate)}</td>
                    <td className="admin-td font-medium text-[#0C0C0C]">
                      {formatCurrency(client.revenue)}
                    </td>
                    <td className="admin-td">
                      <span className={`admin-pill ${statusPill(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="admin-td">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => handleEdit(client)} className="admin-icon-btn" title="Edit">
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(client._id)}
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

      {/* Add/Edit modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={resetForm}>
          <div className="admin-modal-panel max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#E5E2DC] flex items-start justify-between">
              <h2 className="text-xl font-semibold text-[#0C0C0C] font-['Outfit'] tracking-tight">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <button onClick={resetForm} className="admin-icon-btn" aria-label="Close">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Company Name *" name="company" value={formData.company}
                  onChange={handleInputChange} maxLength="200" required />
                <Input label="Contact Person *" name="contactPerson" value={formData.contactPerson}
                  onChange={handleInputChange} maxLength="100" required />
                <Input label="Email" name="email" type="email" value={formData.email}
                  onChange={handleInputChange} />
                <Input label="Phone" name="phone" type="tel" value={formData.phone}
                  onChange={handleInputChange} maxLength="20" />
                <div className="md:col-span-2">
                  <Input label="Service *" name="service" value={formData.service}
                    onChange={handleInputChange} maxLength="200"
                    placeholder="e.g., Web Development — E-commerce Platform" required />
                </div>
                <Input label="Start Date *" name="startDate" type="date" value={formData.startDate}
                  onChange={handleInputChange} required />
                <Input label="End Date" name="endDate" type="date" value={formData.endDate}
                  onChange={handleInputChange} />
                <Input label="Revenue *" name="revenue" type="number" min="0" step="0.01"
                  value={formData.revenue} onChange={handleInputChange} placeholder="0.00" required />
                <div>
                  <label className="admin-label">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}
                    className="admin-select" required>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Input label="Address" name="address" value={formData.address}
                    onChange={handleInputChange} maxLength="500" />
                </div>
                <div className="md:col-span-2">
                  <label className="admin-label">Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                    maxLength="1000" rows="3" className="admin-textarea" />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#E5E2DC] bg-[#FAFAF8] flex justify-end gap-2 rounded-b-[14px]">
                <button type="button" onClick={resetForm} className="btn-outline text-sm py-2 px-4">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm py-2 px-5">
                  {editingClient ? 'Update client' : 'Add client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, tint }) => (
  <div className="admin-card p-5">
    <div className="flex items-start justify-between mb-2">
      <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-wider">{label}</h3>
      <div className={`${tint} px-1.5 py-0.5 rounded text-[10px] font-semibold`}>INR</div>
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

export default Clients;
