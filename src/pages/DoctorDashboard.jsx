import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import {
  Container, Grid, Paper, Typography, Box, Button, Avatar, Divider, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'doctor') {
      navigate('/login');
    } else {
      loadAppointments();
    }
  }, [user, navigate]);

  const loadAppointments = async () => {
    try {
      const data = await api.getDoctorAppointments();
      
      const validatedAppointments = data.map(app => ({
        ...app,
        status: app.status || 'Pending',
        id: app.id || app._id
      }));
      
      validatedAppointments.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setAppointments(validatedAppointments);
    } catch (e) {
      console.error('Failed to load appointments', e);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const result = await api.updateAppointmentStatus(id, status);
      if (result.success) {
        setMessage(`Appointment marked as ${status}.`);
        loadAppointments();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update status.');
      }
    } catch (e) {
      console.error(e);
      setMessage('Failed to update status.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  return (
    <div className="site-shell text-start" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="lg" sx={{ px: 0 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0b4d5a', fontFamily: 'Inter, sans-serif' }}>
              Doctor Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#45656a' }}>
              Welcome back, Dr. {user.name || ''}! Manage your schedule and patients.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              borderWidth: '1.5px',
              '&:hover': { borderWidth: '1.5px' },
            }}
          >
            Logout
          </Button>
        </Box>

        {message && (
          <Alert severity="success" onClose={() => setMessage('')} sx={{ mb: 4, borderRadius: '12px', fontWeight: 500 }}>
            {message}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Doctor Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '24px',
                border: '1px solid #dbe9ec',
                boxShadow: '0 24px 60px rgba(15, 108, 127, 0.08)',
                background: '#ffffff',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: '#e5f6f8', color: '#0f6c7f', fontSize: '2rem', fontWeight: 700, mb: 2, border: '2px solid #2bb3c0' }}
                >
                  {(user.name || 'D').charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0b4d5a', textAlign: 'center' }}>
                  Dr. {user.name || ''}
                </Typography>
                <Chip
                  label="Medical Professional"
                  size="small"
                  sx={{ mt: 1, bgcolor: '#e5f6f8', color: '#0f6c7f', fontWeight: 600 }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: '#0f6c7f' }} />
                  <Box>
                    <Typography variant="caption" display="block" sx={{ color: '#61717a', fontWeight: 500 }}>Email Address</Typography>
                    <Typography variant="body2" sx={{ color: '#12343b', fontWeight: 600 }}>{user.email}</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Appointments & Stats */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Stats Overview */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #dbe9ec', bgcolor: '#e5f6f8' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CalendarMonthIcon sx={{ fontSize: '2.5rem', color: '#0f6c7f' }} />
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f6c7f' }}>{appointments.length}</Typography>
                        <Typography variant="caption" sx={{ color: '#45656a', fontWeight: 600 }}>Total Bookings</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #dbe9ec', bgcolor: '#f0fdf4' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ fontSize: '2.5rem', color: '#16a34a' }} />
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#16a34a' }}>{confirmedCount}</Typography>
                        <Typography variant="caption" sx={{ color: '#166534', fontWeight: 600 }}>Confirmed</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #dbe9ec', bgcolor: '#fffbeb' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PendingActionsIcon sx={{ fontSize: '2.5rem', color: '#d97706' }} />
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#d97706' }}>{pendingCount}</Typography>
                        <Typography variant="caption" sx={{ color: '#92400e', fontWeight: 600 }}>Pending Review</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Appointments List */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #dbe9ec', background: '#ffffff' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#0b4d5a', mb: 3 }}>
                  Patient Appointments
                </Typography>

                {appointments.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ color: '#61717a', mb: 2 }}>
                      You have no appointments scheduled.
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table sx={{ minWidth: 600 }}>
                      <TableHead>
                        <TableRow sx={{ '& th': { color: '#0b4d5a', fontWeight: 700, borderBottom: '2px solid #dbe9ec' } }}>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Age & Contact</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell>Reason</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointments.map((app) => (
                          <TableRow key={app.id} sx={{ '& td': { borderBottom: '1px solid #eef8fb' } }}>
                            <TableCell sx={{ fontWeight: 600, color: '#12343b' }}>
                              {app.patientName || (app.patientId ? app.patientId.name : 'Unknown Patient')}
                            </TableCell>
                            <TableCell sx={{ color: '#45656a' }}>
                              <div>{app.patientAge ? `${app.patientAge} yrs` : 'N/A'}</div>
                              <div style={{ fontSize: '0.8rem', color: '#61717a' }}>{app.patientPhone || ''}</div>
                            </TableCell>
                            <TableCell sx={{ color: '#45656a' }}>
                              {new Date(app.appointmentDate || app.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell sx={{ color: '#45656a' }}>
                              {app.appointmentTime || app.time}
                            </TableCell>
                            <TableCell sx={{ color: '#45656a', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {app.reason}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={app.status}
                                size="small"
                                color={app.status === 'Confirmed' ? 'success' : app.status === 'Cancelled' ? 'error' : 'warning'}
                                sx={{ fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                {app.status === 'Pending' && (
                                  <>
                                    <Button
                                      size="small" variant="outlined" color="success"
                                      onClick={() => handleUpdateStatus(app.id, 'Confirmed')}
                                      sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.75rem', py: 0.5 }}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      size="small" variant="outlined" color="error" startIcon={<CancelIcon />}
                                      onClick={() => handleUpdateStatus(app.id, 'Cancelled')}
                                      sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.75rem', py: 0.5 }}
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                {app.status === 'Confirmed' && (
                                  <Button
                                    size="small" variant="outlined" color="error" startIcon={<CancelIcon />}
                                    onClick={() => handleUpdateStatus(app.id, 'Cancelled')}
                                    sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.75rem', py: 0.5 }}
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
