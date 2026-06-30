import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Orders() {
  const { orders } = useApp();

  const defaultOrders = [
    { id: "ORD-9842", date: "2026-06-28", total: 230.00, status: "Đang giao", itemsCount: 3 },
    { id: "ORD-7612", date: "2026-06-15", total: 150.00, status: "Hoàn thành", itemsCount: 1 }
  ];

  const displayOrders = (orders && orders.length > 0) ? orders : defaultOrders;

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/profile">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>My Orders</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      <section className="mt-3">
        <div className="custom-container">
          <div className="d-flex flex-column gap-3">
            {displayOrders.map((order) => (
              <div key={order.id} className="card border-0 shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold m-0">{order.id}</h5>
                  <span className={`badge ${order.status === 'Hoàn thành' ? 'bg-success' : order.status === 'Đã hủy' ? 'bg-danger' : 'bg-warning text-dark'} px-3 py-2 rounded-pill`}>
                    {order.status}
                  </span>
                </div>
                <div className="light-text mb-2" style={{ fontSize: '13px' }}>
                  Date: {order.date} | Items: {order.itemsCount || 1}
                </div>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                  <div>
                    <span className="light-text" style={{ fontSize: '12px' }}>Total Price:</span>
                    <h4 className="fw-bold theme-color m-0">${Number(order.total).toFixed(2)}</h4>
                  </div>
                  <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-space"></section>
      <BottomNav />
    </>
  );
}
