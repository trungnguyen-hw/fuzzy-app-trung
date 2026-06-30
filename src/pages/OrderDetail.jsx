import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders } = useApp();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrderDetail() {
      setLoading(true);
      // 1. Find in context orders list first
      let foundOrder = orders ? orders.find(o => o.id === id) : null;
      
      // 2. Fallback to API if not in context
      if (!foundOrder) {
        try {
          const apiOrders = await apiService.getOrders();
          if (apiOrders) {
            foundOrder = apiOrders.find(o => o.id === id);
          }
        } catch (err) {
          console.warn("Error fetching order detail", err);
        }
      }

      setOrder(foundOrder);
      setLoading(false);
    }
    loadOrderDetail();
  }, [id, orders]);

  const getTimelineSteps = (status) => {
    const steps = [
      { title: "Chờ xác nhận", date: "Đơn hàng đã được tạo", completed: false, active: false },
      { title: "Đang chuẩn bị", date: "Shop đang chuẩn bị hàng", completed: false, active: false },
      { title: "Đang giao", date: "Đơn hàng đang được giao đi", completed: false, active: false },
      { title: "Hoàn thành", date: "Giao hàng thành công", completed: false, active: false }
    ];

    if (status === "Đã hủy") {
      return [
        { title: "Chờ xác nhận", date: "Đơn hàng đã tạo", completed: true, active: false },
        { title: "Đã hủy", date: "Đơn hàng đã bị hủy", completed: true, active: true }
      ];
    }

    const orderOfStatus = ["Chờ xác nhận", "Đang chuẩn bị", "Đang giao", "Hoàn thành"];
    const currentIndex = orderOfStatus.indexOf(status);

    return steps.map((step, idx) => {
      const isCompleted = idx <= currentIndex;
      const isActive = idx === currentIndex;
      return {
        ...step,
        completed: isCompleted,
        active: isActive
      };
    });
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light p-4 text-center">
        <Iconsax icon="danger" className="text-danger display-1 mb-3" />
        <h3 className="fw-bold mb-2">Không tìm thấy đơn hàng</h3>
        <p className="text-secondary mb-4">Đơn hàng #{id} không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
        <Link to="/orders" className="btn theme-btn px-4 border-0">Quay lại danh sách đơn</Link>
      </div>
    );
  }

  const timelineSteps = getTimelineSteps(order.status);
  const orderItems = order.items || [
    { name: "Lounge Chair", qty: 1, price: 130, image: "/assets/images/product/11.png", color: "Blue", size: "M" }
  ];

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/orders">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Order Timeline</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      <section className="mt-3 section-b-space">
        <div className="custom-container">
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h4 className="fw-bold m-0">Order #{order.id}</h4>
              <span className={`badge ${order.status === 'Hoàn thành' ? 'bg-success' : order.status === 'Đã hủy' ? 'bg-danger' : 'bg-warning text-dark'} px-3 py-2 rounded-pill`}>
                {order.status}
              </span>
            </div>
            <p className="light-text mb-3" style={{ fontSize: '13px' }}>Placed on {order.date}</p>

            <div className="mb-3 pt-2 border-top">
              <h6 className="fw-bold mb-1">Thông tin khách hàng:</h6>
              <div style={{ fontSize: '13px' }}><strong>Tên:</strong> {order.customer}</div>
              {order.phone && <div style={{ fontSize: '13px' }}><strong>Số điện thoại:</strong> {order.phone}</div>}
              {order.email && <div style={{ fontSize: '13px' }}><strong>Email:</strong> {order.email}</div>}
            </div>

            <div className="mb-3 pt-2 border-top">
              <h6 className="fw-bold mb-1">Địa chỉ giao hàng:</h6>
              <div className="text-secondary" style={{ fontSize: '13px' }}>{order.address}</div>
            </div>

            <div className="mb-3 pt-2 border-top">
              <h6 className="fw-bold mb-1">Phương thức thanh toán:</h6>
              <div className="text-secondary" style={{ fontSize: '13px' }}>{order.paymentMethod || 'COD'}</div>
            </div>

            <h5 className="fw-semibold mb-3 mt-3 pt-2 border-top">Delivery Status</h5>

            {/* Timeline */}
            <div className="ps-3 border-start border-2 border-primary position-relative ms-2 my-2">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="mb-4 position-relative">
                  <div 
                    className={`position-absolute top-0 start-0 translate-middle rounded-circle border border-2 border-white ${step.completed ? 'bg-primary' : 'bg-secondary'}`} 
                    style={{ width: '16px', height: '16px', left: '-17px' }}
                  ></div>
                  <h6 className={`m-0 fw-bold ${step.active ? 'text-primary' : ''}`}>{step.title}</h6>
                  <span className="light-text" style={{ fontSize: '12px' }}>{step.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <h5 className="fw-semibold mb-3">Order Items</h5>
            {orderItems.map((item, idx) => (
              <div key={idx} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <img src={item.image || "/assets/images/product/1.png"} alt="item" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div className="flex-grow-1">
                  <h6 className="fw-bold m-0">{item.name}</h6>
                  <span className="light-text" style={{ fontSize: '12px' }}>
                    Qty: {item.qty} | Color: {item.color || 'Standard'} | Size: {item.size || 'M'}
                  </span>
                </div>
                <h5 className="fw-bold m-0">${(item.price * item.qty).toFixed(2)}</h5>
              </div>
            ))}
            
            <div className="d-flex justify-content-between align-items-center pt-2 mt-2">
              <h5 className="fw-bold theme-color m-0">Total Amount:</h5>
              <h4 className="fw-bold text-primary m-0">${Number(order.total).toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
