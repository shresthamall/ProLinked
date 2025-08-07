import React from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hideOnRoutes = ['/login', '/register'];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              ProLinked
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {!hideOnRoutes.includes(location.pathname) && (
                <Button component={RouterLink} to="/" color="inherit" startIcon={<HomeIcon />}>
                  Home
                </Button>
              )}
              {isAuthenticated ? (
                <>
                  <Button component={RouterLink} to="/profile" color="inherit" startIcon={<AccountCircleIcon />}>
                    Profile
                  </Button>
                  <Button onClick={handleLogout} color="inherit" startIcon={<LogoutIcon />}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to="/login" color="inherit" startIcon={<LoginIcon />}>
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    disableElevation
                    startIcon={<PersonAddIcon />}
                    sx={{ ml: 2 }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 'auto',
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' ProLinked. All rights reserved.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
