import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AvatarUpload from '../../layouts/Avatar';
import Page from '../../components/Page';
import LeftIcon from '../../assets/icons/arrow-button-left.svg';
import { CLIENTS } from '../../constants/routes';
import WarningModal from '../../components/WarningModal';
import { useDispatch } from 'react-redux';
import MuiPhoneNumber from 'material-ui-phone-number';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const NewClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    values,
    dirty,
    touched,
    getFieldProps,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      second_name: '',
      amount: 0,
      add_info: '',
      position: '',
      phone: '+380',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      add_info: Yup.string().max(15, 'Maximum length 15 characters'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
      phone: Yup.string().test(
        'isValid',
        'Phone is not valid',
        (val) => val === '+' || val === '+380' || isValidPhoneNumber(val),
      ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', values.avatar ? values.avatar[0] : null);
      formData.append('name', values.name);
      formData.append('description', values.add_info ? values.add_info : '');
      formData.append('phone', values.phone === '+' || values.phone === '+380' ? '' : values.phone);
      formData.append('email', values.email);
      formData.append('organization_id', currentUser.organization_id);
      dispatch({
        type: 'ADD_CLIENT_SAGA',
        payload: formData,
        navigate,
        flag: 'create',
        org_id: currentUser.organization_id,
      });
    },
  });

  return (
    <Page title="New Partner | CoinSender">
      <PageLayout>
        <WarningModal open={isOpen} type={CLIENTS} close={handleClose} />
        <Stack>
          <PageTitle title="Add partner" path={CLIENTS} handler={() => setIsOpen(true)} />
          <Grid container>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                padding: 3,
                width: '100%',
                boxShadow:
                  'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
              }}
              noValidate
              autoComplete="off"
            >
              <Stack direction="row" gap="20px">
                <Stack width="50%" gap="16px">
                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      required
                      fullWidth
                      label={t('name')}
                      name="name"
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      fullWidth
                      label={t('Email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <MuiPhoneNumber
                      fullWidth
                      variant="outlined"
                      label="Phone Number"
                      data-cy="user-phone"
                      defaultCountry="ua"
                      name="phone"
                      {...getFieldProps('phone')}
                      value={values.phone}
                      onChange={handleChange('phone')}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Stack>
                </Stack>
                <Stack width="50%" alignItems="center" justifyContent="center">
                  <AvatarUpload flag="new" handler={setFieldValue} avatar={values.avatar} />
                </Stack>
              </Stack>
              <Stack mt={2} spacing={2}>
                <TextField
                  fullWidth
                  label="Additional information"
                  name="add_info"
                  onChange={handleChange}
                />
                <Stack direction="row" gap={2}>
                  <Button
                    type="submit"
                    sx={{ height: '30px' }}
                    disabled={!(isValid && dirty)}
                    variant="contained"
                  >
                    {t('Save')}
                  </Button>
                  <Button
                    onClick={() => setIsOpen(true)}
                    sx={{ height: '30px' }}
                    variant="contained"
                  >
                    {t('cancel')}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </PageLayout>
    </Page>
  );
};
