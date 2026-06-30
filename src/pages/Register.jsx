import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (emailStr) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Vui lòng nhập họ tên của bạn');
      return;
    }

    if (!validateEmail(email)) {
      setError('Vui lòng nhập Email đúng định dạng (vd: user@example.com)');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải chứa ít nhất 6 ký tự');
      return;
    }

    try {
      if (registerUser) {
        await registerUser(name, email, password);
      }
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại');
    }
  };

  return (
    <>
      {/* register section start */}
      <div className="auth-img">
        <img className="img-fluid auth-bg" src="/assets/images/background/auth_bg.jpg" alt="auth_bg" />
        <div className="auth-content">
          <div>
            <h2>Create Account</h2>
            <h4 className="p-0">Sign up to get started!</h4>
          </div>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="custom-container">
          {error && (
            <div className="alert alert-danger p-2 mb-3 text-center" style={{ fontSize: '14px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="inputName" className="form-label">Full Name</label>
            <div className="form-input mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="inputName" 
                placeholder="Enter Your Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Iconsax className="icons" icon="user" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail" className="form-label">Email id</label>
            <div className="form-input mb-3">
              <input 
                type="email" 
                className="form-control" 
                id="inputEmail" 
                placeholder="Enter Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Iconsax className="icons" icon="mail" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <div className="form-input position-relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-control pe-5" 
                id="inputPassword" 
                placeholder="Enter Your Password (min 6 chars)" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-3 text-secondary p-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 10, cursor: 'pointer' }}
              >
                <Iconsax icon={showPassword ? "eye-slash" : "eye"} />
              </button>
            </div>
          </div>

          <div className="submit-btn mt-4">
            <button type="submit" className="btn auth-btn w-100 border-0">Sign Up</button>
          </div>

          <h4 className="signup mt-4">Already have an account ? <Link to="/login">Sign in</Link></h4>
        </div>
      </form>
      {/* register section end */}
    </>
  );
}
