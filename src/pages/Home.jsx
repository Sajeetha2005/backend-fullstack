import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const reviews = [
    { stars: '★★★★★', title: 'Very supportive experience', text: 'The staff was very supportive and the appointment process was smooth from start to finish.', author: 'Anjali P.' },
    { stars: '★★★★★', title: 'Professional and well organized', text: 'The doctors were professional, friendly, and the hospital services felt very well organized.', author: 'Rohan S.' },
    { stars: '★★★★☆', title: 'Clear communication', text: 'I appreciated the clear communication and quick support during my visit.', author: 'Meera K.' },
  ];

  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="container-hero">
      <header className="hero-banner text-center text-lg-start py-5 px-4 rounded-4 mt-2">
        <div className="row align-items-center">
          <div className="col-lg-6 text-start">
            <div className="badge rounded-pill badge-accent px-3 py-2 mb-3">Modern hospital care, simplified</div>
            <h1 className="hero-title" style={{ marginTop: '0px' }}>Transform hospital operations with a polished care platform.</h1>
            <p className="hero-text-simple mb-4">CuraNova organizes appointments, patient flow, and clinical coordination in one elegant dashboard—without complexity.</p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-start">
              <Link className="btn btn-primary btn-lg" to="/services">Explore Services</Link>
              <Link className="btn btn-outline-primary btn-lg" to="/about">Learn More</Link>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0 text-center">
            <div className="hero-illustration p-4 rounded-4">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <span className="feature-pill">24/7 scheduling</span>
                <span className="feature-pill">Secure records</span>
                <span className="feature-pill">Patient tracking</span>
              </div>
              <img src="/logo.png" alt="CuraNova illustration" className="img-fluid mt-4 mx-auto" style={{ maxWidth: '200px' }} />
            </div>
          </div>
        </div>
      </header>

      <section className="mt-5 text-start">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card p-4 h-100">
              <div className="feature-icon mb-3">⏱</div>
              <h5>Smart scheduling</h5>
              <p className="hero-text-simple mb-0">Auto-organized appointments and reliable doctor availability in one view.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card p-4 h-100">
              <div className="feature-icon mb-3">👩‍⚕️</div>
              <h5>Patient-first workflows</h5>
              <p className="hero-text-simple mb-0">Keep every patient history, note, and follow-up clearly connected.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card p-4 h-100">
              <div className="feature-icon mb-3">🔒</div>
              <h5>Trusted privacy</h5>
              <p className="hero-text-simple mb-0">Secure information handling that helps teams move faster with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="row g-4 mt-4 text-start">
        <div className="col-lg-7">
          <div className="card card-spotlight p-4 h-100">
            <h3>Designed for modern care teams</h3>
            <p className="hero-text-simple">A single platform for appointment management, patient communication, and clinical coordination that feels intuitive for every hospital user.</p>
            <ul className="list-group list-group-flush mt-3" style={{ border: 'none' }}>
              <li className="list-group-item bg-transparent" style={{ border: 'none', paddingLeft: 0 }}>✓ Instant booking and schedule control</li>
              <li className="list-group-item bg-transparent" style={{ border: 'none', paddingLeft: 0 }}>✓ Doctor availability and patient flow in one place</li>
              <li className="list-group-item bg-transparent" style={{ border: 'none', paddingLeft: 0 }}>✓ Clear status updates for every appointment</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="stats-card p-4 rounded-4 bg-accent-soft h-100">
            <div className="d-flex justify-content-between align-items-start gap-4 flex-wrap">
              <div>
                <span className="d-block h2 text-accent" style={{ fontWeight: '800' }}>98%</span>
                <small className="text-muted" style={{ fontWeight: '600' }}>Patient satisfaction</small>
              </div>
              <div>
                <span className="d-block h2 text-accent" style={{ fontWeight: '800' }}>12</span>
                <small className="text-muted" style={{ fontWeight: '600' }}>Specialties covered</small>
              </div>
            </div>
            <p className="hero-text-simple mt-4">A trusted choice for modern healthcare teams that need clarity and reliability.</p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <div className="feature-pill m-0">Fast setup</div>
              <div className="feature-pill m-0">Clean dashboard</div>
            </div>
          </div>
        </div>
      </section>

      {/* Polish addition: Testimonials slider on homepage */}
      <section className="mt-5 text-start">
        <h3 className="section-title">Patient Experiences</h3>
        <div className="review-carousel mt-3">
          <div className="review-track-react" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
            {reviews.map((rev, idx) => (
              <div key={idx} className="carousel-slide">
                <div className="stars">{rev.stars}</div>
                <h4 style={{ color: 'var(--primary-dark)', fontWeight: '700' }}>{rev.title}</h4>
                <p className="hero-text-simple" style={{ fontStyle: 'italic' }}>"{rev.text}"</p>
                <p className="mt-2 mb-0" style={{ fontWeight: '700' }}>— {rev.author}</p>
              </div>
            ))}
          </div>
          <div className="carousel-controls">
            {reviews.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveReview(idx)} 
                className="carousel-btn"
                style={{
                  background: activeReview === idx ? 'var(--primary)' : 'var(--accent-soft)',
                  color: activeReview === idx ? 'white' : 'var(--primary-dark)'
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
