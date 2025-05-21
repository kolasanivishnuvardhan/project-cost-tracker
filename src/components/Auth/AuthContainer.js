import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState('login');

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <AnimatePresence mode="wait">
        {authMode === 'login' ? (
          <Login key="login" onSwitchToRegister={handleSwitchToRegister} />
        ) : (
          <Register key="register" onSwitchToLogin={handleSwitchToLogin} />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AuthContainer; 