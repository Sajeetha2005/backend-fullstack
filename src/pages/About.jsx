import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container-hero text-start">
      <header className="py-5 text-center">
        <div className="badge rounded-pill badge-accent px-3 py-2 mb-3">Trusted hospital coordination</div>
        <h1 className="hero-title">Healthcare operations made clear and connected.</h1>
        <p className="hero-text-simple mx-auto">CuraNova delivers a clean, modern platform for clinics and hospitals to manage patient workflows, appointments, and care communications.</p>
      </header>

      <div className="row gx-4 gy-4">
        <div className="col-lg-6">
          <div className="card hero-card mission-panel p-4 h-100">
            <div className="mission-pill">Empowering faster, safer hospital care</div>
            <h3 className="mission-title">Our mission</h3>
            <p className="hero-text-simple mission-copy">To create an intuitive healthcare platform that empowers clinicians, supports patients, and reduces the friction of daily hospital operations.</p>
            <ul className="mission-list mt-4">
              <li>Streamline appointment workflows so patients move faster from booking to care.</li>
              <li>Keep clinical teams connected with reliable patient updates and status tracking.</li>
              <li>Reduce administrative delays by centralizing workflows in one smart system.</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card hero-card values-panel p-4 bg-accent-soft h-100">
            <div className="values-header">
              <span className="value-chip">Our values</span>
              <p className="values-subtitle">Built around people, clarity, and patient trust.</p>
            </div>
            <ul className="values-list mt-3">
              <li><strong>Empathy:</strong> every feature is designed around people, not processes.</li>
              <li><strong>Clarity:</strong> information is easy to find, share, and act upon.</li>
              <li><strong>Trust:</strong> secure management of appointments and patient data.</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-4 card-spotlight mission-highlights">
        <h4>Designed for measurable impact</h4>
        <p className="hero-text-simple mb-0">CuraNova helps hospitals reduce wait times, improve staff coordination, and give patients clearer, more humane care experiences.</p>
      </section>

      <section className="mt-5">
        <h3>Why it matters</h3>
        <p className="hero-text-simple">When hospitals operate smoothly, patients feel more confident, staff work more effectively, and care teams can focus on better outcomes.</p>
      </section>

      {/* How it works / Timeline */}
      <section className="mt-5">
        <h3 className="section-title">How CuraNova works</h3>
        <div className="row how-grid g-3 mt-3">
          <div className="col-md-4">
            <div className="step-card p-4 h-100">
              <div className="value-pill">1</div>
              <h5 className="mt-2">Request</h5>
              <p className="hero-text-simple mb-0">Patients request appointments quickly using clear forms and suggested time slots.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-card p-4 h-100">
              <div className="value-pill">2</div>
              <h5 className="mt-2">Schedule</h5>
              <p className="hero-text-simple mb-0">The platform matches requests to available clinicians and confirms bookings instantly.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-card p-4 h-100">
              <div className="value-pill">3</div>
              <h5 className="mt-2">Follow-up</h5>
              <p className="hero-text-simple mb-0">Care teams track visits and follow-ups so no patient detail gets lost between visits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="mt-5">
        <h3 className="section-title">Meet the team</h3>
        <p className="section-copy">A small dedicated team of engineers and clinicians building practical tools for hospitals.</p>
        <div className="team-grid mt-3">
          <div className="team-card">
            <img src="/logo.png" alt="Dr Asha" className="team-avatar" />
            <h5 className="mt-3">Dr. Asha Kumar</h5>
            <small className="text-muted d-block" style={{ fontWeight: '600' }}>MBBS, MD — General Physician</small>
            <p className="mt-2 hero-text-simple mb-0" style={{ fontSize: '0.9rem' }}>Focuses on delivering patient-centered workflows and clinical validation.</p>
          </div>
          <div className="team-card">
            <img src="/logo.png" alt="Dr Rahul" className="team-avatar" />
            <h5 className="mt-3">Dr. Rahul Menon</h5>
            <small className="text-muted d-block" style={{ fontWeight: '600' }}>MBBS, DM — Cardiology</small>
            <p className="mt-2 hero-text-simple mb-0" style={{ fontSize: '0.9rem' }}>Guides cardiology workflows and ensures clinical safety in scheduling.</p>
          </div>
          <div className="team-card">
            <img src="/logo.png" alt="Priya" className="team-avatar" />
            <h5 className="mt-3">Priya Nair</h5>
            <small className="text-muted d-block" style={{ fontWeight: '600' }}>Product Lead</small>
            <p className="mt-2 hero-text-simple mb-0" style={{ fontSize: '0.9rem' }}>Designs simple, usable interfaces for busy hospital staff.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-5 text-center">
        <div className="p-5 rounded-4 bg-accent-soft d-inline-block w-100">
          <h4 className="mb-2" style={{ color: 'var(--primary-dark)', fontWeight: '700' }}>Ready to streamline your hospital?</h4>
          <p className="hero-text-simple mb-3 mx-auto">Contact us for a demo and a quick setup plan tailored to your hospital.</p>
          <Link to="/contact" className="btn btn-primary btn-lg text-white">Request a demo</Link>
        </div>
      </section>
    </div>
  );
}
