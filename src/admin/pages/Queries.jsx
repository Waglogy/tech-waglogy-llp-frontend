import { useState, useEffect } from 'react';
import { FiMessageSquare, FiCalendar, FiTrash2, FiEye, FiX, FiAlertCircle } from 'react-icons/fi';
import { getAllQueries, deleteQuery, updateQueryStatus } from '../../services/queryService';

const STATUS_OPTIONS = ['new', 'read', 'responded', 'closed'];

const statusPill = (status) => {
  switch (status) {
    case 'new': return 'admin-pill-green';
    case 'read': return 'admin-pill-blue';
    case 'responded': return 'admin-pill-amber';
    case 'closed': return 'admin-pill-gray';
    default: return 'admin-pill-gray';
  }
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => { fetchQueries(); }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllQueries();
      setQueries(response.data || []);
    } catch (err) {
      setError('Failed to load queries. Please try again.');
      console.error('Error fetching queries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this query?')) return;
    try {
      await deleteQuery(id);
      setQueries(queries.filter((q) => q._id !== id));
      if (selectedQuery?._id === id) setSelectedQuery(null);
    } catch (err) {
      alert('Failed to delete query. Please try again.');
      console.error('Error deleting query:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateQueryStatus(id, newStatus);
      setQueries(queries.map((q) => (q._id === id ? { ...q, status: newStatus } : q)));
      if (selectedQuery?._id === id) setSelectedQuery({ ...selectedQuery, status: newStatus });
    } catch (err) {
      alert('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    }
  };

  const filteredQueries =
    filterStatus === 'All' ? queries : queries.filter((q) => q.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Loading queries…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card p-10 text-center">
        <FiAlertCircle size={32} className="mx-auto text-[#B91C1C] mb-3" />
        <p className="text-[#0C0C0C] font-medium mb-1">Couldn't load queries</p>
        <p className="text-sm text-[#6E6B67] mb-5">{error}</p>
        <button onClick={fetchQueries} className="btn-primary text-sm py-2.5 px-5">Try again</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Inbox</span>
          <h1 className="admin-page-title mt-3">Queries</h1>
          <p className="admin-page-subtitle">Messages and inquiries from visitors.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-[#6E6B67]">Filter</label>
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
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="admin-th">Message</th>
                <th className="admin-th">Date</th>
                <th className="admin-th">Status</th>
                <th className="admin-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center text-sm text-[#6E6B67]">
                    No queries match this filter.
                  </td>
                </tr>
              ) : (
                filteredQueries.map((query) => (
                  <tr key={query._id} className="admin-row">
                    <td className="admin-td">
                      <div className="flex items-start gap-2">
                        <FiMessageSquare size={14} className="text-[#9CA3AF] mt-0.5 shrink-0" />
                        <div className="truncate max-w-xl text-[#3D3A36]" title={query.message}>
                          {query.message.length > 110
                            ? query.message.substring(0, 110) + '…'
                            : query.message}
                        </div>
                      </div>
                    </td>
                    <td className="admin-td text-[#6E6B67]">
                      <span className="inline-flex items-center gap-2">
                        <FiCalendar size={13} className="text-[#9CA3AF]" />
                        {formatDate(query.createdAt)}
                      </span>
                    </td>
                    <td className="admin-td">
                      <span className={`admin-pill ${statusPill(query.status)}`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="admin-td">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setSelectedQuery(query)}
                          className="admin-icon-btn"
                          title="View"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(query._id)}
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

      {selectedQuery && (
        <div className="admin-modal-overlay" onClick={() => setSelectedQuery(null)}>
          <div className="admin-modal-panel max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#E5E2DC] flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0C0C0C] font-['Outfit'] tracking-tight">
                  Query Details
                </h2>
                <p className="text-xs text-[#6E6B67] mt-0.5">
                  Submitted {formatDate(selectedQuery.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedQuery(null)}
                className="admin-icon-btn"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="admin-label">Message</label>
                <div className="p-4 rounded-lg bg-[#FAFAF8] border border-[#E5E2DC] text-sm text-[#3D3A36] whitespace-pre-wrap">
                  {selectedQuery.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="admin-label">Date Submitted</label>
                  <p className="text-sm text-[#0C0C0C]">{formatDate(selectedQuery.createdAt)}</p>
                </div>
                <div>
                  <label className="admin-label">Status</label>
                  <select
                    value={selectedQuery.status}
                    onChange={(e) => handleStatusChange(selectedQuery._id, e.target.value)}
                    className="admin-select"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#E5E2DC] bg-[#FAFAF8] flex justify-end gap-2 rounded-b-[14px]">
              <button
                onClick={() => handleDelete(selectedQuery._id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors"
              >
                Delete
              </button>
              <button onClick={() => setSelectedQuery(null)} className="btn-outline text-sm py-2 px-4">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queries;
