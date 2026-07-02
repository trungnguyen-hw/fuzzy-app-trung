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
    showToast(`Đổi trạng thái sản phẩm sang "${newStatus}"`);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đang bán': return 'admin-badge-success';
      case 'Hết hàng': return 'admin-badge-danger';
      case 'Ẩn': return 'admin-badge-secondary';
      default: return 'admin-badge-secondary';
    }
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
        <div className="admin-toast">
          ✅ {toastMessage}
        </div>
      )}

      {/* Toolbar / Actions */}
      <div className="admin-toolbar mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div className="admin-search-wrapper">
              <span className="admin-search-icon"><Iconsax icon="search-normal-2" /></span>
              <input 
                type="text" 
                className="admin-form-control" 
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select className="admin-form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <select className="admin-form-control" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Đang bán">Active (Đang bán)</option>
              <option value="Ẩn">Hidden (Ẩn)</option>
              <option value="Hết hàng">Out of stock (Hết hàng)</option>
            </select>
          </div>
          <div className="col-12 col-md-2 text-end">
            <button onClick={handleOpenAddModal} className="admin-btn admin-btn-primary w-100 py-2">
              + Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-secondary">No products found matching criteria</td>
                </tr>
              ) : (
                filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.image} alt={p.name} className="admin-product-thumbnail" />
                    </td>
                    <td>
                      <div className="admin-product-title">{p.name}</div>
                      <span className="admin-product-meta">
                        Color: {Array.isArray(p.colors) ? p.colors.join(', ') : p.colors} | Size: {Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-secondary">{p.category}</span>
                    </td>
                    <td>
                      <span className="admin-price-current">${p.price.toFixed(2)}</span>
                      {p.originalPrice && <div className="admin-price-original">${p.originalPrice.toFixed(2)}</div>}
                    </td>
                    <td>
                      <span className={`fw-semibold ${p.stock === 0 ? 'text-danger' : p.stock < 5 ? 'text-warning' : 'text-dark'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${getStatusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="admin-actions">
                        <button onClick={() => handleToggleStatus(p)} className="admin-btn admin-btn-outline admin-btn-sm" title={p.status === 'Ẩn' ? "Show" : "Hide"}>
                          <Iconsax icon={p.status === 'Ẩn' ? "eye" : "eye-slash"} />
                        </button>
                        <button onClick={() => handleOpenEditModal(p)} className="admin-btn admin-btn-primary admin-btn-sm ms-2" title="Edit">
                          <Iconsax icon="edit" />
                        </button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="admin-btn admin-btn-danger admin-btn-sm ms-2" title="Delete">
                          <Iconsax icon="trash" />
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

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{editingId ? 'Edit Product Details' : 'Add New Product'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitForm}>
                <div className="modal-body p-4">
                  {formError && <div className="alert alert-danger p-2 mb-3">{formError}</div>}
                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="admin-form-label">Product Title *</label>
                      <input type="text" className="admin-form-control w-100" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="admin-form-label">Category</label>
                      <select className="admin-form-control w-100" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Selling Price ($) *</label>
                      <input type="number" step="0.01" className="admin-form-control w-100" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Original Price ($)</label>
                      <input type="number" step="0.01" className="admin-form-control w-100" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Quantity Stock *</label>
                      <input type="number" className="admin-form-control w-100" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Sale Status</label>
                      <select className="admin-form-control w-100" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                        <option value="Đang bán">Active (Đang bán)</option>
                        <option value="Ẩn">Hidden (Ẩn)</option>
                        <option value="Hết hàng">Out of stock (Hết hàng)</option>
                      </select>
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Colors (comma separated)</label>
                      <input type="text" className="admin-form-control w-100" value={formData.colors} onChange={(e) => setFormData({...formData, colors: e.target.value})} />
                    </div>
                    <div className="col-6 col-md-4">
                      <label className="admin-form-label">Sizes (comma separated)</label>
                      <input type="text" className="admin-form-control w-100" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} />
                    </div>
                    <div className="col-12">
                      <label className="admin-form-label">Image Path or URL</label>
                      <input type="text" className="admin-form-control w-100" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary">Save Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
