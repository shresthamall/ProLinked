import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import PostCard from '../components/PostCard';
import EditProfileModal from '../components/EditProfileModal';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Alert,
  Paper,
  Grid,
} from '@mui/material';

const UserProfilePage = ({ userId: propUserId, isOwnProfile = false }) => {
  const { userId: paramUserId } = useParams();
  const userId = propUserId || paramUserId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [userRes, postsRes] = await Promise.all([
        api.get(`/users/${userId}`),
        api.get(`/posts/user/${userId}`),
      ]);
      setUser(userRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      setError('Failed to load profile.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'User not found.'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, fontSize: '3rem', bgcolor: 'primary.main' }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
              Bio
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {user.bio || 'No bio yet.'}
            </Typography>
            {isOwnProfile && (
              <Button
                variant="outlined"
                onClick={() => setIsEditModalOpen(true)}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onProfileUpdate={() => {
            fetchProfileData();
            setIsEditModalOpen(false);
          }}
        />
      )}

      <Typography variant="h5" component="h2" gutterBottom>
        Posts by {user.name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              This user has no posts yet.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default UserProfilePage;
