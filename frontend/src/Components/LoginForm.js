import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { loginUser } from '../api/authApi';
import { Button, TextField, Container, CssBaseline ,Typography} from '@mui/material';

const Login = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/');
      return;
    }
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
      <CssBaseline />
      {!isLoggedIn && (
        <form onSubmit={handleLogin}>
             <Typography variant="h5" color="primary" gutterBottom>
          Log in
        </Typography>
          <TextField
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Login;
