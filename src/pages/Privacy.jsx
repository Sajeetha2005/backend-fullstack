import React from 'react';

export default function Privacy() {
  return (
    <div className="site-shell text-start">
      <section className="policy-card">
        <p className="tag">Policies</p>
        <h1 className="hero-title" style={{ marginTop: '0px' }}>Privacy Policy</h1>
        <p className="hero-text">We protect user information and handle personal data with care and transparency.</p>
        <p className="section-copy">CuraNova collects only the information needed to provide services, support appointments, and improve the user experience.</p>
        <p className="section-copy">Personal details are handled responsibly and are not shared with third parties without consent, except where required by law or hospital policy.</p>
        <h3>Our Privacy Promise</h3>
        <ul className="list">
          <li style={{ marginBottom: '8px' }}>Your data is protected with care and respect.</li>
          <li style={{ marginBottom: '8px' }}>We use information only for service support and account access.</li>
          <li style={{ marginBottom: '8px' }}>Users are encouraged to keep their login credentials secure.</li>
        </ul>
      </section>
    </div>
  );
}
