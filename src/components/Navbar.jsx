import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <nav className="navbar">
        <Link to="/" className="logo-wrap">
          <img src="/logo.png" alt="CuraNova logo" className="logo-mark" />
          <div>
            <div className="logo-text" style={{ fontSize: '1.25rem', lineHeight: '1.2' }}>
              Cura<span>Nova</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#61717a', fontWeight: '500' }}>
              Healthcare services
            </div>
          </div>
        </Link>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" className={({ isActive }) => isActive ? 'active' : ''}>
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className={({ isActive }) => isActive ? 'active' : ''}>
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>
              FAQ
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="btn btn-sm text-white py-1 px-3" style={{ fontSize: '0.85rem' }}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}

          {user && user.role === 'user' && (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-button-link">
                  Logout
                </button>
              </li>
            </>
          )}

          {user && user.role === 'doctor' && (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/appointments" className={({ isActive }) => isActive ? 'active' : ''}>
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-button-link">
                  Logout
                </button>
              </li>
            </>
          )}

          {user && user.role === 'admin' && (
            <>
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-button-link">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
