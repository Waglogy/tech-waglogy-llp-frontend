import { useState, useEffect } from 'react';
import { FiMail, FiCalendar, FiTrash2, FiEye, FiX, FiAlertCircle, FiPhone, FiBriefcase } from 'react-icons/fi';
import { getAllContacts, deleteContact, updateContactStatus } from '../../services/contactService';

const STATUS_OPTIONS = ['new', 'in-progress', 'contacted', 'qualified', 'closed'];

const statusPill = (status) => {
  switch (status) {
    case 'new': return 'admin-pill-green';
    case 'in-progress': return 'admin-pill-amber';
    case 'contacted': return 'admin-pill-blue';
    case 'qualified': return 'admin-pill-purple';
    case 'closed': return 'admin-pill-gray';
    default: return 'admin-pill-gray';
  }
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllContacts();
      setContacts(response.data || []);
    } catch (err) {
      setError('Failed to load contacts. Please try again.');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contact? This action cannot be undone.')) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c._id !== id));
      if (selectedContact?._id === id) setSelectedContact(null);
    } catch (err) {
      alert('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactStatus(id, newStatus);
      setContacts(contacts.map((c) => (c._id === id ? { ...c, status: newStatus } : c)));
      if (selectedContact?._id === id) setSelectedContact({ ...selectedContact, status: newStatus });
    } catch (err) {
      alert('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="admin-spinner mx-auto" />
          <p className="mt-4 text-sm text-[#6E6B67]">Loading contacts…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-card p-10 text-center">
        <FiAlertCircle size={32} className="mx-auto text-[#B91C1C] mb-3" />
        <p className="text-[#0C0C0C] font-medium mb-1">Couldn't load contacts</p>
        <p className="text-sm text-[#6E6B67] mb-5">{error}</p>
        <button onClick={fetchContacts} className="btn-primary text-sm py-2.5 px-5">Try again</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="section-label">Inbox</span>
        <h1 className="admin-page-title mt-3">Contacts</h1>
        <p className="admin-page-subtitle">All contact form submissions from the website.</p>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="admin-th">Name</th>
                <th className="admin-th">Email</th>
                <th className="admin-th">Organization</th>
                <th className="admin-th">Date</th>
                <th className="admin-th">Status</th>
                <th className="admin-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-sm text-[#6E6B67]">
                    No contacts yet.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="admin-row">
                    <td className="admin-td font-medium text-[#0C0C0C]">{contact.fullName}</td>
                    <td className="admin-td text-[#6E6B67]">
                      <span className="inline-flex items-center gap-2">
                        <FiMail size={13} className="text-[#9CA3AF]" />
                        {contact.email}
                      </span>
                    </td>
                    <td className="admin-td text-[#6E6B67]">{contact.organizationName || '—'}</td>
                    <td className="admin-td text-[#6E6B67]">
                      <span className="inline-flex items-center gap-2">
                        <FiCalendar size={13} className="text-[#9CA3AF]" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </td>
                    <td className="admin-td">
                      <span className={`admin-pill ${statusPill(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="admin-td">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="admin-icon-btn"
                          title="View"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact._id)}
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

      {/* Detail modal */}
      {selectedContact && (
        <div className="admin-modal-overlay" onClick={() => setSelectedContact(null)}>
          <div
            className="admin-modal-panel max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#E5E2DC] flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#0C0C0C] font-['Outfit'] tracking-tight">
                  Contact Details
                </h2>
                <p className="text-xs text-[#6E6B67] mt-0.5">
                  Submitted {formatDate(selectedContact.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="admin-icon-btn"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" value={selectedContact.fullName} />
                <Field label="Email" value={selectedContact.email} icon={FiMail} />
                <Field label="Phone" value={selectedContact.phone} icon={FiPhone} />
                <Field label="Organization" value={selectedContact.organizationName || '—'} icon={FiBriefcase} />
                <Field label="Budget Range" value={selectedContact.budgetRange || '—'} />
                <div>
                  <label className="admin-label">Status</label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                    className="admin-select"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Project Details</label>
                <div className="p-4 rounded-lg bg-[#FAFAF8] border border-[#E5E2DC] text-sm text-[#3D3A36] whitespace-pre-wrap">
                  {selectedContact.projectDetails}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#E5E2DC] bg-[#FAFAF8] flex justify-end gap-2 rounded-b-[14px]">
              <button
                onClick={() => handleDelete(selectedContact._id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedContact(null)}
                className="btn-outline text-sm py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, icon: Icon }) => (
  <div>
    <label className="admin-label">{label}</label>
    <p className="text-sm text-[#0C0C0C] inline-flex items-center gap-2">
      {Icon && <Icon size={14} className="text-[#9CA3AF]" />}
      {value}
    </p>
  </div>
);

export default Contacts;
