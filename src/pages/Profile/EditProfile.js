/* eslint-disable */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AvatarUpload from '../../layouts/Avatar';
import Page from '../../components/Page';
import LeftIcon from '../../assets/icons/arrow-button-left.svg';
import { EMPLOYEES, PROFILE } from '../../constants/routes';
import WarningModal from '../../components/WarningModal';
import MuiPhoneNumber from 'material-ui-phone-number';
import { initialValuesForCompany, validationSchemaForCompany } from './formikEditSettings';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState(['child1']);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    isValid,
    values,
    errors,
    touched,
    getFieldProps,
    initialValues,
  } = useFormik({
    initialValues: {
      name: user?.name,
      second_name: user?.second_name,
      phone: user?.phone ? user?.phone : '+380',
      avatar_url: user?.avatar_url,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      second_name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
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
      formData.append('second_name', values.second_name);
      formData.append('phone', values.phone === '+' || values.phone === '+380' ? '' : values.phone);
      !values.avatar && formData.append('avatar_url', null);

      dispatch({
        type: 'EDIT_USER_PROFILE',
        payload: formData,
        navigate,
        flag: 'edit',
      });
    },
  });

  return (
    <Page title="Dashboard: New Employee">
      <PageLayout>
        <WarningModal open={isOpen} type={PROFILE} close={handleClose} />
        <Stack>
          <PageTitle title="Edit profile" path={PROFILE} handler={() => setIsOpen(true)} />
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
                      fullWidth
                      required
                      label="Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      fullWidth
                      required
                      label="Surname"
                      {...getFieldProps('second_name')}
                      error={Boolean(touched.second_name && errors.second_name)}
                      helperText={touched.second_name && errors.second_name}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <MuiPhoneNumber
                      fullWidth
                      required
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
                  <AvatarUpload
                    flag="edit"
                    type="user"
                    user={user}
                    handler={setFieldValue}
                    avatar={values.avatar_url}
                  />
                </Stack>
              </Stack>
              <Stack mt={2} spacing={2}>
                <Stack direction="row" gap={2}>
                  <Button
                    type="submit"
                    sx={{ height: '30px' }}
                    disabled={!isValid}
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
