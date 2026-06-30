import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUserProfile } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    avatar: '/assets/images/icons/profile1.png'
  });
  const [toastMsg, setToastMsg] = useState('');

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const handleOpenEdit = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      dob: user.dob || '',
      avatar: user.avatar || '/assets/images/icons/profile1.png'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUserProfile(formData);
    if (res.success) {
      setToastMsg('Cập nhật thông tin thành công!');
      setTimeout(() => setToastMsg(''), 3000);
      setShowModal(false);
    } else {
      alert(res.message || 'Cập nhật thất bại');
    }
  };

  const avatarOptions = [
    '/assets/images/icons/profile.png',
    '/assets/images/icons/profile1.png',
    '/assets/images/icons/profile2.png',
    '/assets/images/icons/profile3.png'
  ];

  return (
    <>
      {toastMsg && (
        <div className="alert alert-success position-fixed top-0 end-0 m-4 shadow-lg z-3 rounded-4" style={{ zIndex: 9999 }}>
          ✅ {toastMsg}
        </div>
      )}

      {/* header start */}
      <header className="profile-header section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3>Profile</h3>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="profile-pic mt-5">
              <img className="img-fluid img" src={user.avatar || "/assets/images/icons/profile1.png"} alt="profile" style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div className="profile-name d-flex align-items-center justify-content-between mt-3 w-100">
              <div>
                <h4 className="theme-color m-0">{user.name || 'Agasya'}</h4>
                <div className="text-secondary" style={{ fontSize: '12px' }}>{user.email}</div>
                {user.phone && <div className="text-secondary" style={{ fontSize: '11px' }}>SĐT: {user.phone}</div>}
                {user.dob && <div className="text-secondary" style={{ fontSize: '11px' }}>Ngày sinh: {user.dob}</div>}
              </div>
              <button 
                onClick={handleOpenEdit} 
                className="border-0 bg-transparent p-0"
                style={{ cursor: 'pointer' }}
              >
                <Iconsax className="edit-icon text-primary" icon="edit-1" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* profile section start */}
      <section className="section-b-space pt-0">
        <div className="custom-container">
          <ul className="profile-list">
            <li>
              <Link to="/orders" className="profile-box">
                <div className="profile-img">
                  <Iconsax className="icon" icon="box" />
                </div>
                <div className="profile-details">
                  <h4>Orders</h4>
                  <h5>Ongoing orders, Recent orders..</h5>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="profile-box">
                <div className="profile-img">
                  <Iconsax className="icon" icon="heart" />
                </div>
                <div className="profile-details">
                  <h4>Wishlist</h4>
                  <h5>Your save product</h5>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/payment" className="profile-box">
                <div className="profile-img">
                  <Iconsax className="icon" icon="wallet-open" />
                </div>
                <div className="profile-details">
                  <h4>Payment</h4>
                  <h5>Saved card, Wallets</h5>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/saved-addresses" className="profile-box">
                <div className="profile-img">
                  <Iconsax className="icon" icon="location" />
                </div>
                <div className="profile-details">
                  <h4>Saved Address</h4>
                  <h5>Home, Office</h5>
                </div>
              </Link>
            </li>
            <li>
              <a href="#logout" onClick={handleLogout} className="profile-box">
                <div className="profile-img text-danger">
                  <Iconsax className="icon text-danger" icon="logout" />
                </div>
                <div className="profile-details">
                  <h4 className="text-danger">Logout</h4>
                  <h5>Sign out of your account</h5>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      {/* profile section end */}

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered mx-3">
            <div className="modal-content rounded-4 border-0 p-3 bg-white">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Chỉnh sửa thông tin</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <label className="form-label d-block fw-semibold mb-2" style={{ fontSize: '13px' }}>Chọn ảnh đại diện</label>
                    <div className="d-flex justify-content-center gap-2 mb-2">
                      {avatarOptions.map(av => (
                        <img
                          key={av}
                          src={av}
                          alt="avatar"
                          onClick={() => setFormData({...formData, avatar: av})}
                          className={`rounded-circle border p-1 ${formData.avatar === av ? 'border-primary border-2' : ''}`}
                          style={{ width: '45px', height: '45px', cursor: 'pointer', objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Họ tên *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Email *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Số điện thoại</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Ngày sinh</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={formData.dob} 
                      onChange={(e) => setFormData({...formData, dob: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-3">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Hủy</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4 border-0 bg-primary text-white">Lưu thay đổi</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* panel-space start */}
      <section className="panel-space"></section>
      {/* panel-space end */}

      <BottomNav />
    </>
  );
}
