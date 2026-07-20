import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agree: false,
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Submit Login credentials
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setStatusMessage('Please enter both email and password.');
      setIsSuccess(false);
      return;
    }

    if (!formData.agree) {
      setStatusMessage('Please consent to the terms to proceed.');
      setIsSuccess(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      setStatusMessage(result.message || 'Login successful');
      setIsSuccess(result.success);

      if (result.success) {
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          if (result.user?.role === 'admin') navigate('/admin');
          else if (result.user?.role === 'doctor') navigate('/doctor-dashboard');
          else navigate('/dashboard');
        }, 600);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setStatusMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
      setIsSuccess(false);
    }
  };


  return (
    <div className="site-shell text-start" style={{ display: 'flex', justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="sm" sx={{ px: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '24px',
            border: '1px solid #dbe9ec',
            boxShadow: '0 24px 60px rgba(15, 108, 127, 0.12)',
            background: '#ffffff',
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: '#0f6c7f',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: '#e5f6f8',
                px: 2,
                py: 0.5,
                borderRadius: '999px',
                display: 'inline-block',
                mb: 2,
              }}
            >
              Secure Access
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                color: '#0b4d5a',
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: '#45656a' }}>
              Access your hospital account and manage care services with confidence.
            </Typography>
          </Box>

          {statusMessage && (
            <Alert
              severity={isSuccess ? 'success' : 'error'}
              sx={{
                mb: 3,
                borderRadius: '12px',
                '& .MuiAlert-message': { fontWeight: 500 },
              }}
            >
              {statusMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#0f6c7f',
                  },
                },
              }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&.Mui-focused fieldset': {
                    borderColor: '#0f6c7f',
                  },
                },
              }}
            />


            <FormControlLabel
              control={
                <Checkbox
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  sx={{
                    color: '#0f6c7f',
                    '&.Mui-checked': {
                      color: '#0f6c7f',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#45656a', userSelect: 'none' }}>
                  I consent to the use of my login data for secure account access.
                </Typography>
              }
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: '12px',
                backgroundColor: '#0f6c7f',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(15, 108, 127, 0.2)',
                '&:hover': {
                  backgroundColor: '#0b4d5a',
                },
              }}
            >
              Login
            </Button>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#45656a' }}>
              <Link to="/forgot-password" style={{ fontWeight: 600, color: '#0f6c7f' }}>
                Forgot Password?
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: '#45656a' }}>
              New user?{' '}
              <Link to="/signup" style={{ fontWeight: 600, color: '#0f6c7f' }}>
                Create an account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
