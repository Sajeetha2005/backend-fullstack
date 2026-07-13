import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage('Please enter your email.');
      setIsSuccess(false);
      return;
    }

    const result = forgotPassword(email);
    setStatusMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="auth-card">
        <p className="tag">Password help</p>
        <h1 className="hero-title">Reset your CuraNova password.</h1>
        <p className="hero-text">Enter your email and we will guide you through the recovery steps.</p>
        
        {statusMessage && (
          <div className="form-status" style={{ 
            color: isSuccess ? '#0f766e' : '#b42318', 
            backgroundColor: isSuccess ? '#e6f7fa' : '#fef2f2',
            border: `1px solid ${isSuccess ? '#2bb3c0' : '#fecaca'}`
          }}>
            {statusMessage}
          </div>
        )}

        <form id="forgotPasswordForm" className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="forgot-email">Email</label>
            <input 
              type="email" 
              id="forgot-email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button className="auth-btn" type="submit" style={{ width: 'fit-content' }}>
            Submit
          </button>
        </form>

        <p className="mt-3 mb-0">
          Back to <Link to="/login" style={{ fontWeight: '600' }}>Login</Link>
        </p>
      </section>
    </div>
  );
}
