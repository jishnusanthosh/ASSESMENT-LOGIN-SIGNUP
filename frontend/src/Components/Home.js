import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Typography, Container, CssBaseline } from '@mui/material';

const Home = () => {
  const { isLoggedIn, username, logout } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info(`Welcome, ${username}!`);
    }
  }, [isLoggedIn, username]);

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '50px' }} >
      <CssBaseline />
      {isLoggedIn ? (
        <main>
          <>
            <Typography variant="h3" color="primary" gutterBottom>
              Welcome to Our Platform, {username}!
            </Typography>
            <Typography variant="body1" paragraph>
              We provide the best service for you. Join us now and experience the difference.
            </Typography>
          </>
          <section>
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Log Out
            </Button>
          </section>
        </main>
      ) : (
        <main>
          <>
            <Typography variant="h3" color="primary" gutterBottom>
              Welcome to Our Platform
            </Typography>
            <Typography variant="body1" paragraph>
              We provide the best service for you. Join us now and experience the difference.
            </Typography>
          </>
          <section>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                Log In
              </Button>
            </Link>
          </section>
        </main>
      )}
    </Container>
  );
};

export default Home;
