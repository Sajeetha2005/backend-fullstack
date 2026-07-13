import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('curanovaCurrentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to parse curanovaCurrentUser", e);
    }

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

  const login = (email, password) => {
    const formattedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(u => u.email.toLowerCase() === formattedEmail);

    if (!matchedUser) {
      return { success: false, message: 'No account found for that email. Please sign up first.' };
    }

    if (matchedUser.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    setUser(matchedUser);
    localStorage.setItem('curanovaCurrentUser', JSON.stringify(matchedUser));
    return { success: true, message: 'Login successful. Welcome back.' };
  };

  const signup = (fullname, email, phone, password) => {
    const formattedEmail = email.trim().toLowerCase();
    const exists = users.some(u => u.email.toLowerCase() === formattedEmail);

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: Date.now().toString(),
      fullname: fullname.trim() || 'Guest',
      email: formattedEmail,
      phone: phone.trim(),
      password
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('curanovaUsers', JSON.stringify(updatedUsers));
    
    // Automatically log in the user upon signup
    setUser(newUser);
    localStorage.setItem('curanovaCurrentUser', JSON.stringify(newUser));

    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('curanovaCurrentUser');
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
