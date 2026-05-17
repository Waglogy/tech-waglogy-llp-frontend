import React, { useState, useEffect } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch, FaTimes, FaSpinner, FaClock,
} from 'react-icons/fa';
import { FiFileText, FiCheckCircle, FiEdit3, FiBarChart2, FiAlertCircle } from 'react-icons/fi';
import {
  getAllBlogs, createBlog, updateBlog, deleteBlog, togglePublishStatus, getBlogStats,
} from '../../services/blogService';
import TipTapEditor from '../../components/TipTapEditor';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const emptyForm = {
  title: '', content: '', excerpt: '', contentType: 'html', author: '',
  image: '', date: new Date().toISOString().split('T')[0], tags: '', isPublished: true,
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchStats();
  }, [currentPage, searchTerm, filterStatus]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit: 10, sort: '-date' };
      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== 'all') params.isPublished = filterStatus === 'published';
      const response = await getAllBlogs(params);
      setBlogs(response.data);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getBlogStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        contentType: blog.contentType || 'html',
        author: blog.author || '',
        image: blog.image || '',
        date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        isPublished: blog.isPublished,
      });
    } else {
      setEditingBlog(null);
      setFormData(emptyForm);
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        contentType: formData.contentType,
        author: formData.author,
        image: formData.image,
        date: formData.date ? new Date(formData.date).toISOString() : undefined,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        isPublished: formData.isPublished,
      };
      if (formData.excerpt.trim()) blogData.excerpt = formData.excerpt;

      if (editingBlog) {
        await updateBlog(editingBlog._id, blogData);
      } else {
        await createBlog(blogData);
      }

      handleCloseModal();
      fetchBlogs();
      fetchStats();
    } catch (err) {
      setError(err.message || 'Failed to save blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog? This action cannot be undone.')) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
      fetchStats();
    } catch (err) {
      alert('Failed to delete blog: ' + err.message);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await togglePublishStatus(id);
      fetchBlogs();
      fetchStats();
    } catch (err) {
      alert('Failed to toggle publish status: ' + err.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="section-label">Content</span>
          <h1 className="admin-page-title mt-3">Blog Management</h1>
          <p className="admin-page-subtitle">Create, edit, and manage your blog posts.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary text-sm py-2.5 px-5">
          <FaPlus size={13} /> Create blog
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total blogs" value={stats.overview.totalBlogs} icon={FiFileText}
            tint="bg-[#F5F4F0] text-[#3D3A36]" />
          <StatCard label="Published" value={stats.overview.publishedBlogs} icon={FiCheckCircle}
            tint="bg-[#ECFDF5] text-[#047857]" />
          <StatCard label="Drafts" value={stats.overview.draftBlogs} icon={FiEdit3}
            tint="bg-[#FFFBEB] text-[#B45309]" />
          <StatCard label="Total views" value={stats.overview.totalViews.toLocaleString()} icon={FiBarChart2}
            tint="bg-[#EFF6FF] text-[#1D4ED8]" />
        </div>
      )}

      {/* Search + filter */}
      <div className="admin-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 md:max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={13} />
            <input
              type="text"
              placeholder="Search blogs…"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="admin-input pl-9"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="admin-select w-auto"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="admin-spinner" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <FiFileText size={32} className="mx-auto text-[#C9C4BB] mb-3" />
            <p className="text-sm text-[#6E6B67] mb-4">No blogs found.</p>
            <button onClick={() => handleOpenModal()} className="btn-outline text-sm py-2 px-4">
              Create your first blog post
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="admin-th">Title</th>
                    <th className="admin-th">Author</th>
                    <th className="admin-th">Date</th>
                    <th className="admin-th">Views</th>
                    <th className="admin-th">Status</th>
                    <th className="admin-th text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="admin-row">
                      <td className="admin-td">
                        <div className="flex items-center gap-3">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-12 h-12 rounded-lg object-cover border border-[#E5E2DC] shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[#F5F4F0] flex items-center justify-center text-[#9CA3AF] shrink-0">
                              <FiFileText size={16} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-medium text-[#0C0C0C] truncate">{blog.title}</div>
                            <div className="text-xs text-[#6E6B67] truncate max-w-md">
                              {blog.excerpt ? blog.excerpt.substring(0, 70) + '…' : 'No excerpt'}
                            </div>
                            {blog.readTime && (
                              <div className="text-[11px] text-[#1D4ED8] flex items-center gap-1 mt-1">
                                <FaClock size={10} />
                                {blog.readTime} min read
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="admin-td text-[#3D3A36]">{blog.author || '—'}</td>
                      <td className="admin-td text-[#6E6B67]">{formatDate(blog.date)}</td>
                      <td className="admin-td text-[#3D3A36]">{blog.views}</td>
                      <td className="admin-td">
                        <span className={`admin-pill ${blog.isPublished ? 'admin-pill-green' : 'admin-pill-amber'}`}>
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="admin-td">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => handleTogglePublish(blog._id)}
                            className="admin-icon-btn"
                            title={blog.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {blog.isPublished ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                          </button>
                          <button
                            onClick={() => handleOpenModal(blog)}
                            className="admin-icon-btn"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="admin-icon-btn admin-icon-btn-danger"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-[#E5E2DC] bg-[#FAFAF8] flex items-center justify-between">
                <div className="text-xs text-[#6E6B67]">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn-outline text-xs py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-outline text-xs py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div className="admin-modal-panel max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#E5E2DC] flex items-start justify-between">
              <h2 className="text-xl font-semibold text-[#0C0C0C] font-['Outfit'] tracking-tight">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <button onClick={handleCloseModal} className="admin-icon-btn" aria-label="Close">
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-sm text-[#B91C1C] flex items-start gap-2">
                  <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="admin-label">Title <span className="text-[#B91C1C]">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    maxLength="200"
                    className="admin-input"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="admin-label">Content Type</label>
                  <select
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="html">HTML (Rich Text)</option>
                    <option value="markdown">Markdown</option>
                    <option value="text">Plain Text</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">Content <span className="text-[#B91C1C]">*</span></label>
                  <TipTapEditor
                    content={formData.content}
                    onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                    placeholder="Write your blog content…"
                  />
                </div>

                <div>
                  <label className="admin-label">Excerpt (Optional)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows="3"
                    maxLength="500"
                    className="admin-textarea"
                    placeholder="Brief summary (auto-generated from content if blank)"
                  />
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    {formData.excerpt.length}/500 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      maxLength="100"
                      className="admin-input"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="admin-label">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-3 w-full h-48 object-cover rounded-lg border border-[#E5E2DC]"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  )}
                </div>

                <div>
                  <label className="admin-label">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="admin-input"
                    placeholder="nodejs, javascript, react"
                  />
                </div>

                <label className="flex items-center gap-2 p-3 rounded-lg border border-[#E5E2DC] bg-[#FAFAF8] cursor-pointer">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-[#2563EB]"
                  />
                  <span className="text-sm font-medium text-[#3D3A36]">Publish immediately</span>
                </label>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-outline text-sm py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary text-sm py-2 px-5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting && <FaSpinner className="animate-spin" size={12} />}
                    {submitting ? 'Saving…' : editingBlog ? 'Update blog' : 'Create blog'}
                  </button>
                </div>
              </form>
            </div>
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
        <Icon size={14} />
      </div>
    </div>
    <p className="text-2xl font-semibold text-[#0C0C0C] tracking-tight font-['Outfit']">{value}</p>
  </div>
);

export default AdminBlogs;
