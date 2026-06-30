import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('trungngo1903');
  const [password, setPassword] = useState('trunglove123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.trim()) {
      setError('Vui lòng nhập Email hoặc Username');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự');
      return;
    }

    try {
      const res = await login(email, password);
      if (res.user?.role === 'admin' || email === 'trungngo1903') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-header-box">
          <h2>Đăng nhập Hệ thống</h2>
          <p>Chào mừng bạn trở lại Fuzzy App</p>
        </div>

        <div className="login-body">
          {error && (
            <div className="alert alert-danger p-2 mb-3 text-center" style={{ fontSize: '14px', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="inputusername" className="auth-form-label">Tài khoản / Email / Username</label>
              <div className="auth-input-wrapper">
                <input 
                  type="text" 
                  className="auth-input-field" 
                  id="inputusername" 
                  placeholder="Nhập Email hoặc Username" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="auth-input-icon">
                  <Iconsax icon="user" />
                </span>
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="inputPassword" className="auth-form-label">Mật khẩu</label>
              <div className="auth-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="auth-input-field" 
                  id="inputPassword" 
                  placeholder="Nhập Mật khẩu" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '45px' }}
                />
                <span className="auth-input-icon">
                  <Iconsax icon="lock" />
                </span>
                <button
                  type="button"
                  className="border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-3 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ zIndex: 10, cursor: 'pointer', color: '#64748b' }}
                >
                  <Iconsax icon={showPassword ? "eye-slash" : "eye"} />
                </button>
              </div>
            </div>

            <div className="auth-options">
              <div className="d-flex align-items-center">
                <input type="checkbox" defaultChecked id="rememberMe" />
                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
              </div>
              <a className="auth-forgot-link" href="#forgot" onClick={(e) => e.preventDefault()}>Quên mật khẩu?</a>
            </div>

            <button type="submit" className="auth-btn-submit">
              <span>Đăng nhập</span>
            </button>

            <div className="auth-divider">
              <span>Hoặc</span>
            </div>

            <ul className="social-media p-0 m-0 list-unstyled d-flex justify-content-center gap-3">
              <li>
                <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer" className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                  <img className="img-fluid" src="/assets/images/svg/facebook.svg" alt="facebook" style={{ width: '20px' }} />
                </a>
              </li>
              <li>
                <a href="https://www.google.co.in/" target="_blank" rel="noreferrer" className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                  <img className="img-fluid" src="/assets/images/svg/google.svg" alt="google" style={{ width: '20px' }} />
                </a>
              </li>
              <li>
                <a href="https://www.apple.com/in/" target="_blank" rel="noreferrer" className="btn btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                  <img className="img-fluid" src="/assets/images/svg/apple.svg" alt="apple" style={{ width: '20px' }} />
                </a>
              </li>
            </ul>

            <div className="auth-footer-text">
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

