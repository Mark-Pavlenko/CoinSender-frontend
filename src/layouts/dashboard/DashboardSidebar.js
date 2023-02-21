import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mocks_

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import sidebarConfig from './SidebarConfig';
import { useDispatch, useSelector } from 'react-redux';
import { INVOICE_CREATE, PROFILE } from 'src/constants/routes';
import { AVATAR_URL } from 'src/constants/defaultURL';
import Iconify from 'src/components/Iconify';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { stringAvatar } from 'src/utils/stringAvatar';
import { Logo } from 'src/assets/images/Logo';
import logo from '../../assets/icons/logo.png';
const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const user = useSelector(({ AuthUser: { user } }) => user);
  const userFromStorage = JSON.parse(localStorage.getItem('currentUser'));

  const { t } = useTranslation('common');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        sx={{
          px: 2.5,
          py: 3.0625,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {/* <img src={logo} style={{ height: '67px', objectFit: 'cover' }} /> */}
        <Logo width="100%" height="60" />
      </Stack>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to={PROFILE}>
          <AccountStyle>
            <Avatar
              src={AVATAR_URL + userFromStorage?.avatar_url || '/images/example.jpg'}
              {...stringAvatar(userFromStorage?.name, userFromStorage?.second_name)}
              alt="photoURL"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userFromStorage?.name + ' ' + userFromStorage?.second_name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userFromStorage?.role || ''}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <Box sx={{ px: 2.5, py: 3 }}>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          component={RouterLink}
          to={INVOICE_CREATE}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {t('add.invoice')}
        </Button>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
