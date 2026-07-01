import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useApp();

  const [isUnlocked, setIsUnlocked] = useState(localStorage.getItem('fuzzy_app_unlocked') === 'true');
  const token = localStorage.getItem('fuzzy_token');
  const isLoggedIn = user?.isLoggedIn || token;

  // Direct redirection if already fully logged in to both gate and store
  useEffect(() => {
    if (isUnlocked && isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isUnlocked, isLoggedIn, navigate]);

  // Form states for Gate Login
  const [usernameGate, setUsernameGate] = useState('');
  const [passwordGate, setPasswordGate] = useState('');
  
  // Form states for Store Login
  const [emailStore, setEmailStore] = useState('trungngo1903');
  const [passwordStore, setPasswordStore] = useState('trunglove123');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Handle Gate Login
  const handleGateSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usernameGate.trim()) {
      setError('Vui lòng nhập tài khoản mở cổng');
      return;
    }
    if (!passwordGate.trim()) {
      setError('Vui lòng nhập mật khẩu mở cổng');
      return;
    }

    if (usernameGate.trim() === 'trungngo1903206' && passwordGate === 'trunglove123') {
      localStorage.setItem('fuzzy_app_unlocked', 'true');
      setIsUnlocked(true);
      setError('');
      navigate('/');
    } else {
      setError('Tài khoản hoặc mật khẩu mở cổng không chính xác!');
    }
  };

  // Handle Store Login
  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailStore.trim()) {
      setError('Vui lòng nhập Email hoặc Username');
      return;
    }

    if (passwordStore.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự');
      return;
    }

    try {
      const res = await login(emailStore, passwordStore);
      if (res.user?.role === 'admin' || emailStore === 'trungngo1903') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  // If app is locked, render Gate Login UI
  if (!isUnlocked) {
    return (
      <div className="login-page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '15px' }}>
        <div className="login-card" style={{ width: '100%', maxWidth: '420px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', padding: '24px' }}>
          <div className="login-header-box text-center mb-4">
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#122636', marginBottom: '8px' }}>Fuzzy Mobile E-commerce</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Mở khóa cổng hệ thống để tiếp tục</p>
          </div>

          <div className="login-body">
            {error && (
              <div className="alert alert-danger p-2 mb-3 text-center" style={{ fontSize: '14px', borderRadius: '8px', color: '#b91c1c', backgroundColor: '#fef2f2', border: '1px solid #fee2e2' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleGateSubmit}>
              <div className="auth-form-group mb-3">
                <label htmlFor="inputGateUsername" className="auth-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                  Tài khoản Cổng
                </label>
                <div className="auth-input-wrapper" style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="auth-input-field form-control" 
                    id="inputGateUsername" 
                    placeholder="Nhập tài khoản mở cổng" 
                    value={usernameGate}
                    onChange={(e) => setUsernameGate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 16px 12px 45px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#1e293b' }}
                  />
                  <span className="auth-input-icon" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <Iconsax icon="user" />
                  </span>
                </div>
              </div>

              <div className="auth-form-group mb-4">
                <label htmlFor="inputGatePassword" className="auth-form-label" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                  Mật khẩu Cổng
                </label>
                <div className="auth-input-wrapper" style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="auth-input-field form-control" 
                    id="inputGatePassword" 
                    placeholder="Nhập mật khẩu mở cổng" 
                    value={passwordGate}
                    onChange={(e) => setPasswordGate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 45px 12px 45px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#1e293b' }}
                  />
                  <span className="auth-input-icon" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
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

              <button 
                type="submit" 
                className="btn w-100" 
                style={{ backgroundColor: '#122636', color: '#ffffff', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '16px', border: 'none', transition: 'background 0.2s', cursor: 'pointer' }}
              >
                Mở khóa hệ thống
              </button>

              <div className="demo-credentials-box mt-4 p-3 rounded" style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                <p className="m-0 mb-1" style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>🔑 Tài khoản mở cổng:</p>
                <p className="m-0" style={{ fontSize: '12px', color: '#64748b' }}>Username: <code style={{ fontWeight: '600', color: '#0f172a' }}>trungngo1903206</code></p>
                <p className="m-0" style={{ fontSize: '12px', color: '#64748b' }}>Password: <code style={{ fontWeight: '600', color: '#0f172a' }}>trunglove123</code></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // If unlocked, render original Store Login UI
  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <div className="login-header-box">
          <h2>Đăng nhập Cửa hàng</h2>
          <p>Chào mừng bạn trở lại Fuzzy App</p>
        </div>

        <div className="login-body">
          {error && (
            <div className="alert alert-danger p-2 mb-3 text-center" style={{ fontSize: '14px', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleStoreSubmit}>
            <div className="auth-form-group">
              <label htmlFor="inputusername" className="auth-form-label">Tài khoản / Email / Username</label>
              <div className="auth-input-wrapper">
                <input 
                  type="text" 
                  className="auth-input-field" 
                  id="inputusername" 
                  placeholder="Nhập Email hoặc Username" 
                  value={emailStore}
                  onChange={(e) => setEmailStore(e.target.value)}
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
                  value={passwordStore}
                  onChange={(e) => setPasswordStore(e.target.value)}
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
