import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, TextField, InputAdornment, IconButton,
  Rating, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert,
  Chip, Stack, Paper, Avatar, Divider, useTheme, useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import * as storeService from '../../services/storeService';
import * as ratingService from '../../services/ratingService';
import { useAuth } from '../../context/AuthContext';

const StoreListPage = () => {
    const { isNormalUser } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState({ name: '', address: '' }); 
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [sort, setSort] = useState({ field: 'name', order: 'asc' }); 

  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingError, setRatingError] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const fetchStores = async () => {
    setLoading(true);
    setError('');
    try {
        const fetchedStores = await storeService.getAllStores(debouncedSearchQuery, sort);
        setStores(fetchedStores || []);
    } catch (err) {
      console.error('Failed to fetch stores:', err);
      setError(err.response?.data?.message || 'Failed to fetch stores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
}, [debouncedSearchQuery, sort]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenRatingDialog = (store) => {
    if (!isNormalUser) {
        setError('Only Normal Users can submit ratings.');
        setTimeout(() => setError(''), 3000);
        return;
    }
    setSelectedStore(store);
    setCurrentRating(store.user_submitted_rating || 0);
    setRatingError('');
    setOpenRatingDialog(true);
  };

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
    setSelectedStore(null);
    setCurrentRating(0);
  };

  const handleSubmitRating = async () => {
    setRatingError('');
    if (currentRating < 1 || currentRating > 5) {
      setRatingError('Rating must be between 1 and 5 stars.');
      return;
    }
    try {
      await ratingService.submitRating(selectedStore.id, currentRating);
      setError('Rating submitted successfully!'); 
      handleCloseRatingDialog();
      fetchStores();
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      setRatingError(err.response?.data?.message || 'Failed to submit rating.');
    }
  };


  
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            width: 56,
            height: 56,
          }}>
            <BusinessIcon />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              color: 'text.primary',
              lineHeight: 1.2,
            }}>
              Store Directory
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
            }}>
              Discover and rate amazing stores in your area
            </Typography>
          </Box>
        </Stack>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {stores.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Total Stores
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
                  <StarIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main' }}>
                    {stores.filter(store => store.overall_rating >= 4).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Highly Rated
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 114, 182, 0.1) 100%)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main' }}>
                    {stores.filter(store => store.user_submitted_rating).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Your Ratings
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'info.main' }}>
                    {stores.reduce((acc, store) => acc + (store.total_ratings || 0), 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Total Reviews
      </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert 
          severity={error.includes('successfully') ? 'success' : 'error'} 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontWeight: 500,
            }
          }}
        >
          {error}
        </Alert>
      )}

      {/* Search Section */}
      <Paper sx={{ 
        p: 3, 
        mb: 4,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
          Search & Filter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
        <TextField
              label="Search by Store Name"
          name="name"
          value={searchQuery.name}
          onChange={handleSearchChange}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ) 
              }}
              fullWidth
              placeholder="Enter store name..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
        <TextField
              label="Search by Location"
          name="address"
          value={searchQuery.address}
          onChange={handleSearchChange}
              InputProps={{ 
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ) 
              }}
              fullWidth
              placeholder="Enter location..."
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Stores Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3}>
          {stores.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 6, 
                textAlign: 'center',
                background: 'rgba(248, 250, 252, 0.5)',
                border: '2px dashed rgba(99, 102, 241, 0.3)',
              }}>
                <BusinessIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  No stores found
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Try adjusting your search criteria to find more stores.
              </Typography>
              </Paper>
            </Grid>
                      ) : (
                        stores.map((store) => (
              <Grid item key={store.id} xs={12} sm={6} lg={4}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  transition: 'all 0.3s ease-in-out',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  } 
                }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack spacing={2}>
                      {/* Store Header */}
                      <Stack direction="row" alignItems="flex-start" spacing={2}>
                        <Avatar sx={{ 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          width: 48,
                          height: 48,
                        }}>
                          <BusinessIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            color: 'text.primary',
                            lineHeight: 1.3,
                          }}>
                                  {store.name}
                                </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" sx={{ 
                              color: 'text.secondary',
                              fontWeight: 500,
                            }}>
                                  {store.address}
                                </Typography>
                          </Stack>
                        </Box>
                      </Stack>

                      <Divider />

                      {/* Ratings Section */}
                      <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Overall Rating
                          </Typography>
                          <Chip 
                            label={`${typeof store.overall_rating === 'number' ? store.overall_rating.toFixed(1) : 'N/A'}`}
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                          />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Rating 
                            value={store.overall_rating || 0} 
                            readOnly 
                            precision={0.5} 
                            size="small"
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} 
                          />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            ({store.total_ratings || 0} reviews)
                          </Typography>
                        </Stack>
                                </Box>

                      {isNormalUser && store.user_submitted_rating && (
                        <Box>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                              Your Rating
                            </Typography>
                            <Chip 
                              label={`${store.user_submitted_rating.toFixed(0)}`}
                              size="small"
                              color="secondary"
                              sx={{ fontWeight: 600 }}
                            />
                          </Stack>
                                      <Rating
                                        value={store.user_submitted_rating || 0}
                                        readOnly
                                        precision={1}
                            size="small"
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                      />
                                      </Box>
                                )}

                      {/* Action Button */}
                                {isNormalUser && (
                        <Button 
                          variant={store.user_submitted_rating ? "outlined" : "contained"}
                          size="large"
                          fullWidth
                          onClick={() => handleOpenRatingDialog(store)}
                          sx={{
                            mt: 2,
                            py: 1.5,
                            fontWeight: 600,
                            ...(store.user_submitted_rating ? {} : {
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #5b5bd6 0%, #7c3aed 100%)',
                                transform: 'translateY(-1px)',
                              }
                            })
                          }}
                        >
                          {store.user_submitted_rating ? 'Update Your Rating' : 'Rate This Store'}
                                  </Button>
                                )}
                    </Stack>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                      )}
                    </Grid>
                  )}
            
      {/* Rating Dialog */}
      <Dialog 
        open={openRatingDialog} 
        onClose={handleCloseRatingDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          pb: 1,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          fontWeight: 700,
        }}>
          {selectedStore ? `Rate ${selectedStore.name}` : 'Submit Rating'}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          {ratingError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {ratingError}
            </Alert>
          )}
          <Stack spacing={3} alignItems="center">
            <Avatar sx={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              width: 80,
              height: 80,
            }}>
              <StarIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
              How would you rate this store?
            </Typography>
            <Rating
              name="store-rating"
              value={currentRating}
              onChange={(event, newValue) => {
                setCurrentRating(newValue);
              }}
              size="large"
              precision={1}
              sx={{ 
                '& .MuiRating-iconEmpty': { color: 'rgba(0, 0, 0, 0.26)' },
                '& .MuiRating-iconFilled': { color: '#fbbf24' },
                '& .MuiRating-iconHover': { color: '#f59e0b' },
              }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Select a rating from 1 to 5 stars
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={handleCloseRatingDialog}
            variant="outlined"
            size="large"
            sx={{ fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitRating} 
            variant="contained" 
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreListPage;