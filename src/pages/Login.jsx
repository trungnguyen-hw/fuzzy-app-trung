import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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
    const token = localStorage.getItem('fuzzy_token');
    const isLoggedIn = user?.isLoggedIn || token;
    
    if (isUnlocked && isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

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

    try {
      // Check if it's the gate login credentials
      if (email.trim() === 'trungngo1903206' && password === 'trunglove123') {
        localStorage.setItem('fuzzy_app_unlocked', 'true');
        // Automaticaly log them in as a default user (Agasya) so they have an active session inside the app
        await login('agasya@fuzzy.com', '123456');
        navigate('/');
        return;
      }

      // Check normal store logins
      const res = await login(email.trim(), password);
      // Unlock the gate too
      localStorage.setItem('fuzzy_app_unlocked', 'true');

      if (res.user?.role === 'admin' || email.trim() === 'trungngo1903') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <>
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
            <label htmlFor="inputusername" className="form-label">Email id</label>
            <div className="form-input mb-4" style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="form-control" 
                id="inputusername" 
                placeholder="Enter Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                style={{ paddingRight: '75px' }}
              />
              <Iconsax icon="key" className="icons" style={{ right: '15px' }} />
              <button
                type="button"
                className="border-0 bg-transparent position-absolute"
                onClick={() => setShowPassword(!showPassword)}
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
            <button type="submit" className="btn auth-btn w-100">Sign In</button>
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
              Gate: <span style={{ color: '#f8fafc', fontWeight: '600' }}>trungngo1903206</span> / <span style={{ color: '#f8fafc', fontWeight: '600' }}>trunglove123</span>
            </p>
            <p className="m-0" style={{ fontSize: '11px', color: '#94a3b8' }}>
              User: <span style={{ color: '#f8fafc', fontWeight: '600' }}>agasya@fuzzy.com</span> / <span style={{ color: '#f8fafc', fontWeight: '600' }}>123456</span>
            </p>
            <p className="m-0" style={{ fontSize: '11px', color: '#94a3b8' }}>
              Admin: <span style={{ color: '#f8fafc', fontWeight: '600' }}>trungngo1903</span> / <span style={{ color: '#f8fafc', fontWeight: '600' }}>trunglove123</span>
            </p>
          </div>
        </div>
      </form>
      {/* login section end */}
    </>
  );
}
