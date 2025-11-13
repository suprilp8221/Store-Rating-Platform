import React, { useState, useEffect } from 'react';
import { 
  Box, TextField, Button, Typography, Link, Paper, Avatar, Alert, 
  Stack, Divider, useTheme, useMediaQuery
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import AlertDialog from '../Common/AlertDialog';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccessMessage('');
    try {
        const loggedInUser = await login(email, password);
        if (loggedInUser.role === 'System Administrator') {
          navigate('/admin/dashboard');
        } else if (loggedInUser.role === 'Store Owner') {
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
    return <LoadingSpinner message="Signing you in..." />;
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
        maxWidth: 480,
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

      {/* Login Form */}
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
            width: 40,
            height: 40,
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Welcome Back
          </Typography>
        </Stack>

        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontWeight: 500,
              }
            }}
          >
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
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
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5b5bd6 0%, #7c3aed 100%)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'rgba(99, 102, 241, 0.3)',
                }
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
              OR
            </Typography>
          </Divider>

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link 
              component="button" 
              type="button" 
              onClick={() => navigate('/signup')} 
              underline="hover"
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': {
                  color: 'primary.dark',
                }
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Box>

      <AlertDialog
        open={!!error}
        handleClose={() => setError('')}
        title="Login Failed"
        message={error}
        showCancel={false}
      />
    </Paper>
  );
};

export default LoginForm;