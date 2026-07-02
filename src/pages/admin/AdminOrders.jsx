import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null); // For Details Modal
  const [toastMessage, setToastMessage] = useState('');

  const statusOptions = ["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Hoàn thành", "Đã hủy"];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await apiService.getOrders();
    if (data) setOrders(data);
    else {
      setOrders([
        { 
          id: "ORD-9842", customer: "Agasya Watkin", email: "agasya@fuzzy.com", phone: "0912345678", address: "790 Hyde Park Rd, Ontario", total: 230.00, paymentMethod: "Mastercard", status: "Đang giao", date: "2026-06-28", 
          items: [{ name: "Lounge Chair", qty: 1, price: 130 }, { name: "Side Table", qty: 1, price: 50 }] 
        },
        { 
          id: "ORD-7612", customer: "Trung Nguyen", email: "trung@fuzzy.com", phone: "0987654321", address: "123 Street Name, Hanoi", total: 150.00, paymentMethod: "VNPay", status: "Chờ xác nhận", date: "2026-06-29", 
          items: [{ name: "Sheesham Wood Armchair", qty: 1, price: 120 }] 
        },
        { 
          id: "ORD-3310", customer: "John Doe", email: "john@gmail.com", phone: "0933445566", address: "456 Ocean Ave, Da Nang", total: 80.00, paymentMethod: "COD", status: "Hoàn thành", date: "2026-06-27", 
          items: [{ name: "Side Table", qty: 1, price: 50 }] 
        }
      ]);
    }
    setLoading(false);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await apiService.updateOrderStatus(id, newStatus);
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showToast(`Cập nhật đơn hàng ${id} sang "${newStatus}"`);
  };

  const handleCancelOrder = async (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${id}?`)) {
      await handleUpdateStatus(id, 'Đã hủy');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'admin-badge-success';
      case 'Đang giao': return 'admin-badge-info';
      case 'Đang chuẩn bị': return 'admin-badge-primary';
      case 'Chờ xác nhận': return 'admin-badge-warning';
      case 'Đã hủy': return 'admin-badge-danger';
      default: return 'admin-badge-secondary';
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (o.customer && o.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Quản lý Đơn hàng">
      {toastMessage && (
        <div className="admin-toast">
          ✅ {toastMessage}
        </div>
      )}

      {/* Action Header */}
      <div className="admin-toolbar mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-5">
            <div className="admin-search-wrapper">
              <span className="admin-search-icon"><Iconsax icon="search-normal-2" /></span>
              <input 
                type="text" 
                className="admin-form-control" 
                placeholder="Search orders by ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="d-flex gap-2 flex-wrap justify-content-md-end">
              {['All', ...statusOptions].map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`admin-btn ${selectedStatus === st ? 'admin-btn-primary' : 'admin-btn-outline'} admin-btn-sm`}
                >
                  {st === 'All' ? 'All Orders' : st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Count</th>
                <th>Total Price</th>
                <th>Payment Method</th>
                <th>Order Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-secondary">No orders found matching criteria</td>
                </tr>
              ) : (
                filteredOrders.map(o => (
                  <tr key={o.id}>
                    <td className="admin-td-bold text-primary">{o.id}</td>
                    <td>
                      <div className="fw-semibold text-dark">{o.customer}</div>
                      <span className="text-secondary" style={{ fontSize: '12px' }}>{o.phone || o.email}</span>
                    </td>
                    <td>{o.items ? o.items.length : 1} items</td>
                    <td className="fw-bold text-dark">${o.total.toFixed(2)}</td>
                    <td><span className="admin-badge admin-badge-secondary">{o.paymentMethod || 'COD'}</span></td>
                    <td className="text-secondary" style={{ fontSize: '13px' }}>{o.date}</td>
                    <td>
                      <select 
                        className={`admin-form-control admin-select-sm fw-semibold ${getStatusBadge(o.status)}`}
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        style={{ width: '150px', cursor: 'pointer', padding: '6px 12px' }}
                      >
                        {statusOptions.map(st => <option key={st} value={st} className="bg-white text-dark">{st}</option>)}
                      </select>
                    </td>
                    <td className="text-end">
                      <div className="admin-actions justify-content-end">
                        <button onClick={() => setSelectedOrder(o)} className="admin-btn admin-btn-outline admin-btn-sm" title="View details">
                          <Iconsax icon="eye" />
                        </button>
                        {o.status !== 'Hoàn thành' && o.status !== 'Đã hủy' && (
                          <button onClick={() => handleCancelOrder(o.id)} className="admin-btn admin-btn-danger admin-btn-sm ms-2" title="Cancel order">
                            <Iconsax icon="close-circle" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold">Chi tiết Đơn hàng #{selectedOrder.id}</h5>
                  <span className="text-secondary" style={{ fontSize: '13px' }}>Ngày đặt: {selectedOrder.date}</span>
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 h-100 border">
                      <h6 className="fw-bold mb-2 text-dark">Thông tin khách hàng</h6>
                      <div className="mb-1"><strong>Họ tên:</strong> {selectedOrder.customer}</div>
                      <div className="mb-1"><strong>Email:</strong> {selectedOrder.email || 'agasya@fuzzy.com'}</div>
                      <div><strong>SĐT:</strong> {selectedOrder.phone || '0912345678'}</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 h-100 border">
                      <h6 className="fw-bold mb-2 text-dark">Địa chỉ & Thanh toán</h6>
                      <div className="mb-1"><strong>Địa chỉ:</strong> {selectedOrder.address || '790 Hyde Park Rd, Ontario'}</div>
                      <div className="mb-1"><strong>Phương thức:</strong> {selectedOrder.paymentMethod || 'Mastercard'}</div>
                      <div className="d-flex align-items-center">
                        <strong>Trạng thái:</strong> 
                        <span className={`admin-badge ${getStatusBadge(selectedOrder.status)} ms-2`}>{selectedOrder.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold mb-2 text-dark">Danh sách sản phẩm</h6>
                <div className="admin-table-wrapper border rounded-3 mb-3">
                  <table className="admin-table table-sm">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th className="text-end">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.name} {item.color && `(${item.color})`}</td>
                            <td>{item.qty}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td className="text-end fw-semibold">${(item.price * item.qty).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="text-center">1x Lounge Chair ($130)</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-primary-subtle text-primary rounded-3 border border-primary-subtle">
                  <h5 className="fw-bold m-0">Tổng tiền đơn hàng</h5>
                  <h4 className="fw-bold m-0">${selectedOrder.total.toFixed(2)}</h4>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setSelectedOrder(null)}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
