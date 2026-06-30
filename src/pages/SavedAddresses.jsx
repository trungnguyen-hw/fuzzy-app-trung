import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function SavedAddresses() {
  const navigate = useNavigate();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    details: '',
    type: 'Home',
    isDefault: false
  });
  const [error, setError] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      phone: '',
      details: '',
      type: 'Home',
      isDefault: false
    });
    setError('');
    setShowModal(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingId(addr.id);
    setFormData({
      name: addr.name,
      phone: addr.phone,
      details: addr.details,
      type: addr.type,
      isDefault: addr.isDefault
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.details.trim()) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      deleteAddress(id);
    }
  };

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <button onClick={() => navigate(-1)} className="border-0 bg-transparent p-0">
              <Iconsax className="back-btn" icon="arrow-left" />
            </button>
            <h3>Sổ địa chỉ</h3>
            <button onClick={handleOpenAdd} className="btn btn-sm btn-primary rounded-pill px-3 border-0" style={{ fontSize: '12px' }}>
              + Thêm
            </button>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* addresses section */}
      <section className="section-b-space mt-3">
        <div className="custom-container">
          {addresses.length === 0 ? (
            <div className="text-center py-5">
              <img src="/assets/images/gif/success.gif" alt="empty address" style={{ maxWidth: '100px', filter: 'grayscale(1)' }} className="mb-3" />
              <h3>Chưa có địa chỉ nào</h3>
              <p className="light-text">Thêm địa chỉ giao hàng để tiến hành thanh toán nhanh chóng hơn.</p>
              <button onClick={handleOpenAdd} className="btn theme-btn mt-3 border-0">Thêm địa chỉ ngay</button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {addresses.map((addr) => (
                <div key={addr.id} className={`card border-0 shadow-sm rounded-4 p-3 ${addr.isDefault ? 'border-start border-primary border-4' : ''}`}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge ${addr.type === 'Home' ? 'bg-primary' : addr.type === 'Office' ? 'bg-success' : 'bg-secondary'} px-2 py-1`}>
                        {addr.type}
                      </span>
                      {addr.isDefault && <span className="badge bg-warning-subtle text-warning px-2 py-1">Mặc định</span>}
                    </div>
                    <div className="d-flex gap-2">
                      <button onClick={() => handleOpenEdit(addr)} className="btn btn-sm btn-light border-0 p-1 rounded-circle" title="Sửa">
                        <Iconsax icon="edit-2" style={{ width: '16px', height: '16px' }} />
                      </button>
                      <button onClick={() => handleDelete(addr.id)} className="btn btn-sm btn-light text-danger border-0 p-1 rounded-circle" title="Xóa">
                        <Iconsax icon="trash" style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>
                  </div>

                  <h5 className="fw-bold text-dark mb-1">{addr.name}</h5>
                  <div className="light-text mb-2" style={{ fontSize: '13px' }}>SĐT: {addr.phone}</div>
                  <p className="text-secondary mb-3" style={{ fontSize: '13px', lineHeight: '1.4' }}>{addr.details}</p>

                  {!addr.isDefault && (
                    <button 
                      onClick={() => setDefaultAddress(addr.id)} 
                      className="btn btn-sm btn-outline-secondary w-100 rounded-pill border"
                      style={{ fontSize: '12px' }}
                    >
                      Đặt làm mặc định
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered mx-3">
            <div className="modal-content rounded-4 border-0 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{editingId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger p-2 mb-3" style={{ fontSize: '13px' }}>{error}</div>}
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Họ tên người nhận *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nhập họ tên"
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Số điện thoại *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Nhập số điện thoại"
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Địa chỉ chi tiết *</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                      value={formData.details} 
                      onChange={(e) => setFormData({...formData, details: e.target.value})} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Loại địa chỉ</label>
                    <div className="d-flex gap-2">
                      {['Home', 'Office', 'Other'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({...formData, type: t})}
                          className={`btn btn-sm flex-grow-1 ${formData.type === t ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-check mt-3">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="isDefaultCheck"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                    />
                    <label className="form-check-label" htmlFor="isDefaultCheck" style={{ fontSize: '13px' }}>
                      Đặt làm địa chỉ giao hàng mặc định
                    </label>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 border-0">Lưu địa chỉ</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
