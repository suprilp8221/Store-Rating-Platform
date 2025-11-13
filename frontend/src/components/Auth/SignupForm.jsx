import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Link, Paper, Avatar, FormControl, 
  InputLabel, Select, MenuItem, Stack, Divider, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import AlertDialog from '../Common/AlertDialog';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'Normal User',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const user = await signup(formData);
      // Redirect based on role
      if (user.role === 'Store Owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/stores');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || String(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Creating your account..." />;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 3, sm: 4, md: 6 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
        maxWidth: 520,
        mx: 'auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        borderRadius: 4,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Avatar sx={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          width: 56,
          height: 56,
        }}>
          <BusinessIcon />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            StoreRating Pro
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Professional Store Rating Platform
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ width: '100%', mb: 4 }} />

      {/* Signup Form */}
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            width: 40,
            height: 40,
          }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Create Account
          </Typography>
        </Stack>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              helperText="8-20 characters"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              helperText="8-16 characters, uppercase + special character"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              required
              fullWidth
              name="address"
              label="Address"
              id="address"
              autoComplete="street-address"
              value={formData.address}
              onChange={handleChange}
              helperText="Maximum 400 characters"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Account Type</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                name="role"
                value={formData.role}
                label="Account Type"
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                }}
              >
                <MenuItem value="Normal User">Normal User</MenuItem>
                <MenuItem value="Store Owner">Store Owner</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'rgba(16, 185, 129, 0.3)',
                }
              }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
              OR
            </Typography>
          </Divider>

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            Already have an account?{' '}
            <Link 
              component="button" 
              type="button" 
              onClick={() => navigate('/login')} 
              underline="hover"
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark',
                }
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>

      <AlertDialog
        open={!!error}
        handleClose={() => setError('')}
        title="Signup Failed"
        message={error}
        showCancel={false}
      />
    </Paper>
  );
};

export default SignupForm;
