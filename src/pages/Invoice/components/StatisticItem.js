import React from 'react';
import { Grid } from '@material-ui/core';
import { Stack } from '@mui/material';
import { CircularProgressBar } from './CircularProgress';
import { useTranslation } from 'react-i18next';

export const StatisticItem = ({ color, header, balance, value }) => {
  const { t } = useTranslation('common');

  return (
    <Grid item lg xs={6} sm={4} md>
      <Stack py={2} direction="row" justifyContent="center" alignItems="center" gap={3}>
        <Stack>
          <CircularProgressBar
            icon={header.toLowerCase()}
            colorStyle={color}
            value={(value * 100) / 20}
          />
        </Stack>
        <Stack>
          <Stack sx={{ fontSize: '18px', fontWeight: '600' }}>{t(header.toLowerCase())}</Stack>
          <Stack> {value} invoice</Stack>
          <Stack color={color}>${balance}</Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};
