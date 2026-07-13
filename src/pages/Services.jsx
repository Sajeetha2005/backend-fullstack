import React from 'react';

export default function Services() {
  const services = [
    { title: 'Emergency Care', text: 'Fast support for urgent medical cases, with better coordination and quicker response handling.' },
    { title: 'General Medicine', text: 'Routine consultations, diagnosis, and treatment planning for common health concerns.' },
    { title: 'Pediatrics', text: 'Dedicated care for children with gentle, specialized support for growing patients.' },
    { title: 'Diagnostics', text: 'Laboratory tests, imaging support, and medical analysis to guide accurate treatment decisions.' },
    { title: 'Surgery', text: 'Care for planned and emergency surgical procedures with organized scheduling and coordination.' },
    { title: 'Patient Follow-Up', text: 'Post-treatment guidance, appointment reminders, and ongoing communication for smoother recovery.' }
  ];

  return (
    <div className="site-shell text-start">
      <section className="hero-section">
        <div>
          <p className="tag">Our services</p>
          <h1 className="hero-title">Comprehensive care support for modern hospitals.</h1>
          <p className="hero-text">CuraNova brings essential healthcare services together in one organized and easy-to-manage system.</p>
        </div>
        <div className="hero-card">
          <h3>Service highlights</h3>
          <ul className="list">
            <li>Fast emergency coordination</li>
            <li>Specialist follow-up support</li>
            <li>Easy appointment planning</li>
            <li>Secure patient communication</li>
          </ul>
        </div>
      </section>

      <main className="page-section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-copy">CuraNova helps hospitals organize and deliver a wide range of services in a structured and accessible way. Every service is designed to improve care delivery and support patient comfort.</p>
        <div className="grid-3">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '10px' }}>
                {service.title}
              </h3>
              <p className="hero-text-simple mb-0">{service.text}</p>
            </div>
          ))}
        </div>

        <div className="info-card" style={{ marginTop: '18px' }}>
          <h3>Why These Services Matter</h3>
          <p className="section-copy mb-0">A well-managed hospital service system helps patients receive care faster, staff work more efficiently, and departments stay connected without confusion.</p>
        </div>
      </main>
    </div>
  );
}
