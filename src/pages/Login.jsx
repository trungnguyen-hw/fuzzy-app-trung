import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { setUser, user } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [loginMessage, setLoginMessage] = useState('');

  // Dynamically set body class for auth page styling
  useEffect(() => {
    document.body.classList.add('auth-body');
    return () => {
      document.body.classList.remove('auth-body');
    };
  }, []);

  // Direct redirection if already fully logged in to both gate and store
  useEffect(() => {
    const isUnlocked = localStorage.getItem('fuzzy_app_unlocked') === 'true';
    const token = localStorage.getItem('token') || localStorage.getItem('fuzzy_token');
    const isLoggedIn = user?.isLoggedIn || token;
    
    if (isUnlocked && isLoggedIn) {
      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, navigate]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.trim()) {
      setError('Please enter your Email id');
      return;
    }
    if (!password || !password.trim()) {
      setError('Please enter your Password');
      return;
    }

    setIsLoginModalOpen(true);
    setLoginStatus('loading');
    setLoginMessage('Đang đăng nhập...');

    try {
      console.log('Calling login API...');
      const [result] = await Promise.all([
        apiService.login(email.trim(), password),
        delay(800)
      ]);

      console.log('Login API response:', result);
      
      setLoginStatus('success');
      setLoginMessage('Chúc bạn mua sắm vui vẻ');

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      // Compatibility for other routes and components
      localStorage.setItem('fuzzy_token', result.token);
      localStorage.setItem('fuzzy_app_unlocked', 'true');

      setUser({
        ...result.user,
        isLoggedIn: true
      });

      await delay(1200);
      setIsLoginModalOpen(false);

      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginStatus('error');
      
      let errMsg = 'Sai tài khoản hoặc mật khẩu, vui lòng thử lại';
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('Failed to connect') || err.message.includes('NetworkError'))) {
        errMsg = 'Không thể kết nối máy chủ, vui lòng thử lại';
      } else if (err.message) {
        errMsg = err.message;
      }
      
      setLoginMessage(errMsg);
      setError(errMsg);

      await delay(1500);
      setIsLoginModalOpen(false);
    }
  };

  return (
    <>
      <style>{`
        .login-status-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInOverlay 0.3s ease;
        }

        .login-status-modal {
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 24px;
          width: 90%;
          max-width: 320px;
          text-align: center;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          animation: zoomInModal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .login-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #f1f5f9;
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          animation: loginSpin 0.8s linear infinite;
        }

        .login-status-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 28px;
          font-weight: bold;
        }

        .login-status-icon.success {
          background-color: #ecfdf5;
          color: #10b981;
          animation: scaleUpIcon 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .login-status-icon.error {
          background-color: #fee2e2;
          color: #ef4444;
          animation: shakeIcon 0.4s ease-in-out;
        }

        .login-status-message {
          font-size: 14.5px;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          line-height: 1.5;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomInModal {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes loginSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scaleUpIcon {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes shakeIcon {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
        }
      `}</style>

      {isLoginModalOpen && (
        <div className="login-status-overlay">
          <div className="login-status-modal">
            {loginStatus === 'loading' && <div className="login-spinner"></div>}
            {loginStatus === 'success' && <div className="login-status-icon success">✓</div>}
            {loginStatus === 'error' && <div className="login-status-icon error">✕</div>}
            <p className="login-status-message">{loginMessage}</p>
          </div>
        </div>
      )}

      {/* login section start */}
      <div className="auth-img">
        <img className="img-fluid auth-bg" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content">
          <div>
            <h2>Hello Again!</h2>
            <h4 className="p-0">Welcome back, You have been missed!</h4>
          </div>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="custom-container">
          <div className="form-group">
            <label htmlFor="inputusername" className="form-label">Username / Email</label>
            <div className="form-input mb-4" style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-control" 
                id="inputusername" 
                placeholder="Enter Your Username or Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoginModalOpen}
              />
              <Iconsax icon="mail" className="icons" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="form-input" style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                id="inputPassword" 
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoginModalOpen}
                style={{ paddingRight: '75px' }}
              />
              <Iconsax icon="key" className="icons" style={{ right: '15px' }} />
              <button
                type="button"
                className="border-0 bg-transparent position-absolute"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoginModalOpen}
                style={{ right: '45px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer', color: '#cbd5e1' }}
              >
                <Iconsax icon={showPassword ? "eye-slash" : "eye"} style={{ fontSize: '18px' }} />
              </button>
            </div>
          </div>

          <div className="option mt-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" defaultChecked />
              <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
            </div>
            <a className="forgot" href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
          </div>

          {error && (
            <div className="text-danger mt-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>
              ⚠️ {error}
            </div>
          )}

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100" disabled={isLoginModalOpen}>
              {isLoginModalOpen && loginStatus === 'loading' ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem' }}></span>
                  Đang xác thực...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="division">
            <span>OR</span>
          </div>

          <ul className="social-media">
            <li>
              <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/facebook.svg" alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.google.co.in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/google.svg" alt="google" />
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/in/" target="_blank" rel="noreferrer">
                <img className="img-fluid icons" src="/assets/images/svg/apple.svg" alt="apple" />
              </a>
            </li>
          </ul>

          <h4 className="signup">Don’t have an account ?<Link to="/register"> Sign up</Link></h4>

          {/* Ghi chú tài khoản Demo dưới chân trang */}
          <div className="mt-4 p-2 rounded text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="m-0" style={{ fontSize: '11px', color: '#94a3b8' }}>
              User: <span style={{ color: '#f8fafc', fontWeight: '600' }}>trungngo1903206</span> / <span style={{ color: '#f8fafc', fontWeight: '600' }}>trunglove123</span>
            </p>
            <p className="m-0" style={{ fontSize: '11px', color: '#94a3b8' }}>
              Admin: <span style={{ color: '#f8fafc', fontWeight: '600' }}>admin</span> / <span style={{ color: '#f8fafc', fontWeight: '600' }}>admin123</span>
            </p>
          </div>
        </div>
      </form>
      {/* login section end */}
    </>
  );
}
