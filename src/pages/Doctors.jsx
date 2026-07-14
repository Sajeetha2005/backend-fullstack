import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Doctors() {
  const { user } = useAuth();
  const doctorsList = [
    { id: 'Dr. Asha Kumar', name: 'Dr. Asha Kumar', title: 'MBBS, MD • General Physician', text: 'Senior physician with expertise in preventive care, wellness, and long-term treatment planning.' },
    { id: 'Dr. Rahul Menon', name: 'Dr. Rahul Menon', title: 'MBBS, DM • Cardiologist', text: 'Cardiologist focused on heart health, diagnosis, and patient guidance for better outcomes.' },
    { id: 'Dr. Priya Nair', name: 'Dr. Priya Nair', title: 'MBBS, DCH • Pediatric Specialist', text: 'Pediatric specialist committed to creating a reassuring and effective experience for children and families.' },
    { id: 'Dr. Samuel George', name: 'Dr. Samuel George', title: 'MS • Surgeon', text: 'Surgeon known for careful treatment planning, strong communication, and patient safety.' }
  ];

  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    time: '',
    doctor: '',
    reason: '',
    agree: false
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const openBookingModal = (doctorName) => {
    setBookingDoctor(doctorName);
    setFormData(prev => ({
      ...prev,
      name: user ? user.fullname : '',
      doctor: doctorName
    }));
    setStatusMessage('');
    setIsSuccess(false);
  };

  const closeBookingModal = () => {
    setBookingDoctor(null);
    setFormData({
      name: '',
      age: '',
      date: '',
      time: '',
      doctor: '',
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.date || !formData.time || !formData.reason || !formData.agree) {
      setStatusMessage('Please fill out all required fields and accept the terms.');
      setIsSuccess(false);
      return;
    }

    // Save appointment request to LocalStorage
    try {
      const existingAppointments = JSON.parse(localStorage.getItem('curanovaAppointments') || '[]');
      const newAppointment = {
        id: Date.now().toString(),
        patientName: formData.name,
        patientAge: formData.age,
        date: formData.date,
        time: formData.time,
        doctor: formData.doctor,
        reason: formData.reason,
        userEmail: user ? user.email : 'guest@example.com',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      existingAppointments.push(newAppointment);
      localStorage.setItem('curanovaAppointments', JSON.stringify(existingAppointments));
      
      setIsSuccess(true);
      setStatusMessage('Appointment request received. Our team will contact you shortly.');
      
      // Auto-close after 2.5 seconds
      setTimeout(() => {
        closeBookingModal();
      }, 2500);
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
            <div key={doc.id} className="doctor-card">
              <div className="doctor-name">{doc.name}</div>
              <div className="doctor-title">{doc.title}</div>
              <p className="hero-text-simple">{doc.text}</p>
              <button 
                className="book-btn" 
                onClick={() => openBookingModal(doc.name)}
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
                  <label htmlFor="date">Date</label>
                  <input id="date" type="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="time">Time</label>
                  <input id="time" type="time" value={formData.time} onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="doctor">Doctor</label>
                  <select id="doctor" value={formData.doctor} onChange={handleInputChange}>
                    <option value="Dr. Asha Kumar">Dr. Asha Kumar</option>
                    <option value="Dr. Rahul Menon">Dr. Rahul Menon</option>
                    <option value="Dr. Priya Nair">Dr. Priya Nair</option>
                    <option value="Dr. Samuel George">Dr. Samuel George</option>
                  </select>
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
