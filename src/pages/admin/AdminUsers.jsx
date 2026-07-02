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
    showToast(`Đổi trạng thái tài khoản ${u.email} sang "${newStatus}"`);
  };

  const handleToggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    if (u.email === 'trungngo1903' || u.email === 'admin@gmail.com') {
      alert('Không thể hạ quyền tài khoản Super Admin chính!');
      return;
    }
    await apiService.updateUserRole(u.id, newRole);
    setUsers(users.map(item => item.id === u.id ? { ...item, role: newRole } : item));
    showToast(`Đổi quyền tài khoản ${u.email} thành "${newRole}"`);
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
        <div className="admin-toast">
          ✅ {toastMessage}
        </div>
      )}

      {/* Action Header */}
      <div className="admin-toolbar mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="admin-search-wrapper">
              <span className="admin-search-icon"><Iconsax icon="search-normal-2" /></span>
              <input 
                type="text" 
                className="admin-form-control" 
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <div className="admin-btn-group">
              <button 
                className={`admin-btn ${selectedRole === 'All' ? 'admin-btn-primary' : 'admin-btn-outline'} admin-btn-sm`}
                onClick={() => setSelectedRole('All')}
              >
                All Users ({users.length})
              </button>
              <button 
                className={`admin-btn ${selectedRole === 'admin' ? 'admin-btn-primary' : 'admin-btn-outline'} admin-btn-sm ms-2`}
                onClick={() => setSelectedRole('admin')}
              >
                Admins ({users.filter(u => u.role === 'admin').length})
              </button>
              <button 
                className={`admin-btn ${selectedRole === 'user' ? 'admin-btn-primary' : 'admin-btn-outline'} admin-btn-sm ms-2`}
                onClick={() => setSelectedRole('user')}
              >
                Customers ({users.filter(u => u.role === 'user').length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-secondary">No users found matching criteria</td>
                </tr>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u.id}>
                    <td>
                      <img src={u.avatar || "/assets/images/icons/profile.png"} alt={u.name} className="admin-profile-avatar" />
                    </td>
                    <td className="admin-td-bold text-dark">{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || 'N/A'}</td>
                    <td>
                      <span className={`admin-badge ${u.role === 'admin' ? 'admin-badge-primary' : 'admin-badge-secondary'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${u.status === 'Active' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                        {u.status === 'Active' ? 'Active' : 'Locked'}
                      </span>
                    </td>
                    <td className="text-secondary" style={{ fontSize: '13px' }}>{u.createdAt}</td>
                    <td className="text-end">
                      <div className="admin-actions justify-content-end">
                        <button 
                          onClick={() => handleToggleRole(u)} 
                          className="admin-btn admin-btn-outline admin-btn-sm"
                          title="Toggle Role"
                          style={{ minWidth: '100px' }}
                        >
                          {u.role === 'admin' ? 'Demote User' : 'Promote Admin'}
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(u)} 
                          className={`admin-btn ${u.status === 'Active' ? 'admin-btn-danger' : 'admin-btn-primary'} admin-btn-sm ms-2`}
                          title={u.status === 'Active' ? 'Lock Account' : 'Unlock Account'}
                        >
                          <Iconsax icon={u.status === 'Active' ? "lock" : "unlock"} />
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
    </AdminLayout>
  );
}
