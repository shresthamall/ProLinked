import { useAuth } from '../context/AuthContext';
import UserProfilePage from './UserProfilePage'; // Reusing the user profile component

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return <UserProfilePage userId={user._id} isOwnProfile={true} />;
};

export default ProfilePage;
