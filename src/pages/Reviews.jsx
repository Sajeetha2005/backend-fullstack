import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const DEFAULT_REVIEWS = [
  { stars: '★★★★★', title: '“Very supportive experience”', text: 'The staff was very supportive and the appointment process was smooth from start to finish.', author: 'Anjali P.' },
  { stars: '★★★★★', title: '“Professional and well organized”', text: 'The doctors were professional, friendly, and the hospital services felt very well organized.', author: 'Rohan S.' },
  { stars: '★★★★☆', title: '“Clear communication”', text: 'I appreciated the clear communication and quick support during my visit.', author: 'Meera K.' },
  { stars: '★★★★★', title: '“Quick booking and follow-up”', text: 'The booking process was fast, and the follow-up details were easy to access.', author: 'Sahil T.' }
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Form states for adding new reviews
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState('5');
  const [formStatus, setFormStatus] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Load reviews from DB + default reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const dbReviews = await api.getReviews();
        setReviews([...DEFAULT_REVIEWS, ...dbReviews]);
      } catch (e) {
        console.error(e);
        setReviews(DEFAULT_REVIEWS);
      }
    };
    fetchReviews();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const selectReview = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newText) {
      setFormStatus('Please fill in all details.');
      setFormSuccess(false);
      return;
    }

    const ratingStars = '★'.repeat(Number(newRating)) + '☆'.repeat(5 - Number(newRating));

    try {
      const result = await api.submitReview({
        author: newAuthor.trim(),
        title: `“${newTitle.trim()}”`,
        text: newText.trim(),
        stars: ratingStars
      });
      
      if (result.success) {
        const updatedAll = [...reviews, result.review];
        setReviews(updatedAll);
        
        // Jump to the newly added review
        setCurrentIndex(updatedAll.length - 1);
        
        setNewAuthor('');
        setNewTitle('');
        setNewText('');
        setNewRating('5');
        setFormSuccess(true);
        setFormStatus('Thank you! Your review has been added successfully.');
      } else {
        setFormStatus('Something went wrong. Please try again.');
        setFormSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setFormStatus('Something went wrong. Please try again.');
      setFormSuccess(false);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="hero-section">
        <div>
          <p className="tag">Patient stories</p>
          <h1 className="hero-title">Trusted by patients and healthcare teams alike.</h1>
          <p className="hero-text">Here are some of the experiences shared by visitors who used CuraNova for a smoother hospital journey.</p>
        </div>
        <div className="hero-card">
          <h3>What patients value most</h3>
          <ul className="list">
            <li>Friendly and responsive staff</li>
            <li>Clear appointment handling</li>
            <li>Organized medical support and follow-up</li>
          </ul>
        </div>
      </section>

      <main className="page-section">
        <h2 className="section-title">Patient Testimonials</h2>
        <p className="section-copy">Read feedback from our patients or add your own review below.</p>

        {reviews.length > 0 && (
          <div 
            className="review-carousel mt-4" 
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            style={{ 
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--border)',
              padding: '40px 48px',
              minHeight: '260px',
              position: 'relative'
            }}
          >
            {/* Quote Icon for style */}
            <div style={{ 
              position: 'absolute', 
              top: '20px', 
              left: '24px', 
              fontSize: '4.5rem', 
              lineHeight: 1, 
              color: 'rgba(43, 179, 192, 0.15)',
              fontFamily: 'Georgia, serif',
              userSelect: 'none'
            }}>
              “
            </div>

            {/* Slider track wrapper */}
            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div 
                className="review-track-react" 
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  display: 'flex',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {reviews.map((rev, index) => (
                  <div 
                    key={index} 
                    className="carousel-slide text-start"
                    style={{
                      opacity: currentIndex === index ? 1 : 0.3,
                      transition: 'opacity 0.5s ease-in-out',
                      padding: '0px 10px'
                    }}
                  >
                    <div className="stars" style={{ fontSize: '1.25rem' }}>{rev.stars}</div>
                    <h3 style={{ 
                      fontSize: '1.45rem', 
                      fontWeight: '800', 
                      color: 'var(--primary-dark)', 
                      margin: '10px 0 12px' 
                    }}>
                      {rev.title}
                    </h3>
                    <p className="hero-text-simple" style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                      "{rev.text}"
                    </p>
                    <p className="mt-3 mb-0" style={{ fontWeight: '700', color: 'var(--primary)' }}>
                      — {rev.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '32px',
              borderTop: '1px solid var(--border)',
              paddingTop: '20px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {reviews.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => selectReview(idx)} 
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: currentIndex === idx ? 'var(--primary)' : '#dbe9ec',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      padding: 0
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handlePrev} 
                  className="carousel-btn"
                  style={{ width: '40px', height: '40px' }}
                >
                  ‹
                </button>
                <button 
                  onClick={handleNext} 
                  className="carousel-btn"
                  style={{ width: '40px', height: '40px' }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Submit review form */}
      <section className="page-section" style={{ marginTop: '24px' }}>
        <h3 className="section-title">Submit Your Feedback</h3>
        <p className="section-copy">Help us improve by sharing your experience with CuraNova healthcare services.</p>
        
        {formStatus && (
          <div className="form-status" style={{ 
            color: formSuccess ? '#0f766e' : '#b42318', 
            backgroundColor: formSuccess ? '#e6f7fa' : '#fef2f2',
            border: `1px solid ${formSuccess ? '#2bb3c0' : '#fecaca'}`
          }}>
            {formStatus}
          </div>
        )}

        <form onSubmit={handleSubmitReview} className="form-grid">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="newAuthor">Your Name</label>
              <input 
                type="text" 
                id="newAuthor" 
                value={newAuthor} 
                onChange={(e) => setNewAuthor(e.target.value)} 
                placeholder="e.g. John Doe"
                required 
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="newTitle">Headline</label>
              <input 
                type="text" 
                id="newTitle" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                placeholder="e.g. Great experience!" 
                required 
              />
            </div>
          </div>
          
          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <label htmlFor="newRating">Rating</label>
              <select 
                id="newRating" 
                value={newRating} 
                onChange={(e) => setNewRating(e.target.value)}
              >
                <option value="5">5 Stars (Excellent)</option>
                <option value="4">4 Stars (Good)</option>
                <option value="3">3 Stars (Average)</option>
                <option value="2">2 Stars (Poor)</option>
                <option value="1">1 Star (Very Poor)</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="newText">Your Review</label>
            <textarea 
              id="newText" 
              value={newText} 
              onChange={(e) => setNewText(e.target.value)} 
              placeholder="Tell us what you liked or how we can improve..."
              rows="4" 
              required 
            ></textarea>
          </div>

          <button className="auth-btn mt-3" type="submit" style={{ width: 'fit-content' }}>
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
}
