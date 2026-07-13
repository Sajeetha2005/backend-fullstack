import React from 'react';

export default function Terms() {
  return (
    <div className="site-shell text-start">
      <section className="policy-card">
        <p className="tag">Policies</p>
        <h1 className="hero-title" style={{ marginTop: '0px' }}>Terms and Conditions</h1>
        <p className="hero-text">These terms explain how users and healthcare teams can responsibly use CuraNova.</p>
        <p className="section-copy">By using CuraNova, users agree to provide accurate information, use the platform responsibly, and respect hospital policies.</p>
        <p className="section-copy">All appointments and medical services remain subject to availability, hospital guidelines, and operational requirements.</p>
        <h3>Important Notes</h3>
        <ul className="list">
          <li style={{ marginBottom: '8px' }}>Users must keep account details accurate and secure.</li>
          <li style={{ marginBottom: '8px' }}>Hospital services are subject to availability and scheduling rules.</li>
          <li style={{ marginBottom: '8px' }}>Any misuse of the platform may result in restricted access.</li>
        </ul>
      </section>
    </div>
  );
}
