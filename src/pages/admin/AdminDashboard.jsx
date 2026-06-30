import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import Iconsax from '../../components/Iconsax';
import { apiService } from '../../services/api';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    productsCount: 6,
    ordersCount: 3,
    totalRevenue: 460.00,
    pendingOrders: 1,
    usersCount: 4
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      const prods = await apiService.getProducts();
      const ords = await apiService.getOrders();
      const usrs = await apiService.getUsers();

      if (prods && ords) {
        const rev = ords.reduce((sum, o) => sum + (o.total || 0), 0);
        const pending = ords.filter(o => o.status === 'Chờ xác nhận').length;
        setMetrics({
          productsCount: prods.length,
          ordersCount: ords.length,
          totalRevenue: rev,
          pendingOrders: pending,
          usersCount: usrs ? usrs.length : 4
        });
        setRecentOrders(ords.slice(0, 5));
        setLowStockProducts(prods.filter(p => p.stock <= 5));
      } else {
        // Fallback mock data
        setRecentOrders([
          { id: "ORD-9842", customer: "Agasya Watkin", total: 230.00, status: "Đang giao", date: "2026-06-28" },
          { id: "ORD-7612", customer: "Trung Nguyen", total: 150.00, status: "Chờ xác nhận", date: "2026-06-29" },
          { id: "ORD-3310", customer: "John Doe", total: 80.00, status: "Hoàn thành", date: "2026-06-27" }
        ]);
        setLowStockProducts([
          { id: 3, name: "Wooden Dining Table", stock: 2, price: 280.00 },
          { id: 11, name: "Lounge Chair", stock: 0, price: 130.00 }
        ]);
      }
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-success-subtle text-success';
      case 'Đang giao': return 'bg-info-subtle text-info';
      case 'Đang chuẩn bị': return 'bg-primary-subtle text-primary';
      case 'Chờ xác nhận': return 'bg-warning-subtle text-warning';
      case 'Đã hủy': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  return (
    <AdminLayout title="Dashboard Tổng quan">
      {/* Metrics Row */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-4 col-xl-2-4" style={{ flex: '1 1 200px' }}>
          <StatCard title="Tổng sản phẩm" value={metrics.productsCount} icon="box" color="primary" />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-2-4" style={{ flex: '1 1 200px' }}>
          <StatCard title="Tổng đơn hàng" value={metrics.ordersCount} icon="shopping-bag" color="success" />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 col-xl-2-4" style={{ flex: '1 1 200px' }}>
          <StatCard title="Tổng doanh thu" value={`$${metrics.totalRevenue.toFixed(2)}`} icon="wallet-money" color="info" />
        </div>
        <div className="col-12 col-sm-6 col-lg-6 col-xl-2-4" style={{ flex: '1 1 200px' }}>
          <StatCard title="Đơn chờ xác nhận" value={metrics.pendingOrders} icon="clock" color="warning" />
        </div>
        <div className="col-12 col-sm-6 col-lg-6 col-xl-2-4" style={{ flex: '1 1 200px' }}>
          <StatCard title="Tổng người dùng" value={metrics.usersCount} icon="user" color="secondary" />
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Orders */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-dark">Đơn hàng gần đây</h5>
              <Link to="/admin/orders" className="btn btn-sm btn-outline-primary rounded-pill">Xem tất cả</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle m-0">
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Ngày đặt</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id}>
                      <td className="fw-bold text-primary">{o.id}</td>
                      <td>{o.customer}</td>
                      <td className="fw-semibold">${o.total.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${getStatusBadge(o.status)} px-3 py-2 rounded-pill`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="text-secondary" style={{ fontSize: '13px' }}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 text-dark">Cảnh báo tồn kho</h5>
              <Iconsax icon="danger" className="text-danger fs-4" />
            </div>
            <div className="d-flex flex-column gap-3">
              {lowStockProducts.map(p => (
                <div key={p.id} className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light">
                  <div>
                    <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '14px' }}>{p.name}</h6>
                    <span className="text-secondary" style={{ fontSize: '12px' }}>Giá: ${p.price}</span>
                  </div>
                  <span className={`badge ${p.stock === 0 ? 'bg-danger' : 'bg-warning text-dark'} px-3 py-2 rounded-pill`}>
                    {p.stock === 0 ? 'Hết hàng' : `Còn ${p.stock}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
