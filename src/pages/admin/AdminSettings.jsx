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
        <div className="admin-toast">
          ✅ {toastMessage}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="admin-card p-4">
            <h3 className="admin-card-title mb-4">Store Configuration</h3>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Store Name / Brand *</label>
                    <input 
                      type="text" 
                      className="admin-form-control w-100" 
                      value={settings.shopName} 
                      onChange={(e) => setSettings({...settings, shopName: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Support Email *</label>
                    <input 
                      type="email" 
                      className="admin-form-control w-100" 
                      value={settings.contactEmail} 
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Hotline Phone</label>
                    <input 
                      type="text" 
                      className="admin-form-control w-100" 
                      value={settings.phone} 
                      onChange={(e) => setSettings({...settings, phone: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Currency Symbol</label>
                    <input 
                      type="text" 
                      className="admin-form-control w-100" 
                      value={settings.currency} 
                      onChange={(e) => setSettings({...settings, currency: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Warehouse Address / Headquarter</label>
                    <textarea 
                      className="admin-form-control w-100" 
                      rows="3" 
                      value={settings.address} 
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="my-4" style={{ borderColor: '#cbd5e1' }} />

              <h3 className="admin-card-title mb-3">Appearance Theme</h3>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Brand Primary Color</label>
                    <div className="d-flex align-items-center gap-3">
                      <input 
                        type="color" 
                        className="admin-form-control form-control-color" 
                        value={settings.themeColor} 
                        onChange={(e) => setSettings({...settings, themeColor: e.target.value})} 
                        style={{ width: '60px', height: '40px', padding: '2px' }}
                      />
                      <span className="fw-semibold text-dark">{settings.themeColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="admin-btn admin-btn-primary px-5 py-2">
                  Save Configurations
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="admin-card p-4">
            <h3 className="admin-card-title mb-3">System Status</h3>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-light rounded-3 border">
                <div className="text-secondary" style={{ fontSize: '11px', fontWeight: '700' }}>APP VERSION:</div>
                <div className="fw-bold text-dark mt-1">Fuzzy Mobile v1.0.0 (PWA)</div>
              </div>
              <div className="p-3 bg-light rounded-3 border">
                <div className="text-secondary" style={{ fontSize: '11px', fontWeight: '700' }}>BACKEND API:</div>
                <div className="fw-bold text-success mt-1">Next.js API Routes (Active)</div>
              </div>
              <div className="p-3 bg-light rounded-3 border">
                <div className="text-secondary" style={{ fontSize: '11px', fontWeight: '700' }}>DATABASE STATUS:</div>
                <div className="fw-bold text-primary mt-1">In-Memory / Local Storage Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
