import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

export default function Doctors() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await api.getDoctors();
      setDoctorsList(data);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    date: '',
    time: '',
    doctorId: '',
    reason: '',
    agree: false
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const openBookingModal = (doc) => {
    if (!user) {
      alert("Please login to book an appointment.");
      navigate('/login');
      return;
    }
    setBookingDoctor(doc);
    setFormData(prev => ({
      ...prev,
      name: user ? (user.name || '') : '',
      phone: user ? (user.phone || '') : '',
      doctorId: doc._id
    }));
    setStatusMessage('');
    setIsSuccess(false);
  };

  const closeBookingModal = () => {
    setBookingDoctor(null);
    setFormData({
      name: '',
      age: '',
      phone: '',
      date: '',
      time: '',
      doctorId: '',
      reason: '',
      agree: false
    });
    setStatusMessage('');
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.phone || !formData.date || !formData.time || !formData.reason || !formData.agree) {
      setStatusMessage('Please fill out all required fields and accept the terms.');
      setIsSuccess(false);
      return;
    }

    // Save appointment request using api
    try {
      const appointmentData = {
        patientName: formData.name,
        patientAge: formData.age,
        patientPhone: formData.phone,
        date: formData.date, // Note: the backend accepts appointmentDate, wait let's check what api.createAppointment does
        time: formData.time, // Same here
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        doctorId: formData.doctorId,
        reason: formData.reason,
      };

      const result = await api.createAppointment(appointmentData);

      if (result.success) {
        setIsSuccess(true);
        setStatusMessage('Appointment request received. Our team will contact you shortly.');
        
        // Auto-close after 2.5 seconds
        setTimeout(() => {
          closeBookingModal();
        }, 2500);
      } else {
        setStatusMessage(result.message || 'Failed to submit request. Please try again.');
        setIsSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to submit request. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="site-shell text-start">
      <section className="hero-section">
        <div>
          <p className="tag">Our medical team</p>
          <h1 className="hero-title">Experienced doctors supporting reliable care.</h1>
          <p className="hero-text">Meet the professionals guiding every step of hospital service and patient care.</p>
        </div>
        <div className="hero-card">
          <h3>Care approach</h3>
          <ul className="list">
            <li>Patient-centered consultations</li>
            <li>Clear treatment planning</li>
            <li>Follow-up support</li>
            <li>Trusted specialist care</li>
          </ul>
        </div>
      </section>

      <main className="page-section">
        <h2 className="section-title">Our Doctors</h2>
        <p className="section-copy">CuraNova is supported by a team of dedicated doctors who bring experience, compassion, and professionalism to every patient interaction.</p>
        
        <div className="grid-2">
          {doctorsList.map((doc) => (
            <div key={doc._id} className="doctor-card">
              <div className="doctor-name">{doc.name}</div>
              <div className="doctor-title">{doc.specialization}</div>
              <p className="hero-text-simple">Experience: {doc.experience}</p>
              <button 
                className="book-btn" 
                onClick={() => openBookingModal(doc)}
                style={{ width: 'fit-content', marginTop: 'auto' }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Appointment booking React modal overlay */}
      {bookingDoctor && (
        <div className="modal-overlay">
          <div className="modal-backdrop" onClick={closeBookingModal}></div>
          <div className="modal-card">
            <button className="modal-close" onClick={closeBookingModal}>✕</button>
            <h3>Book Appointment</h3>
            <p className="section-copy">Please share a few details so we can prepare your visit.</p>
            
            {statusMessage && (
              <div className="form-status" style={{ 
                color: isSuccess ? '#0f766e' : '#b42318', 
                backgroundColor: isSuccess ? '#e6f7fa' : '#fef2f2',
                border: `1px solid ${isSuccess ? '#2bb3c0' : '#fecaca'}`
              }}>
                {statusMessage}
              </div>
            )}

            {!isSuccess && (
              <form className="form-grid" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="age">Age</label>
                  <input id="age" type="number" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input id="date" type="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input id="time" type="time" value={formData.time} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="doctorId">Doctor</label>
                  <input id="doctorId" type="text" value={bookingDoctor?.name || ''} readOnly style={{ backgroundColor: '#f9fafb', color: '#61717a' }} />
                </div>
                <div>
                  <label htmlFor="reason">Reason for appointment</label>
                  <textarea id="reason" value={formData.reason} onChange={handleInputChange} required></textarea>
                </div>
                <div className="consent-item">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    checked={formData.agree} 
                    onChange={handleInputChange} 
                    required 
                  />
                  <label htmlFor="agree" style={{ fontSize: '0.9rem', fontWeight: '500', display: 'inline', margin: 0 }}>
                    I agree to the terms and conditions and understand the appointment request will be reviewed.
                  </label>
                </div>
                <button className="form-submit" type="submit">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
