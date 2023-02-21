/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AvatarUpload from '../../layouts/Avatar';
import Page from '../../components/Page';
import LeftIcon from '../../assets/icons/arrow-button-left.svg';
import { EMPLOYEES } from '../../constants/routes';
import WarningModal from '../../components/WarningModal';
import { useDispatch, useSelector } from 'react-redux';
import { employees } from 'src/redux/employees/reducer';
import { isAddress } from '@ethersproject/address';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

export const NewEmployee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      second_name: '',
      amount: 0,
      wallet_id: '',
      add_info: '',
      position: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      second_name: Yup.string().max(15, 'Maximum length 15 characters').required('Is required'),
      wallet_id: Yup.string()
        .label('Wallet address')
        .required()
        .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value)),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('avatar', values.avatar ? values.avatar[0] : null);
      formData.append('name', values.name);
      formData.append('second_name', values.second_name);
      formData.append('add_info', values.add_info);
      formData.append('wallet_id', values.wallet_id);
      formData.append('position', values.position);
      formData.append('amount', values.amount);
      dispatch({
        type: 'ADD_EMPLOYEE_SAGA',
        payload: formData,
        navigate,
      });
    },
  });

  return (
    <Page title="Dashboard: New Employee">
      <PageLayout>
        <WarningModal open={isOpen} type={EMPLOYEES} close={handleClose} />
        <Stack>
          <PageTitle title="Add employee" path={EMPLOYEES} handler={() => setIsOpen(true)} />
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      fullWidth
                      label={t('surname')}
                      name="second_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.second_name && errors.second_name)}
                      helperText={touched.second_name && errors.second_name}
                      required
                    />
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <TextField
                      fullWidth
                      label={t('wallet.id')}
                      error={Boolean(touched.wallet_id && errors.wallet_id)}
                      helperText={touched.wallet_id && errors.wallet_id}
                      name="wallet_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
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
                  label={t('Position')}
                  name="position"
                  onChange={handleChange}
                />
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
