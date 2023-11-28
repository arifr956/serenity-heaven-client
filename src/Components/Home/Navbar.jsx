import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';

const pages = [
  { label: 'Home', path: '/' },
  { label: 'Apartments', path: '/apartments' },
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigation = useNavigate();

  const handleLogOut = () => {
    logOut()
    .then(result => {
      toast.success(`LogOut Successfully !`, {
          position: "top-center",
          autoClose: 3000,
      });
      navigation("/login");
      console.log(result.user);
  })
      .catch((error) => console.log(error));
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#Serenity Heaven"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ mr: 2, color: '#0096c7' }}>SERENITY</Typography> HEAVEN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography align="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          <Box sx={{ flexGrow: 1, justifyContent:'center', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ mr: 2, color: '#0096c7' }}>SERENITY</Typography> HEAVEN
          </Typography>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{user.displayName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button component={Link} to="/dashboard" variant="outlined" sx={{ borderColor: '#EF5350', backgroundColor: '#394251', color: 'white' }}>
                      Dashboard
                    </Button>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <Button variant="outlined" sx={{ borderColor: '#EF5350', backgroundColor: '#394251', color: 'white' }}>
                    LogOut
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <MenuItem onClick={handleCloseUserMenu}>
              <Button component={Link} to="/login" variant="outlined" sx={{ borderColor: '#EF5350', backgroundColor: '#394251', color: 'white' }}>
                Login
              </Button>
            </MenuItem>
          )}
        </Toolbar>
        <ToastContainer></ToastContainer>
      </Container>
    </AppBar>
  );
};

export default Navbar;
