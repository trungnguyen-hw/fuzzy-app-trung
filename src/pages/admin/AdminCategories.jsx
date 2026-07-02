import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '/assets/images/product/3.png', description: '' });
  const [formError, setFormError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const cats = await apiService.getCategories();
    if (cats) setCategories(cats);
    else {
      setCategories([
        { id: 1, name: "Chairs", items: 120, image: "/assets/images/product/3.png", description: "All ergonomic & wooden chairs" },
        { id: 2, name: "Tables", items: 120, image: "/assets/images/product/21.png", description: "Dining & coffee tables" },
        { id: 3, name: "Sofas", items: 120, image: "/assets/images/product/11.png", description: "Comfortable velvet sofas" },
        { id: 4, name: "Lamps", items: 80, image: "/assets/images/product/24.png", description: "Hanging & bedroom lights" }
      ]);
    }
    setLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', image: '/assets/images/product/3.png', description: '' });
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, image: cat.image, description: cat.description || '' });
    setFormError('');
    setShowModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      await apiService.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      showToast('Đã xóa danh mục thành công!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Tên danh mục không được để trống');
      return;
    }

    if (editingId) {
      await apiService.updateCategory(editingId, formData);
      setCategories(categories.map(c => c.id === editingId ? { ...c, ...formData } : c));
      showToast('Cập nhật danh mục thành công!');
    } else {
      const res = await apiService.createCategory(formData);
      setCategories([...categories, res.category || { id: Date.now(), ...formData, items: 0 }]);
      showToast('Thêm danh mục mới thành công!');
    }
    setShowModal(false);
  };

  return (
    <AdminLayout title="Quản lý Danh mục">
      {toastMessage && (
        <div className="admin-toast">
          ✅ {toastMessage}
        </div>
      )}

      <div className="admin-toolbar-flex mb-4">
        <h2 className="admin-page-subtitle">Product Categories</h2>
        <button onClick={handleOpenAddModal} className="admin-btn admin-btn-primary px-4 py-2">
          + Add Category
        </button>
      </div>

      <div className="row g-4">
        {categories.map(cat => (
          <div key={cat.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="admin-card h-100 d-flex flex-column justify-content-between">
              <div className="p-4 flex-grow-1">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img src={cat.image} alt={cat.name} className="admin-category-thumbnail" />
                  <div>
                    <h3 className="admin-category-title m-0">{cat.name}</h3>
                    <span className="admin-badge admin-badge-primary mt-1 d-inline-block">{cat.items || 0} products</span>
                  </div>
                </div>
                <p className="admin-category-desc">
                  {cat.description || 'No description provided for this category.'}
                </p>
              </div>
              <div className="p-3 bg-light border-top rounded-bottom-4">
                <div className="admin-actions justify-content-end">
                  <button onClick={() => handleOpenEditModal(cat)} className="admin-btn admin-btn-outline admin-btn-sm" title="Edit">
                    <Iconsax icon="edit" />
                  </button>
                  <button onClick={() => handleDeleteCategory(cat.id)} className="admin-btn admin-btn-danger admin-btn-sm ms-2" title="Delete">
                    <Iconsax icon="trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{editingId ? 'Edit Category Details' : 'Add New Category'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  {formError && <div className="alert alert-danger p-2 mb-3">{formError}</div>}
                  <div className="mb-3">
                    <label className="admin-form-label">Category Name *</label>
                    <input type="text" className="admin-form-control w-100" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="admin-form-label">Image Path / Asset URL</label>
                    <input type="text" className="admin-form-control w-100" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="admin-form-label">Description</label>
                    <textarea className="admin-form-control w-100" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary">Save Category</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
