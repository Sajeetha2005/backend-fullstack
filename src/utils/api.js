import axios from 'axios';

const API_BASE_URL = 'https://react-fullstack-2.onrender.com/api';

const client = axios.create({ baseURL: API_BASE_URL });

// Attach token via interceptor
client.interceptors.request.use(config => {
  const token = localStorage.getItem('hms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const api = {
  async login(email, password) {
    const res = await client.post('/auth/login', { email, password });
    return res.data;
  },

  async signup(fullname, email, phone, password, confirmPassword) {
    const res = await client.post('/auth/signup', { fullname, email, phone, password, confirmPassword });
    return res.data;
  },

  async forgotPassword(email) {
    const res = await client.post('/auth/forgot-password', { email });
    return res.data;
  },

  async getDoctors() {
    const res = await client.get('/public/doctors');
    return res.data.doctors;
  },

  async createDoctor(data) {
    const res = await client.post('/admin/add-doctor', data);
    return res.data;
  },

  async deleteDoctor(id) {
    const res = await client.delete(`/admin/doctors/${id}`);
    return res.data;
  },

  // Users
  async getUsers() {
    const res = await client.get('/admin/users');
    return res.data.users;
  },

  // Appointments
  async getAppointments() {
    // Admin gets all, User gets their own depending on token role
    // Wait, let's use the correct endpoint based on current user or just let backend handle it?
    // User route is /user/appointments
    const res = await client.get('/user/appointments').catch(async () => {
      return await client.get('/admin/appointments');
    });
    return res.data.appointments || [];
  },

  async getDoctorAppointments() {
    const res = await client.get('/doctor/appointments');
    return res.data.appointments || [];
  },

  async createAppointment(data) {
    const res = await client.post('/user/appointments', data);
    return res.data;
  },

  async updateAppointmentStatus(id, status) {
    // Attempt doctor route first, fallback to admin route
    try {
      const res = await client.put(`/doctor/appointments/${id}/status`, { status });
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        const resAdmin = await client.put(`/admin/appointments/${id}/status`, { status });
        return resAdmin.data;
      }
      throw err;
    }
  },

  async deleteAppointment(id) {
    const res = await client.delete(`/user/appointments/${id}`);
    return res.data;
  }
};
