import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Container, CssBaseline, Typography } from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      console.log(response.data);
      toast.success('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error(error.response.data);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
      <CssBaseline />
      <form onSubmit={handleSignup}>
        <Typography variant="h5" color="primary" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          type="text"
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
