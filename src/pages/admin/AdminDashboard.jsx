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
      case 'Hoàn thành': return 'admin-badge-success';
      case 'Đang giao': return 'admin-badge-info';
      case 'Đang chuẩn bị': return 'admin-badge-primary';
      case 'Chờ xác nhận': return 'admin-badge-warning';
      case 'Đã hủy': return 'admin-badge-danger';
      default: return 'admin-badge-secondary';
    }
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Metrics Row */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 mb-4">
        <div className="col">
          <StatCard title="Total Products" value={metrics.productsCount} icon="box" color="primary" trend="+5% this month" />
        </div>
        <div className="col">
          <StatCard title="Total Orders" value={metrics.ordersCount} icon="shopping-bag" color="success" trend="+12% this week" />
        </div>
        <div className="col">
          <StatCard title="Revenue" value={`$${metrics.totalRevenue.toFixed(2)}`} icon="wallet-money" color="info" trend="+18% this month" />
        </div>
        <div className="col">
          <StatCard title="Pending Orders" value={metrics.pendingOrders} icon="clock" color="warning" trend="Needs attention" />
        </div>
        <div className="col">
          <StatCard title="Users" value={metrics.usersCount} icon="user" color="secondary" trend="+8% this month" />
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Orders */}
        <div className="col-12 col-xl-8">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Recent Orders</h3>
              <Link to="/admin/orders" className="admin-btn admin-btn-outline admin-btn-sm">View All</Link>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id}>
                      <td className="admin-td-bold text-primary">{o.id}</td>
                      <td>{o.customer}</td>
                      <td className="fw-semibold">${o.total.toFixed(2)}</td>
                      <td>
                        <span className={`admin-badge ${getStatusBadge(o.status)}`}>
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
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Stock Alerts</h3>
              <span className="admin-card-badge admin-badge-danger">Low Stock</span>
            </div>
            <div className="admin-alert-list">
              {lowStockProducts.length === 0 ? (
                <div className="text-center py-4 text-secondary">All products are well stocked.</div>
              ) : (
                lowStockProducts.map(p => (
                  <div key={p.id} className="admin-alert-item">
                    <div className="admin-alert-item-left">
                      <span className="admin-alert-icon">⚠️</span>
                      <div className="admin-alert-item-info">
                        <h4 className="admin-alert-product-name">{p.name}</h4>
                        <span className="admin-alert-product-price">Price: ${p.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <span className={`admin-badge ${p.stock === 0 ? 'admin-badge-danger' : 'admin-badge-warning'}`}>
                      {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
