import React from 'react';
import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Box, Divider, Typography, Avatar, Stack, Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
    const { user, isAdmin, isStoreOwner, isNormalUser } = useAuth();
  const location = useLocation();

  let navItems = [];
  if (isAdmin) {
    navItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
      { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
      { text: 'Store Management', icon: <StorefrontIcon />, path: '/admin/stores' },
    ];
  } else if (isStoreOwner) {
    navItems = [
      { text: 'Owner Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' },
      { text: 'My Stores', icon: <StorefrontIcon />, path: '/stores' },
    ];
  } else if (isNormalUser) {
    navItems = [
      { text: 'All Stores', icon: <StorefrontIcon />, path: '/stores' },
      { text: 'My Ratings', icon: <StarIcon />, path: '/my-ratings' },
    ];
  }

  if (user) {
    navItems.push({ text: 'Profile', icon: <AccountCircleIcon />, path: isAdmin ? '/admin/profile' : '/profile' });
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'System Administrator': return 'error';
      case 'Store Owner': return 'warning';
      case 'Normal User': return 'success';
      default: return 'default';
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              width: 48,
              height: 48,
            }}>
              <BusinessIcon />
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
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
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                Professional Platform
              </Typography>
            </Box>
          </Stack>
        </Link>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              width: 40,
              height: 40,
              fontWeight: 700,
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon />}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', noWrap: true }}>
                {user.name}
              </Typography>
              <Chip 
                label={user.role} 
                size="small" 
                color={getRoleColor(user.role)}
                sx={{ 
                  fontWeight: 600, 
                  fontSize: '0.75rem',
                  mt: 0.5,
                }}
              />
            </Box>
          </Stack>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ px: 2, py: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.16)',
                    },
                    '& .MuiListItemIcon-root': { 
                      color: 'primary.main',
                    },
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                      fontWeight: 600,
                    }
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    transform: 'translateX(4px)',
                  },
                  '& .MuiListItemIcon-root': { 
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.2s ease-in-out',
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    transition: 'all 0.2s ease-in-out',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <Typography variant="caption" sx={{ 
          color: 'text.secondary', 
          textAlign: 'center',
          display: 'block',
          fontWeight: 500,
        }}>
          © 2024 StoreRating Pro
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="navigation"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(226, 232, 240, 0.8)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ 
          display: { xs: 'none', sm: 'block' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(226, 232, 240, 0.8)',
          } 
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;