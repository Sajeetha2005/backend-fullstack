import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Appointments');

  // --- Appointments State ---
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [formSuccess, setFormSuccess] = useState('');

  // --- Users State ---
  const [users, setUsers] = useState([]);

  // --- Doctors State ---
  const [doctorsList, setDoctorsList] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', email: '', password: '', phone: '', specialization: '', experience: '' });
  const [doctorError, setDoctorError] = useState('');
  const [doctorSuccess, setDoctorSuccess] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchUsers();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await api.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await api.getDoctors();
      setDoctorsList(data);
    } catch (err) {
      console.error('Failed to load doctors:', err);
    }
  };

  // --- Appointments Logic ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await api.updateAppointmentStatus(id, newStatus);
      if (result.success) {
        setFormSuccess(`Appointment status successfully updated to ${newStatus}.`);
        setTimeout(() => setFormSuccess(''), 3000);
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const result = await api.deleteAppointment(id);
      if (result.success) {
        setFormSuccess('Appointment deleted successfully.');
        setTimeout(() => setFormSuccess(''), 3000);
        fetchAppointments();
      }
    } catch (err) {
      console.error('Failed to delete appointment:', err);
    }
  };

  // --- Doctors Logic ---
  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setDoctorError('');
    setDoctorSuccess('');

    if (!newDoctor.name || !newDoctor.email || !newDoctor.password || !newDoctor.phone || !newDoctor.specialization || !newDoctor.experience) {
      setDoctorError('Please fill out all required fields.');
      return;
    }

    try {
      const result = await api.createDoctor(newDoctor);
      if (result.success) {
        setDoctorSuccess('Doctor added successfully!');
        setNewDoctor({ name: '', email: '', password: '', phone: '', specialization: '', experience: '' });
        fetchDoctors();
        setTimeout(() => setDoctorSuccess(''), 3000);
      } else {
        setDoctorError(result.message || 'Failed to create doctor.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setDoctorError(err.response.data.message);
      } else {
        setDoctorError('Server error creating doctor.');
      }
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      const result = await api.deleteDoctor(id);
      if (result.success) {
        setDoctorSuccess('Doctor deleted successfully.');
        setTimeout(() => setDoctorSuccess(''), 3000);
        fetchDoctors();
      } else {
        setDoctorError(result.message || 'Failed to delete doctor.');
      }
    } catch (err) {
      console.error('Failed to delete doctor:', err);
    }
  };


  // --- Render Helpers ---
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = 
      (app.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.doctor || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.reason || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesDoctor = doctorFilter === 'All' || app.doctor === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const pieData = [
    { name: 'Confirmed', value: confirmedCount, color: '#16a34a' },
    { name: 'Pending', value: pendingCount, color: '#d97706' },
    { name: 'Cancelled', value: cancelledCount, color: '#dc2626' },
  ].filter(item => item.value > 0);

  return (
    <div className="container-hero py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="section-title mb-1" style={{ color: 'var(--primary-dark)' }}>Admin Operations Panel</h2>
          <p className="hero-text-simple mb-0">Manage appointments, users, and doctors.</p>
        </div>
        <div>
          <button 
            className="btn btn-outline-danger" 
            onClick={() => { logout(); navigate('/login'); }}
            style={{ borderRadius: '8px', fontWeight: '600' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sub-navbar / Tabs */}
      <ul className="nav nav-pills mb-4" style={{ gap: '10px' }}>
        {['Appointments', 'Users', 'Doctors'].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{
                borderRadius: '8px',
                backgroundColor: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--primary-dark)',
                fontWeight: '600'
              }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* --- Appointments Tab --- */}
      {activeTab === 'Appointments' && (
        <section>
          {formSuccess && (
            <div className="alert alert-success border-0 rounded-4 p-3 mb-4" role="alert" style={{ backgroundColor: '#f0fdf4', color: '#166534', fontWeight: '500' }}>
              ✓ {formSuccess}
            </div>
          )}

          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              {/* Real-time stats row */}
              <div className="row g-3 h-100">
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-4 border h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#f5fbfc', borderColor: 'var(--border)' }}>
                    <span className="d-block text-muted small" style={{ fontWeight: '600' }}>Total Bookings</span>
                    <span className="h3 font-weight-bold mb-0" style={{ color: 'var(--primary)', fontWeight: '800' }}>{totalCount}</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-4 border h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#f0fdf4', borderColor: '#dcfce7' }}>
                    <span className="d-block text-muted small" style={{ fontWeight: '600' }}>Confirmed</span>
                    <span className="h3 font-weight-bold mb-0" style={{ color: '#16a34a', fontWeight: '800' }}>{confirmedCount}</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-4 border h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }}>
                    <span className="d-block text-muted small" style={{ fontWeight: '600' }}>Pending</span>
                    <span className="h3 font-weight-bold mb-0" style={{ color: '#d97706', fontWeight: '800' }}>{pendingCount}</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded-4 border h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#fef2f2', borderColor: '#fee2e2' }}>
                    <span className="d-block text-muted small" style={{ fontWeight: '600' }}>Cancelled</span>
                    <span className="h3 font-weight-bold mb-0" style={{ color: '#dc2626', fontWeight: '800' }}>{cancelledCount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {/* Pie Chart */}
              <div className="p-3 rounded-4 border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', height: '180px' }}>
                {totalCount > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Appointments']} />
                      <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 text-muted small" style={{ fontWeight: '500' }}>
                    No data to display
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter controls card */}
          <div className="p-3 border rounded-4 mb-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="row g-2 align-items-center">
              <div className="col-md-4">
                <input 
                  type="text" className="form-control form-control-sm" placeholder="Search patient, doctor, or reason..." 
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ borderRadius: '8px' }}
                />
              </div>
              <div className="col-6 col-md-3">
                <select 
                  className="form-select form-select-sm" 
                  value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ borderRadius: '8px' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-6 col-md-3">
                <select 
                  className="form-select form-select-sm" 
                  value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} style={{ borderRadius: '8px' }}
                >
                  <option value="All">All Doctors</option>
                  {doctorsList.map(doc => (
                    <option key={doc._id} value={doc.name}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 text-md-end">
                <button 
                  className="btn btn-sm btn-outline-secondary w-100" 
                  onClick={() => { setSearchQuery(''); setStatusFilter('All'); setDoctorFilter('All'); }}
                  style={{ borderRadius: '8px' }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="border rounded-4 overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
                <thead className="table-light text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <tr>
                    <th style={{ padding: '16px' }}>Patient</th>
                    <th>Age</th>
                    <th>Assigned Doctor</th>
                    <th>Date & Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th className="text-end" style={{ padding: '16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-5 text-muted">No appointments match the current search/filters.</td></tr>
                  ) : (
                    filteredAppointments.map((app) => {
                      const appId = app._id || app.id;
                      return (
                        <tr key={appId} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary-dark)' }}>
                            {app.patientName}
                            <span className="d-block text-muted small" style={{ fontWeight: '400' }}>{app.userEmail}</span>
                          </td>
                          <td>{app.patientAge}</td>
                          <td>{app.doctor}</td>
                          <td>
                            {app.date}
                            <span className="d-block text-muted small">{app.time}</span>
                          </td>
                          <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={app.reason}>
                            {app.reason}
                          </td>
                          <td>
                            <span className={`badge px-2.5 py-1.5 rounded-pill`} style={{
                              backgroundColor: app.status === 'Confirmed' ? '#e6f7fa' : app.status === 'Cancelled' ? '#fef2f2' : '#fffbeb',
                              color: app.status === 'Confirmed' ? '#0f6c7f' : app.status === 'Cancelled' ? '#b42318' : '#b7791f',
                              fontWeight: '600', fontSize: '0.75rem',
                              border: `1px solid ${app.status === 'Confirmed' ? '#2bb3c0' : app.status === 'Cancelled' ? '#fecaca' : '#fef3c7'}`
                            }}>
                              {app.status}
                            </span>
                          </td>
                          <td className="text-end" style={{ padding: '16px' }}>
                            <div className="d-inline-flex gap-1.5">
                              {app.status === 'Pending' && (
                                <button className="btn btn-sm btn-outline-success py-1 px-2.5" onClick={() => handleStatusChange(appId, 'Confirmed')} style={{ fontSize: '0.75rem', borderRadius: '6px' }}>Approve</button>
                              )}
                              {app.status !== 'Pending' && (
                                <button className="btn btn-sm btn-outline-warning py-1 px-2.5" onClick={() => handleStatusChange(appId, 'Pending')} style={{ fontSize: '0.75rem', borderRadius: '6px' }}>Pend</button>
                              )}
                              <button className="btn btn-sm btn-outline-danger py-1 px-2.5" onClick={() => handleDeleteAppointment(appId)} style={{ fontSize: '0.75rem', borderRadius: '6px' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* --- Users Tab --- */}
      {activeTab === 'Users' && (
        <section>
          <div className="border rounded-4 overflow-hidden shadow-sm mt-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
             <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
                <thead className="table-light text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <tr>
                    <th style={{ padding: '16px' }}>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="3" className="text-center py-5 text-muted">No users found.</td></tr>
                  ) : (
                    users.map(user => (
                      <tr key={user._id || user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary-dark)' }}>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* --- Doctors Tab --- */}
      {activeTab === 'Doctors' && (
        <section>
          <div className="card p-4 border rounded-4 mb-4" style={{ backgroundColor: 'var(--surface-alt)', borderColor: 'var(--border)' }}>
             <h4 className="mb-3" style={{ color: 'var(--primary-dark)', fontWeight: '700' }}>Add New Doctor</h4>
              {doctorSuccess && (
                <div className="alert alert-success border-0 rounded-4 p-3 mb-4" role="alert" style={{ backgroundColor: '#f0fdf4', color: '#166534', fontWeight: '500' }}>
                  ✓ {doctorSuccess}
                </div>
              )}

              {doctorError && (
                <div className="alert alert-danger border-0 rounded-4 p-3 mb-4" role="alert" style={{ backgroundColor: '#fef2f2', color: '#991b1b', fontWeight: '500' }}>
                  ⚠ {doctorError}
                </div>
              )}
             <form onSubmit={handleDoctorSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Doctor Name *</label>
                    <input 
                      type="text" className="form-control" placeholder="Dr. Name"
                      value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Email *</label>
                    <input 
                      type="email" className="form-control" placeholder="doctor@example.com"
                      value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Password *</label>
                    <input 
                      type="password" className="form-control" placeholder="Login password"
                      value={newDoctor.password} onChange={(e) => setNewDoctor({...newDoctor, password: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Phone *</label>
                    <input 
                      type="text" className="form-control" placeholder="e.g. 1234567890"
                      value={newDoctor.phone} onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Specialty *</label>
                    <input 
                      type="text" className="form-control" placeholder="Specialty"
                      value={newDoctor.specialization} onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small" style={{ fontWeight: '600' }}>Experience *</label>
                    <input 
                      type="text" className="form-control" placeholder="e.g. 10 years"
                      value={newDoctor.experience} onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})} required style={{ borderRadius: '10px' }}
                    />
                  </div>
                   <div className="col-12 text-end mt-3">
                    <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px', backgroundColor: 'var(--primary)' }}>Add Doctor</button>
                  </div>
                </div>
              </form>
          </div>

          <div className="border rounded-4 overflow-hidden shadow-sm mt-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
             <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
                <thead className="table-light text-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <tr>
                    <th style={{ padding: '16px' }}>Name</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th className="text-end" style={{ padding: '16px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorsList.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-5 text-muted">No doctors found.</td></tr>
                  ) : (
                    doctorsList.map(doc => (
                      <tr key={doc._id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px', fontWeight: '600', color: 'var(--primary-dark)' }}>{doc.name}</td>
                        <td>{doc.specialization || doc.specialty}</td>
                        <td>{doc.experience}</td>
                        <td className="text-end" style={{ padding: '16px' }}>
                           <button className="btn btn-sm btn-outline-danger py-1 px-2.5" onClick={() => handleDeleteDoctor(doc._id)} style={{ fontSize: '0.75rem', borderRadius: '6px' }}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
