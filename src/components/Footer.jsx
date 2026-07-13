import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer mt-5" style={{ padding: '40px 20px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* App Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <img 
              src="/logo.png" 
              alt="CuraNova logo" 
              style={{ 
                width: '46px', 
                height: '46px', 
                borderRadius: '50%', 
                border: '2px solid var(--accent)',
                boxShadow: '0 4px 10px rgba(43, 179, 192, 0.15)'
              }} 
            />
            <span style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', letterSpacing: '0.03em' }}>
              Cura<span style={{ color: 'var(--accent)' }}>Nova</span>
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto', lineHeight: '1.6', textAlign: 'center' }}>
            Modern hospital care, simplified. Organizing appointments, patient workflows, and clinical coordination in one elegant dashboard.
          </p>
        </div>

        {/* Center Grid containing links, policies, and contact */}
        <div className="row g-4 text-center justify-content-center" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 0', marginBottom: '24px' }}>
          
          {/* Quick Links Column */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', letterSpacing: '0.02em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 14px', maxWidth: '280px' }}>
              <Link to="/" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Home</Link>
              <Link to="/about" style={{ fontSize: '0.95rem', fontWeight: '600' }}>About</Link>
              <Link to="/services" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Services</Link>
              <Link to="/doctors" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Doctors</Link>
              <Link to="/reviews" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Reviews</Link>
              <Link to="/contact" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Contact</Link>
              <Link to="/faq" style={{ fontSize: '0.95rem', fontWeight: '600' }}>FAQ</Link>
              <Link to="/login" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Login</Link>
              <Link to="/signup" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Sign Up</Link>
            </div>
          </div>

          {/* Legal / Policies Column */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', letterSpacing: '0.02em' }}>Policies</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/terms" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Terms & Conditions</Link>
              <Link to="/privacy" style={{ fontSize: '0.95rem', fontWeight: '600' }}>Privacy Policy</Link>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <h4 style={{ color: 'var(--primary-dark)', fontSize: '1.1rem', fontWeight: '800', marginBottom: '14px', letterSpacing: '0.02em' }}>Contact Details</h4>
            <div style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p style={{ margin: '4px 0' }}><strong>Phone:</strong> +91 82482 31872</p>
              <p style={{ margin: '4px 0' }}><strong>Email:</strong> sajuraja0022@gmail.com</p>
              <p style={{ margin: '4px 0' }}><strong>Address:</strong> Pothumbu, Madurai</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{ fontSize: '0.88rem', color: 'var(--muted)', textAlign: 'center' }}>
          © 2026 CuraNova. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
