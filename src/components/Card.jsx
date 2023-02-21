import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import MoreMenuEmployees from '../pages/Employees/components/MoreMenu';
import MoreMenuClient from '../pages/Clients/components/MoreMenu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AVATAR_URL } from 'src/constants/defaultURL';
import { stringAvatar } from 'src/utils/stringAvatar';

const TitleStyle = styled(Link)({
  fontSize: 14,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

export const CardComponent = ({ item, handleOpen, isEmployee, isPartner }) => {
  const { name, email, phone, second_name, surname, id, avatar_url } = item;

  return (
    <Grid item xs={12} sm={4} md={4} sx={{ position: 'relative' }}>
      <Stack
        sx={{
          position: 'absolute',
          color: 'white',
          zIndex: 1000,
          right: '2%',
          top: '20%',
        }}
      >
        {isPartner ? (
          <MoreMenuClient handleOpen={handleOpen} id={id} user={item} />
        ) : (
          <MoreMenuEmployees
            handleOpen={handleOpen}
            id={id}
            user={item}
            isEmployee={isEmployee}
            isPartner={isPartner}
          />
        )}
      </Stack>
      {isEmployee && (
        <Card sx={{ position: 'relative' }}>
          <Stack
            sx={{
              display: 'flex',
              p: 3,
              pb: 2,
              gap: 1,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              ':hover p': {
                textDecoration: 'underline',
              },
            }}
            component={RouterLink}
            to={`/application/employees/${id}/profile`}
          >
            <Avatar
              src={AVATAR_URL + avatar_url || '/images/example.jpg'}
              style={{
                margin: '10px',
                width: '100px',
                height: '100px',
                cursor: 'pointer',
                position: 'relative',
                fontSize: '25px',
              }}
              {...stringAvatar(name, second_name)}
            />
            <TitleStyle
              sx={{ mt: 2, color: 'black' }}
              variant="subtitle2"
              underline="hover"
              component={Typography}
            >
              {name && second_name ? name + ' ' + second_name : 'No data'}
            </TitleStyle>
          </Stack>
        </Card>
      )}
      {isPartner && (
        <Card sx={{ position: 'relative' }}>
          <Stack
            sx={{
              display: 'flex',
              p: 3,
              pb: 2,
              gap: 1,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              ':hover p': {
                textDecoration: 'underline',
              },
            }}
            component={RouterLink}
            to={`/application/partners/${id}/profile`}
          >
            <Avatar
              src={AVATAR_URL + item.avatar || '/images/example.jpg'}
              style={{
                margin: '10px',
                width: '100px',
                height: '100px',
                cursor: 'pointer',
                position: 'relative',
                fontSize: '25px',
              }}
              {...stringAvatar(name)}
            />
            <TitleStyle
              sx={{ mt: 2, color: 'black' }}
              variant="subtitle2"
              underline="hover"
              component={Typography}
            >
              {name ? name : 'No data'}
            </TitleStyle>
            <Stack>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  display: 'block',
                  fontSize: '12px',
                }}
              >
                {email ? email : 'No data'}
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  display: 'block',
                  fontSize: '12px',
                }}
              >
                {phone ? phone : 'No data'}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      )}
    </Grid>
  );
};
