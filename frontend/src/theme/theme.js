import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#8b5cf6',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Modern pink
      light: '#f472b6',
      dark: '#be185d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Soft gray
      paper: '#ffffff',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: { 
      fontSize: '3.5rem', 
      fontWeight: 800, 
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
    },
    h2: { 
      fontSize: '2.5rem', 
      fontWeight: 700, 
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h3: { 
      fontSize: '2rem', 
      fontWeight: 700, 
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h4: { 
      fontSize: '1.5rem', 
      fontWeight: 600, 
      lineHeight: 1.4,
    },
    h5: { 
      fontSize: '1.25rem', 
      fontWeight: 600, 
      lineHeight: 1.4,
    },
    h6: { 
      fontSize: '1.125rem', 
      fontWeight: 600, 
      lineHeight: 1.4,
    },
    body1: { 
      fontSize: '1rem', 
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: { 
      fontSize: '0.875rem', 
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: { 
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
    '0 40px 80px -12px rgba(0, 0, 0, 0.35)',
    '0 50px 100px -20px rgba(0, 0, 0, 0.4)',
    '0 60px 120px -20px rgba(0, 0, 0, 0.45)',
    '0 70px 140px -20px rgba(0, 0, 0, 0.5)',
    '0 80px 160px -20px rgba(0, 0, 0, 0.55)',
    '0 90px 180px -20px rgba(0, 0, 0, 0.6)',
    '0 100px 200px -20px rgba(0, 0, 0, 0.65)',
    '0 110px 220px -20px rgba(0, 0, 0, 0.7)',
    '0 120px 240px -20px rgba(0, 0, 0, 0.75)',
    '0 130px 260px -20px rgba(0, 0, 0, 0.8)',
    '0 140px 280px -20px rgba(0, 0, 0, 0.85)',
    '0 150px 300px -20px rgba(0, 0, 0, 0.9)',
    '0 160px 320px -20px rgba(0, 0, 0, 0.95)',
    '0 170px 340px -20px rgba(0, 0, 0, 1)',
    '0 180px 360px -20px rgba(0, 0, 0, 1)',
    '0 190px 380px -20px rgba(0, 0, 0, 1)',
    '0 200px 400px -20px rgba(0, 0, 0, 1)',
    '0 210px 420px -20px rgba(0, 0, 0, 1)',
    '0 220px 440px -20px rgba(0, 0, 0, 1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.875rem',
          letterSpacing: '0.025em',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.35)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(226, 232, 240, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.16)',
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.04)',
          },
        },
      },
    },
  },
});

export default theme;