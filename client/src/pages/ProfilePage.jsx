import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import UserProfilePage from './UserProfilePage'; // Reusing the user profile component

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoadingSpinner />;
  }

  return <UserProfilePage userId={user._id} isOwnProfile={true} />;
};

export default ProfilePage;
