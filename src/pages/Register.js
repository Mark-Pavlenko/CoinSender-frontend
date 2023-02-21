import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack } from '@mui/material';
import Page from '../components/Page';
import { RegisterForm } from '../sections/authentication/register';
import { useTranslation } from 'react-i18next';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ArrowRight from '../assets/icons/ArrowRightAuth.svg';
import { SIGN_IN } from 'src/constants/routes';
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

const ContentStyle = styled('div')(() => ({
  maxWidth: 390,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const TimelineTitle = styled(Typography)(() => ({
  fontFamily: 'Futura Md BT',
  component: 'span',
  fontWeight: '500',
}));

const TimelineSubtitle = styled(Typography)(() => ({
  fontSize: '18px',
  color: '#808080',
  fontWeight: 500,
  lineHeight: '30px',
  fontFamily: 'Futura Md BT',
}));

const TimeLineStyled = styled(Timeline)({
  '& .MuiTimelineDot-root': {
    width: '21px',
    height: '21px',
    display: 'block',
    border: '2px solid #007994',
    borderRadius: '50%',
    margin: '11.5px 0',
    background: 'inherit',
  },

  '& .MuiTimelineConnector-root': {
    background: '#808080',
    width: '1px',
  },
});

export default function Register() {
  return (
    <RootStyle title="Register | MegaDev-UI">
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
        <Typography
          fontFamily="Futura Md BT"
          fontSize="45px"
          fontWeight={500}
          sx={{ px: 5, mb: 5, mt: 7 }}
        >
          Salary <span style={{ color: '#007994' }}>transfer</span> with a single click
        </Typography>
        <Stack>
          <TimeLineStyled
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              padding: '0 40px',
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ padding: '0 16px', marginBottom: '40px' }}>
                <TimelineTitle variant="h4">Sign In</TimelineTitle>
                <TimelineSubtitle variant="h6">
                  Just sign up and log in to your account to get started. It will take less than a
                  minute.
                </TimelineSubtitle>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ padding: '0 16px', marginBottom: '40px' }}>
                <TimelineTitle variant="h4">Connect Your Wallet</TimelineTitle>
                <TimelineSubtitle variant="h6">
                  Connect your wallet, which you are going to use for salary payments.{' '}
                </TimelineSubtitle>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent sx={{ padding: '0 16px' }}>
                <TimelineTitle variant="h4">Make a Transfer</TimelineTitle>
                <TimelineSubtitle variant="h6">
                  Select the list of employees and transfer them all at once. Send customized
                  invoices, receive invoices for payment.
                </TimelineSubtitle>
              </TimelineContent>
            </TimelineItem>
          </TimeLineStyled>
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
        <Stack position="absolute" top="24px" left="32px">
          <RouterLink to={SIGN_IN}>
            <img src={ArrowRight} alt="go_back" />
          </RouterLink>
        </Stack>

        <ContentStyle>
          <Typography
            textAlign="center"
            color="#292929"
            variant="h4"
            sx={{ fontFamily: 'Futura Md BT', fontSize: '24px' }}
            gutterBottom
            mb="40px"
          >
            Create your Coinsender Account
          </Typography>
          <RegisterForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
