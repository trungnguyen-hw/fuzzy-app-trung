import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chairs',
    price: '',
    originalPrice: '',
    stock: '',
    status: 'Đang bán',
    image: '/assets/images/product/1.png',
    colors: 'Brown, Black',
    sizes: 'M, L',
    description: ''
  });
  const [formError, setFormError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const prods = await apiService.getProducts();
    const cats = await apiService.getCategories();

    if (prods) setProducts(prods);
    else {
      // Fallback local products
      setProducts([
        { id: 1, name: "Sheesham Wood Armchair", price: 120.00, originalPrice: 150.00, rating: 4.5, image: "/assets/images/product/1.png", category: "Chairs", stock: 15, colors: ["Brown", "Black"], sizes: ["M", "L"], status: "Đang bán" },
        { id: 2, name: "Modern Velvet Sofa", price: 350.00, originalPrice: 400.00, rating: 4.8, image: "/assets/images/product/2.png", category: "Sofas", stock: 8, colors: ["Grey", "Blue"], sizes: ["L", "XL"], status: "Đang bán" },
        { id: 3, name: "Wooden Dining Table", price: 280.00, originalPrice: 320.00, rating: 4.7, image: "/assets/images/product/3.png", category: "Tables", stock: 2, colors: ["Brown"], sizes: ["L"], status: "Đang bán" },
        { id: 7, name: "Side Table", price: 50.00, originalPrice: 80.00, rating: 4.3, image: "/assets/images/product/7.png", category: "Tables", stock: 20, colors: ["Brown", "Black"], sizes: ["S", "M"], status: "Đang bán" },
        { id: 11, name: "Lounge Chair", price: 130.00, originalPrice: 160.00, rating: 4.6, image: "/assets/images/product/11.png", category: "Chairs", stock: 0, colors: ["Blue"], sizes: ["M"], status: "Hết hàng" }
      ]);
    }

    if (cats) setCategories(cats);
    else {
      setCategories([
        { id: 1, name: "Chairs" }, { id: 2, name: "Tables" }, { id: 3, name: "Sofas" }, { id: 4, name: "Lamps" }
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
    setFormData({
      name: '',
      category: categories[0]?.name || 'Chairs',
      price: '',
      originalPrice: '',
      stock: '10',
      status: 'Đang bán',
      image: '/assets/images/product/1.png',
      colors: 'Brown, Black',
      sizes: 'M, L',
      description: ''
    });
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : '',
      stock: p.stock.toString(),
      status: p.status || 'Đang bán',
      image: p.image || '/assets/images/product/1.png',
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : 'Brown',
      sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : 'M',
      description: p.description || ''
    });
    setFormError('');
    setShowModal(true);
  };

  const handleToggleStatus = async (p) => {
    const newStatus = p.status === 'Đang bán' ? 'Ẩn' : 'Đang bán';
    await apiService.updateProduct(p.id, { ...p, status: newStatus });
    setProducts(products.map(item => item.id === p.id ? { ...item, status: newStatus } : item));
    showToast(`Đã đổi trạng thái sản phẩm sang "${newStatus}"`);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await apiService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      showToast('Đã xóa sản phẩm thành công!');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Tên sản phẩm không được để trống');
      return;
    }
    const numPrice = parseFloat(formData.price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Giá sản phẩm phải là số lớn hơn 0');
      return;
    }
    const numStock = parseInt(formData.stock);
    if (isNaN(numStock) || numStock < 0) {
      setFormError('Số lượng tồn kho phải là số lớn hơn hoặc bằng 0');
      return;
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      price: numPrice,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : numPrice * 1.2,
      stock: numStock,
      status: numStock === 0 ? 'Hết hàng' : formData.status,
      image: formData.image,
      colors: formData.colors.split(',').map(c => c.trim()),
      sizes: formData.sizes.split(',').map(s => s.trim()),
      description: formData.description
    };

    if (editingId) {
      await apiService.updateProduct(editingId, payload);
      setProducts(products.map(p => p.id === editingId ? { ...p, ...payload } : p));
      showToast('Cập nhật sản phẩm thành công!');
    } else {
      const res = await apiService.createProduct(payload);
      setProducts([res.product || { id: Date.now(), ...payload }, ...products]);
      showToast('Thêm sản phẩm mới thành công!');
    }
    setShowModal(false);
  };

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout title="Quản lý Sản phẩm">
      {toastMessage && (
        <div className="alert alert-success position-fixed top-0 end-0 m-4 shadow-lg z-3 rounded-4" style={{ zIndex: 9999 }}>
          ✅ {toastMessage}
        </div>
      )}

      {/* Action Header */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Iconsax icon="search-normal-2" /></span>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Tìm tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select bg-light border-0" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">Tất cả danh mục</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="form-select bg-light border-0" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">Tất cả trạng thái</option>
              <option value="Đang bán">Đang bán</option>
              <option value="Ẩn">Ẩn</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
          <div className="col-12 col-md-2 text-end">
            <button onClick={handleOpenAddModal} className="btn btn-primary rounded-pill w-100 py-2 fw-semibold">
              + Thêm SP
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="table-light">
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th className="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-secondary">Không tìm thấy sản phẩm phù hợp</td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt={p.name} className="rounded-3 border" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{p.name}</div>
                      <span className="text-secondary" style={{ fontSize: '12px' }}>
                        Color: {Array.isArray(p.colors) ? p.colors.join(', ') : p.colors} | Size: {Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}
                      </span>
                    </td>
                    <td><span className="badge bg-light text-dark border">{p.category}</span></td>
                    <td>
                      <span className="fw-bold text-primary">${p.price.toFixed(2)}</span>
                      {p.originalPrice && <div className="text-muted text-decoration-line-through" style={{ fontSize: '12px' }}>${p.originalPrice.toFixed(2)}</div>}
                    </td>
                    <td>
                      <span className={`fw-semibold ${p.stock === 0 ? 'text-danger' : p.stock < 5 ? 'text-warning' : 'text-dark'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${p.status === 'Đang bán' ? 'bg-success-subtle text-success' : p.status === 'Hết hàng' ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'} px-3 py-2 rounded-pill`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button onClick={() => handleToggleStatus(p)} className="btn btn-sm btn-outline-secondary me-2 rounded-circle" title="Ẩn/Hiện">
                        <Iconsax icon={p.status === 'Ẩn' ? "eye" : "eye-slash"} />
                      </button>
                      <button onClick={() => handleOpenEditModal(p)} className="btn btn-sm btn-outline-primary me-2 rounded-circle" title="Sửa">
                        <Iconsax icon="edit" />
                      </button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="btn btn-sm btn-outline-danger rounded-circle" title="Xóa">
                        <Iconsax icon="trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{editingId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitForm}>
                <div className="modal-body">
                  {formError && <div className="alert alert-danger p-2 mb-3">{formError}</div>}
                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="form-label fw-semibold">Tên sản phẩm *</label>
                      <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold">Danh mục</label>
                      <select className="form-select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Giá bán ($) *</label>
                      <input type="number" step="0.01" className="form-control" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Giá gốc ($)</label>
                      <input type="number" step="0.01" className="form-control" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Tồn kho *</label>
                      <input type="number" className="form-control" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Trạng thái</label>
                      <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                        <option value="Đang bán">Đang bán</option>
                        <option value="Ẩn">Ẩn</option>
                        <option value="Hết hàng">Hết hàng</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Màu sắc (phân cách dấu phẩy)</label>
                      <input type="text" className="form-control" value={formData.colors} onChange={(e) => setFormData({...formData, colors: e.target.value})} />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="form-label fw-semibold">Kích thước (phân cách dấu phẩy)</label>
                      <input type="text" className="form-control" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Đường dẫn ảnh (URL / Asset path)</label>
                      <input type="text" className="form-control" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4">Lưu thông tin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
