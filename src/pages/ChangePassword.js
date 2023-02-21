import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';

import { SIGN_IN, SIGN_UP } from '../constants/routes';
import Page from '../components/Page';
import ArrowRight from '../assets/icons/ArrowRightAuth.svg';
import SigninLogo from '../assets/images/wallet-icons/signin.svg';

import ForgotForm from 'src/sections/authentication/forgotPassword/ForgotForm';
import ChangePasswordForm from 'src/sections/authentication/change-password/ChangePasswordForm';
import { Logo } from 'src/assets/images/Logo';
import logo from '../assets/icons/logo.png';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: '#FFFBF4',
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'inherit',
  boxShadow: 'none',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 390,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

function ForgotPassword() {
  return (
    <RootStyle title="Login">
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Stack top="40px" left="32px" position="absolute">
          <a href="https://coinsender.io/">
            <img src={logo} style={{ height: '67px', objectFit: 'cover' }} />
          </a>
        </Stack>
        <Stack justifyContent="center" width="100%">
          <img
            style={{ width: '496px', height: '454px', marginLeft: '-20px' }}
            src={SigninLogo}
            alt="login"
          />
        </Stack>
      </SectionStyle>

      <Container
        sx={{ background: 'white', borderRadius: '25px 0 0 25px', position: 'relative' }}
        maxWidth="md"
      >
        <Stack position="absolute" top="24px" left="32px">
          <RouterLink to={SIGN_IN}>
            <img src={ArrowRight} alt="go_back" />
          </RouterLink>
        </Stack>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Futura Md BT', fontSize: '24px' }}
              gutterBottom
            >
              Change password!
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', fontFamily: 'Futura Md BT', fontSize: '18px' }}
            >
              Enter your password below.
            </Typography>
          </Stack>
          <ChangePasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default ForgotPassword;
