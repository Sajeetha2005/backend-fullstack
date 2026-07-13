import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatusMessage('Please enter both email and password.');
      setIsSuccess(false);
      return;
    }
    if (!agree) {
      setStatusMessage('Please consent to data usage to continue.');
      setIsSuccess(false);
      return;
    }

    const result = login(email, password);
    setStatusMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="auth-card">
        <p className="tag">Secure access</p>
        <h1 className="hero-title">Welcome back to CuraNova.</h1>
        <p className="hero-text">Access your hospital account and manage care services with confidence.</p>
        
        {statusMessage && (
          <div className="form-status" style={{ 
            color: isSuccess ? '#0f766e' : '#b42318', 
            backgroundColor: isSuccess ? '#e6f7fa' : '#fef2f2',
            border: `1px solid ${isSuccess ? '#2bb3c0' : '#fecaca'}`
          }}>
            {statusMessage}
          </div>
        )}

        <form id="loginForm" className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <div className="consent-box">
            <div className="consent-item">
              <input 
                type="checkbox" 
                id="allowConsent" 
                checked={agree} 
                onChange={(e) => setAgree(e.target.checked)} 
                required 
              />
              <label htmlFor="allowConsent" style={{ display: 'inline', fontWeight: '500', fontSize: '0.9rem', margin: 0 }}>
                I consent to the use of my login data for secure account access and service support.
              </label>
            </div>
            <p className="helper-text mb-0">By continuing, you agree to our terms and privacy practices.</p>
          </div>
          
          <button className="auth-btn" type="submit" style={{ width: 'fit-content' }}>
            Login
          </button>
        </form>
        
        <p className="mt-3 mb-1">
          <Link to="/forgot-password" style={{ fontWeight: '600' }}>Forgot Password?</Link>
        </p>
        <p className="mb-0">
          New user? <Link to="/signup" style={{ fontWeight: '600' }}>Create an account</Link>
        </p>
      </section>
    </div>
  );
}
