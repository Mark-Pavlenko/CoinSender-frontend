import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';
//
import { PROFILE } from '../../constants/routes';
import { LOGOUT_USER } from '../../constants/actions';
import { AVATAR_URL } from 'src/constants/defaultURL';
import { stringAvatar } from 'src/utils/stringAvatar';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: PROFILE,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('access_token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { email, password } = user;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const mockLogout = () => {
    dispatch({ type: LOGOUT_USER, navigate });
    localStorage.setItem('provider', null);
    // logoutUser();
    // removeDataFromLocalstorage("access_token");
    // removeDataFromLocalstorage("authorization_login");
    // removeDataFromLocalstorage("authorization_login");
    // navigate(SIGN_IN, { replace: true });
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          src={AVATAR_URL + user?.avatar_url || '/images/example.jpg'}
          {...stringAvatar(user?.name, user?.second_name)}
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name || ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || ''}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <LoadingButton fullWidth size="medium" onClick={mockLogout} variant="contained">
            Logout
          </LoadingButton>
        </Box>
      </MenuPopover>
    </>
  );
}
