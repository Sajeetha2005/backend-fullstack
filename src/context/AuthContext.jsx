import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hms_user');
      if (stored) {
        const token = localStorage.getItem('hms_token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse user', e);
    }
    return null;
  });
  const [users, setUsers] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    // other effect logic can remain

    try {
      const storedUsers = localStorage.getItem('curanovaUsers');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.error("Failed to parse curanovaUsers", e);
    }
  }, []);

  const login = async (email, password) => {
    const result = await api.login(email, password);
    if (result && result.success) {
      setUser(result.user);
      localStorage.setItem('hms_user', JSON.stringify(result.user));
      localStorage.setItem('hms_token', result.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
    }
    return result;
  };

  const signup = async (fullname, email, phone, password, confirmPassword) => {
    const result = await api.signup(fullname, email, phone, password, confirmPassword);
    // Do not auto-login on signup; return result so the caller can redirect/login explicitly
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const forgotPassword = (email) => {
    const formattedEmail = email.trim().toLowerCase();
    const exists = users.some(u => u.email.toLowerCase() === formattedEmail);

    if (!exists) {
      return { success: false, message: 'No account found for that email. Please sign up first.' };
    }

    return { success: true, message: 'Password reset instructions have been sent to your email.' };
  };

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout, forgotPassword, flashMessage, setFlashMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
