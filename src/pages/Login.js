import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography } from '@mui/material';

import { SIGN_UP } from '../constants/routes';
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import SigninLogo from '../assets/images/wallet-icons/signin.svg';
import ArrowRight from '../assets/icons/ArrowRightAuth.svg';
import { Logo } from 'src/assets/images/Logo';
import logo from '../assets/icons/logo.png';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  background: 'rgba(34, 214,255,0.03)',
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
}));

function Login() {
  return (
    <RootStyle title="Login">
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Stack
          display="flex"
          alignItems="center"
          top="10px"
          left="-32px"
          position="absolute"
          sx={{ width: '100%' }}
          justifyContent="center"
        >
          <a href="https://coinsender.io/">
            <Logo height="100" />
          </a>
        </Stack>
        <Stack justifyContent="center" width="100%">
          <img
            style={{ width: '496px', height: '454px', marginLeft: '-50px' }}
            src={SigninLogo}
            alt="login"
          />
        </Stack>
      </SectionStyle>

      <Container
        sx={{
          background: 'white',
          borderRadius: '25px 0 0 25px',
          position: 'relative',
          maxWidth: { lg: '100%' },
        }}
      >
        <ContentStyle>
          <Stack sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Futura Md BT', fontSize: '24px' }}
              gutterBottom
            >
              Sign in to CoinSender
            </Typography>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default Login;
