import React, { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: 'How do I book an appointment?',
      a: 'Visit the Doctors page, click "Book Appointment" on a doctor\'s card, fill the form and submit. You can close the form with the X button or by clicking outside.'
    },
    {
      q: 'Can I change or cancel my appointment?',
      a: 'Yes — contact the hospital support email or use the contact form to request a change. Appointment changes may be subject to hospital scheduling rules.'
    },
    {
      q: 'Is my personal information secure?',
      a: 'CuraNova follows strong privacy practices. See our Privacy Policy page for details on how data is handled.'
    },
    {
      q: 'Do you support multiple clinics?',
      a: 'Yes. CuraNova can handle schedules and workflows across departments and multiple clinic locations.'
    },
    {
      q: 'Who can I contact for technical support?',
      a: 'Reach out to sajuraja0022@gmail.com or call +91 82482 31872 for support and onboarding help.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="site-shell text-start">
      <main className="page-section">
        <h1 className="section-title" style={{ marginTop: '0px' }}>Frequently Asked Questions</h1>
        <p className="section-copy">Common questions about CuraNova and how the platform works.</p>

        <div className="faq-list mt-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'open' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  {faq.q}
                  <span className="faq-icon" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </div>
                <div className="faq-answer" style={{ 
                  maxHeight: isOpen ? '200px' : '0px', 
                  transition: 'all 0.3s ease-in-out',
                  opacity: isOpen ? 1 : 0
                }}>
                  <p className="mb-0" style={{ color: 'var(--muted)' }}>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
