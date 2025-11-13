import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Navbar from '../components/Nav/Navbar';

const GuestLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ p: 2, mt: 'auto', bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Store Rating Platform
        </Typography>
      </Box>
    </Box>
  );
};

export default GuestLayout;