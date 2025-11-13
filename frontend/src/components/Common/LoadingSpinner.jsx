import React from 'react';
import { CircularProgress, Box, Typography, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 300,
      p: 4,
    }}>
      <Paper sx={{
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
      }}>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{
              color: 'primary.main',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <StarIcon sx={{ 
              color: 'primary.main',
              fontSize: 24,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.5 },
                '50%': { opacity: 1 },
                '100%': { opacity: 0.5 },
              },
            }} />
          </Box>
        </Box>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: 'text.primary',
          textAlign: 'center',
        }}>
          {message}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'text.secondary',
          textAlign: 'center',
          mt: 1,
        }}>
          Please wait while we fetch your data...
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoadingSpinner;