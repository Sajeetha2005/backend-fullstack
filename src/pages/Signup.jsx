import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!fullname || !email || !phone || !password || !confirmPassword) {
      setStatusMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setStatusMessage('Passwords do not match. Please try again.');
      setIsSuccess(false);
      return;
    }

    if (!agree) {
      setStatusMessage('Please accept the privacy policy to continue.');
      setIsSuccess(false);
      return;
    }

    const result = signup(fullname, email, phone, password);
    setStatusMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="auth-card">
        <p className="tag">Create account</p>
        <h1 className="hero-title">Join CuraNova and simplify hospital access.</h1>
        <p className="hero-text">Sign up to explore services, appointments, and support with a secure account.</p>
        
        {statusMessage && (
          <div className="form-status" style={{ 
            color: isSuccess ? '#0f766e' : '#b42318', 
            backgroundColor: isSuccess ? '#e6f7fa' : '#fef2f2',
            border: `1px solid ${isSuccess ? '#2bb3c0' : '#fecaca'}`
          }}>
            {statusMessage}
          </div>
        )}

        <form id="signupForm" className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input 
              type="text" 
              id="fullname" 
              value={fullname} 
              onChange={(e) => setFullname(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="signup-email">Email</label>
            <input 
              type="email" 
              id="signup-email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="signup-password">Password</label>
            <input 
              type="password" 
              id="signup-password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          
          <div className="consent-box">
            <div className="consent-item">
              <input 
                type="checkbox" 
                id="privacyConsent" 
                checked={agree} 
                onChange={(e) => setAgree(e.target.checked)} 
                required 
              />
              <label htmlFor="privacyConsent" style={{ display: 'inline', fontWeight: '500', fontSize: '0.9rem', margin: 0 }}>
                I agree to the privacy policy and understand that my details will be used to manage my account.
              </label>
            </div>
          </div>
          
          <button className="auth-btn" type="submit" style={{ width: 'fit-content' }}>
            Sign Up
          </button>
        </form>
        
        <p className="mt-3 mb-0">
          Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Login</Link>
        </p>
      </section>
    </div>
  );
}
