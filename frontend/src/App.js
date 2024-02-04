// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import Signup from './Components/Signup';
import { AuthProvider } from './Context/AuthContext';  // Import AuthProvider

const App = () => {
  return (
    <AuthProvider>  
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
