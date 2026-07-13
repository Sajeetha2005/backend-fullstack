import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.reason) {
      setStatusMessage('All fields are required.');
      setIsSuccess(false);
      return;
    }

    try {
      const messages = JSON.parse(localStorage.getItem('curanovaMessages') || '[]');
      messages.push({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        reason: formData.reason.trim(),
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('curanovaMessages', JSON.stringify(messages));
      
      setIsSuccess(true);
      setStatusMessage('Thanks for reaching out. Our team will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: ''
      });
    } catch (err) {
      console.error(err);
      setStatusMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="hero-section">
        <div>
          <p className="tag">Contact us</p>
          <h1 className="hero-title">Reach out for appointments, support, or information.</h1>
          <p className="hero-text">We are ready to help you with questions about the platform and hospital services.</p>
        </div>
        <div className="hero-card">
          <h3>Our contact details</h3>
          <ul className="list" style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li style={{ marginBottom: '8px' }}><strong>Phone:</strong> +91 82482 31872</li>
            <li style={{ marginBottom: '8px' }}><strong>Email:</strong> sajuraja0022@gmail.com</li>
            <li style={{ marginBottom: '8px' }}><strong>Address:</strong> Pothumbu, Madurai</li>
          </ul>
        </div>
      </section>

      <main className="page-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-copy">We are happy to help with appointments, support, or general questions about CuraNova.</p>
        
        {statusMessage && (
          <div className="form-status" style={{ 
            color: isSuccess ? '#0f766e' : '#b42318', 
            backgroundColor: isSuccess ? '#e6f7fa' : '#fef2f2',
            border: `1px solid ${isSuccess ? '#2bb3c0' : '#fecaca'}`
          }}>
            {statusMessage}
          </div>
        )}

        <form id="contactForm" className="form-grid" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="reason">Reason for Appointment</label>
            <textarea 
              id="reason" 
              name="reason" 
              rows="4" 
              value={formData.reason} 
              onChange={handleInputChange} 
              required 
            ></textarea>
          </div>
          <button className="auth-btn" type="submit" style={{ width: 'fit-content' }}>
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
