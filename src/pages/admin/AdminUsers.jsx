import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await apiService.getUsers();
    if (data) setUsers(data);
    else {
      setUsers([
        { id: 1, name: "System Admin", email: "trungngo1903", role: "admin", status: "Active", phone: "0901234567", avatar: "/assets/images/icons/profile.png", createdAt: "2026-01-01" },
        { id: 2, name: "Agasya Watkin", email: "agasya@fuzzy.com", role: "user", status: "Active", phone: "0912345678", avatar: "/assets/images/icons/profile1.png", createdAt: "2026-02-15" },
        { id: 3, name: "Trung Nguyen", email: "trung@fuzzy.com", role: "user", status: "Active", phone: "0987654321", avatar: "/assets/images/icons/profile2.png", createdAt: "2026-03-10" },
        { id: 4, name: "John Doe", email: "john@gmail.com", role: "user", status: "Locked", phone: "0933445566", avatar: "/assets/images/icons/profile3.png", createdAt: "2026-04-05" }
      ]);
    }
    setLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = async (u) => {
    const newStatus = u.status === 'Active' ? 'Locked' : 'Active';
    await apiService.updateUserStatus(u.id, newStatus);
    setUsers(users.map(item => item.id === u.id ? { ...item, status: newStatus } : item));
    showToast(`Đã đổi trạng thái tài khoản ${u.email} sang "${newStatus}"`);
  };

  const handleToggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    if (u.email === 'trungngo1903' || u.email === 'admin@gmail.com') {
      alert('Không thể hạ quyền tài khoản Super Admin chính!');
      return;
    }
    await apiService.updateUserRole(u.id, newRole);
    setUsers(users.map(item => item.id === u.id ? { ...item, role: newRole } : item));
    showToast(`Đã đổi quyền tài khoản ${u.email} thành "${newRole}"`);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <AdminLayout title="Quản lý Người dùng">
      {toastMessage && (
        <div className="alert alert-success position-fixed top-0 end-0 m-4 shadow-lg z-3 rounded-4" style={{ zIndex: 9999 }}>
          ✅ {toastMessage}
        </div>
      )}

      {/* Action Header */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-light border-0"><Iconsax icon="search-normal-2" /></span>
              <input 
                type="text" 
                className="form-control bg-light border-0" 
                placeholder="Tìm tên hoặc email người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <div className="btn-group rounded-pill overflow-hidden border">
              <button 
                className={`btn btn-sm ${selectedRole === 'All' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setSelectedRole('All')}
              >
                Tất cả ({users.length})
              </button>
              <button 
                className={`btn btn-sm ${selectedRole === 'admin' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setSelectedRole('admin')}
              >
                Admin ({users.filter(u => u.role === 'admin').length})
              </button>
              <button 
                className={`btn btn-sm ${selectedRole === 'user' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setSelectedRole('user')}
              >
                Khách hàng ({users.filter(u => u.role === 'user').length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle m-0">
            <thead className="table-light">
              <tr>
                <th>Avatar</th>
                <th>Họ & Tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Quyền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th className="text-end">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-secondary">Không tìm thấy người dùng phù hợp</td>
                </tr>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <img src={u.avatar || "/assets/images/icons/profile.png"} alt={u.name} className="rounded-circle border" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                    </td>
                    <td className="fw-bold text-dark">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || 'N/A'}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'bg-primary-subtle text-primary' : 'bg-light text-dark border'} px-3 py-2 rounded-pill fw-semibold`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${u.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-3 py-2 rounded-pill`}>
                        {u.status === 'Active' ? 'Hoạt động' : 'Đã khóa'}
                      </span>
                    </td>
                    <td className="text-secondary" style={{ fontSize: '13px' }}>{u.createdAt}</td>
                    <td className="text-end">
                      <button 
                        onClick={() => handleToggleRole(u)} 
                        className="btn btn-sm btn-outline-primary me-2 rounded-pill px-3"
                        title="Đổi quyền"
                      >
                        {u.role === 'admin' ? 'Giảm Quyền' : 'Thăng Admin'}
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(u)} 
                        className={`btn btn-sm ${u.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'} rounded-circle`}
                        title={u.status === 'Active' ? 'Khóa TK' : 'Mở Khóa'}
                      >
                        <Iconsax icon={u.status === 'Active' ? "lock" : "unlock"} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
