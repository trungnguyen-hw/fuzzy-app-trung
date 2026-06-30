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
        <div className="alert alert-success position-fixed top-0 end-0 m-4 shadow-lg z-3 rounded-4" style={{ zIndex: 9999 }}>
          ✅ {toastMessage}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0 text-dark">Danh sách danh mục sản phẩm</h5>
        <button onClick={handleOpenAddModal} className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
          + Thêm Danh Mục
        </button>
      </div>

      <div className="row g-4">
        {categories.map(cat => (
          <div key={cat.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 position-relative">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img src={cat.image} alt={cat.name} className="rounded-3 border p-1" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div>
                  <h5 className="fw-bold m-0 text-dark">{cat.name}</h5>
                  <span className="badge bg-primary-subtle text-primary mt-1">{cat.items || 0} sản phẩm</span>
                </div>
              </div>
              <p className="text-secondary" style={{ fontSize: '13px', lineHeight: '1.4' }}>
                {cat.description || 'Không có mô tả cho danh mục này.'}
              </p>
              <div className="d-flex justify-content-end gap-2 mt-auto pt-3 border-top">
                <button onClick={() => handleOpenEditModal(cat)} className="btn btn-sm btn-outline-primary rounded-circle" title="Sửa">
                  <Iconsax icon="edit" />
                </button>
                <button onClick={() => handleDeleteCategory(cat.id)} className="btn btn-sm btn-outline-danger rounded-circle" title="Xóa">
                  <Iconsax icon="trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{editingId ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger p-2 mb-3">{formError}</div>}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Tên danh mục *</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Đường dẫn ảnh / Asset path</label>
                    <input type="text" className="form-control" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Mô tả</label>
                    <textarea className="form-control" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4">Lưu danh mục</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
