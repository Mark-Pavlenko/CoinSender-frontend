import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Stack } from '@mui/material';

export default function ActionsTab() {
  const { t } = useTranslation('common');

  const events = [
    {
      name: 'Фото отредактировано',
      date: '16 июня 2021, 13:42',
      user: { avatar: '/images/example.jpg' },
    },
    {
      name: 'Профиль создан',
      date: '25 мая 2021, 13:42',
      user: { avatar: '/images/example.jpg' },
    },
    {
      name: 'Карьера отредактирована',
      date: '19 января 2021, 13:42',
      user: { avatar: '/images/example.jpg' },
    },
  ];

  return (
    <>
      {events.map(({ name, date, user }) => (
        <Box
          sx={{
            '& .MuiTextField-root': { mx: 0, my: 2, width: '100%' },
            padding: 2,
            marginBottom: 2,
            boxShadow:
              'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack alignItems="center" direction="row" gap="20px">
              <EditIcon />
              <span>{name}</span>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" gap="16px">
              <span>{date}</span>
              <Avatar
                src="/images/example.jpg"
                style={{
                  width: '40',
                  height: '40',
                }}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
    </>
  );
}
