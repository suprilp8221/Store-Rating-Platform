import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, 
  Avatar, Tooltip, Chip, Stack, useTheme, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const Navbar = ({ handleDrawerToggle }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'System Administrator') return '/admin/dashboard';
    if (user.role === 'Store Owner') return '/owner/dashboard';
    if (user.role === 'Normal User') return '/stores';
    return '/';
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getProfileLink = () => {
    if (!user) return '/login';
    if (user.role === 'System Administrator') return '/admin/profile';
    return '/profile';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'System Administrator': return 'error';
      case 'Store Owner': return 'warning';
      case 'Normal User': return 'success';
      default: return 'default';
    }
  };

  const isDashboard = !!handleDrawerToggle;

  return (
    <AppBar
      position={isDashboard ? "fixed" : "static"}
      elevation={0}
      sx={{
        background: isDashboard 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        ...(isDashboard ? {
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        } : {}),
        '& .MuiToolbar-root': {
          minHeight: 64,
        }
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {isDashboard && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {!isDashboard && (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  width: 40,
                  height: 40,
                }}>
                  <DashboardIcon />
                </Avatar>
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontWeight: 800,
                    color: 'text.primary',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  StoreRating Pro
                </Typography>
              </Stack>
            </Link>
          )}
        </Box>
        
        <Box sx={{ flexGrow: 0 }}>
          {isAuthenticated ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              {!isMobile && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Welcome,
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Chip 
                    label={user.role} 
                    size="small" 
                    color={getRoleColor(user.role)}
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                </Stack>
              )}
              
              <Tooltip title="Account settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontWeight: 700,
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
                  </Avatar>
                </IconButton>
              </Tooltip>
              
              <Menu
                sx={{ 
                  mt: '45px',
                  '& .MuiPaper-root': {
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    minWidth: 200,
                  }
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem 
                  component={Link} 
                  to={getDashboardLink()} 
                  onClick={handleCloseUserMenu}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <DashboardIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                    <Typography sx={{ fontWeight: 500 }}>Dashboard</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  to={getProfileLink()} 
                  onClick={handleCloseUserMenu}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PersonIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                    <Typography sx={{ fontWeight: 500 }}>Profile</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem 
                  onClick={() => { handleCloseUserMenu(); handleLogout(); }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LogoutIcon sx={{ fontSize: 20, color: 'error.main' }} />
                    <Typography sx={{ fontWeight: 500 }}>Logout</Typography>
                  </Stack>
                </MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button 
                component={Link} 
                to="/login" 
                variant="text"
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                  }
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/signup" 
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  fontWeight: 700,
                  px: 3,
                  py: 1,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5b5bd6 0%, #7c3aed 100%)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;