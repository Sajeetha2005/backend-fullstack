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
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
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

  // Store Data in localStorage & AuthContext
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setStatusMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatusMessage('Passwords do not match. Please try again.');
      setIsSuccess(false);
      return;
    }

    if (!formData.agree) {
      setStatusMessage('Please accept the privacy policy to continue.');
      setIsSuccess(false);
      return;
    }

    // Call the AuthContext signup method
    try {
      const result = await signup(formData.name, formData.email, formData.mobile, formData.password, formData.confirmPassword);
      if (result && result.success) {
        setStatusMessage('Account created. Redirecting to login...');
        setIsSuccess(true);
        setTimeout(() => navigate('/login'), 800);
      } else {
        setStatusMessage(result.message || 'Signup failed');
        setIsSuccess(false);
      }
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Something went wrong');
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Tooltip title="Back to Home">
              <IconButton component={Link} to="/" sx={{ mr: 1, color: '#0f6c7f' }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
              Create Account
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
              Join CuraNova
            </Typography>
            <Typography variant="body2" sx={{ color: '#45656a' }}>
              Sign up to explore services, appointments, and support with a secure account.
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
              label="Name"
              name="name"
              value={formData.name}
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
              label="Mobile"
              name="mobile"
              value={formData.mobile}
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

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
                  I agree to the privacy policy and consent to the use of my details.
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
              Sign Up
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3, color: '#45656a' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: '#0f6c7f' }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
