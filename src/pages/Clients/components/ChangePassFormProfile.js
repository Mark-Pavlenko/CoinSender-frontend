import * as Yup from 'yup';
import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { useTranslation } from 'react-i18next';

export function ChangePassFormProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const passwordExp = '[a-zA-Z0-9]+';

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object().shape({
      oldpassword: Yup.string().matches(passwordExp).required('Is required'),
      password: Yup.string()
        .min(8, 'Minimum password length 8 characters')
        .matches(passwordExp)
        .required('Is required'),
      reppassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords are not the same')
        .matches(passwordExp)
        .min(8, 'Minimum password length 8 characters')
        .required('Is required'),
    }),

    onSubmit: () => {
      dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
          old_password: formik.values.oldpassword,
          password: formik.values.reppassword,
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowRepPassword = () => {
    setShowRepPassword((show) => !show);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography mb={2} variant="h6" gutterBottom>
          {t('Change password')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={7} sx={12}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showNewPassword ? 'text' : 'password'}
              label={t('Old password')}
              {...getFieldProps('oldpassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowNewPassword} edge="end">
                      <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.oldpassword && errors.oldpassword)}
              helperText={touched.oldpassword && errors.oldpassword}
            />
          </Grid>
          <Grid item lg={7} sx={12}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label={t('New password')}
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Grid>
          <Grid item lg={7} sx={12}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showRepPassword ? 'text' : 'password'}
              label={t('Repeat new password')}
              {...getFieldProps('reppassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowRepPassword} edge="end">
                      <Iconify icon={showRepPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.reppassword && errors.reppassword)}
              helperText={touched.reppassword && errors.reppassword}
            />
          </Grid>
          <Grid item lg={7} sx={12}>
            <LoadingButton fullWidth size="large" type="submit" variant="contained">
              {t('change')}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
