import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    shopName: 'Fuzzy Mobile Furniture Store',
    contactEmail: 'support@fuzzy.com',
    phone: '+84 901 234 567',
    address: '790 Hyde Park Rd, Ontario, Canada',
    currency: 'USD ($)',
    themeColor: '#122636'
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function loadSettings() {
      const data = await apiService.getSettings();
      if (data) setSettings(data);
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiService.updateSettings(settings);
    setToastMessage('Đã lưu cài đặt hệ thống thành công!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <AdminLayout title="Cài đặt Hệ thống">
      {toastMessage && (
        <div className="alert alert-success position-fixed top-0 end-0 m-4 shadow-lg z-3 rounded-4" style={{ zIndex: 9999 }}>
          ✅ {toastMessage}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold mb-4 text-dark">Thông tin cửa hàng</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Tên Cửa Hàng / Brand *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settings.shopName} 
                    onChange={(e) => setSettings({...settings, shopName: e.target.value})} 
                    required 
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Email Hỗ Trợ *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={settings.contactEmail} 
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} 
                    required 
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Số Điện Thoại Hotline</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settings.phone} 
                    onChange={(e) => setSettings({...settings, phone: e.target.value})} 
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Đơn Vị Tiền Tệ</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={settings.currency} 
                    onChange={(e) => setSettings({...settings, currency: e.target.value})} 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Địa Chỉ Trụ Sở / Kho Hàng</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    value={settings.address} 
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="fw-bold mb-3 text-dark">Cấu hình giao diện</h5>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Màu Chủ Đạo Theme</label>
                  <div className="d-flex align-items-center gap-3">
                    <input 
                      type="color" 
                      className="form-control form-control-color" 
                      value={settings.themeColor} 
                      onChange={(e) => setSettings({...settings, themeColor: e.target.value})} 
                    />
                    <span className="fw-semibold">{settings.themeColor}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-semibold">
                  Lưu Cài Đặt
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold mb-3 text-dark">Trạng thái hệ thống</h5>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-light rounded-3">
                <div className="light-text" style={{ fontSize: '12px' }}>Phiên bản App:</div>
                <div className="fw-bold text-dark">Fuzzy Mobile v1.0.0 (PWA)</div>
              </div>
              <div className="p-3 bg-light rounded-3">
                <div className="light-text" style={{ fontSize: '12px' }}>Backend API:</div>
                <div className="fw-bold text-success">Next.js API Routes (Active)</div>
              </div>
              <div className="p-3 bg-light rounded-3">
                <div className="light-text" style={{ fontSize: '12px' }}>Cơ sở dữ liệu:</div>
                <div className="fw-bold text-primary">In-Memory / Local Storage Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
