import React from 'react';
import { 
  Box, Typography, Button, Container, Grid, Card, CardContent, 
  Avatar, Stack, Chip, Paper, useTheme, useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nav/Navbar';
import { useAuth } from '../context/AuthContext';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'System Administrator') return '/admin/dashboard';
    if (user.role === 'Store Owner') return '/owner/dashboard';
    if (user.role === 'Normal User') return '/stores';
    return '/';
  };

  const features = [
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Store Discovery',
      description: 'Find and explore stores in your area with detailed information and ratings.',
      color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Rate & Review',
      description: 'Share your experiences and help others make informed decisions.',
      color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Community Driven',
      description: 'Join a community of users who value quality and transparency.',
      color: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Analytics & Insights',
      description: 'Get detailed analytics and insights about store performance.',
      color: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    },
  ];

  const benefits = [
    'Real-time store ratings and reviews',
    'Advanced search and filtering options',
    'Secure and reliable platform',
    'Mobile-responsive design',
    'Professional analytics dashboard',
    'Multi-role user management',
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant={isMobile ? 'h3' : 'h1'} 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                mb: 3,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Welcome to StoreRating Pro
            </Typography>
            <Typography 
              variant={isMobile ? 'h6' : 'h4'} 
              component="p" 
              sx={{ 
                mb: 6, 
                maxWidth: '800px', 
                mx: 'auto',
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              The professional platform for discovering, rating, and sharing experiences with stores in your area.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to={getDashboardLink()}
                  sx={{ 
                    py: 2, 
                    px: 6,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/signup"
                    sx={{ 
                      py: 2, 
                      px: 6,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/login"
                    sx={{ 
                      py: 2, 
                      px: 6,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Stack>

          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
            Why Choose StoreRating Pro?
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
            We provide a comprehensive platform for store discovery, rating, and management with professional-grade features.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                textAlign: 'center',
                p: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <Avatar sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 3,
                  background: feature.color,
                }}>
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 8,
      }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                Professional Features
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.6 }}>
                Built with modern technology and user experience in mind, our platform offers everything you need for effective store management and discovery.
              </Typography>
              
              <Grid container spacing={2}>
                {benefits.map((benefit, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {benefit}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
              }}>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                      <SecurityIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Secure & Reliable
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Enterprise-grade security with encrypted data transmission
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
                      <SpeedIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Fast & Responsive
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Optimized for speed with real-time updates and notifications
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        py: 8,
      }}>
        <Container sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Join thousands of users who trust StoreRating Pro for their store discovery and rating needs.
          </Typography>
          
          {!isAuthenticated && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                sx={{ 
                  py: 2, 
                  px: 6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
                sx={{ 
                  py: 2, 
                  px: 6,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Learn More
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        py: 6, 
        background: 'rgba(15, 23, 42, 0.8)',
        color: 'white',
        textAlign: 'center',
      }}>
        <Container>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            StoreRating Pro
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
            Professional store rating and review platform for businesses and customers.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} StoreRating Pro. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;