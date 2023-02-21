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
import { PageTitle } from 'src/components/PageTitle';
import { PageLayout } from 'src/layouts/PagesLayout';

export const Block = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
});

export const EditEmployee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const params = useParams().id;
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const employee = useSelector(({ employees: { employee, isLoading } }) => ({
    employee,
    isLoading,
  }));
  const employeeFromStorate = JSON.parse(localStorage.getItem('currentEmployee'));

  useEffect(() => dispatch({ type: 'GET_EMPLOYEE_SAGA', payload: params }), []);

  // const deleteImage = () => {
  //   const formData = new FormData();
  //   formData.append('name', employeeFromStorate.name);
  //   formData.append('second_name', employeeFromStorate.second_name);
  //   formData.append('wallet_id', employeeFromStorate.wallet_id);
  //   formData.append('add_info', employeeFromStorate.add_info ? employeeFromStorate.add_info : '');
  //   formData.append('position', employeeFromStorate.position ? employeeFromStorate.position : '');
  //   formData.append('avatar_url', null);
  //   formData.append('id', Number(params));
  //   dispatch({
  //     type: 'EDIT_EMPLOYEE_PROFILE',
  //     payload: formData,
  //     id: employee.employee.id,
  //     flag: 'delete',
  //   });
  // };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: employeeFromStorate.name,
      second_name: employeeFromStorate.second_name,
      wallet_id: employeeFromStorate.wallet_id,
      add_info: employeeFromStorate.add_info ? employeeFromStorate.add_info : '',
      position: employeeFromStorate.position ? employeeFromStorate.position : '',
      avatar_url: employeeFromStorate?.avatar_url,
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
      formData.append('id', employee.employee.id);
      formData.append('avatar', values.avatar ? values.avatar[0] : null);
      formData.append('name', values.name);
      formData.append('second_name', values.second_name);
      formData.append('wallet_id', values.wallet_id);
      formData.append('position', values.position);
      formData.append('add_info', values.add_info);
      !values.avatar && formData.append('avatar_url', null);
      dispatch({
        type: 'EDIT_EMPLOYEE_PROFILE',
        payload: formData,
        navigate,
        id: employee.employee.id,
        flag: 'edit',
      });
    },
  });

  return (
    <Page title="Dashboard: New Employee">
      <PageLayout>
        <WarningModal
          open={isOpen}
          type={`${EMPLOYEES}/${employeeFromStorate?.id}/profile`}
          close={handleClose}
        />
        {employee.isLoading ? (
          'Loading...'
        ) : (
          <Stack>
            <PageTitle
              title="Edit employee"
              path={`${EMPLOYEES}/${employeeFromStorate?.id}/profile`}
              handler={() => setIsOpen(true)}
            />
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
                        label={t('name')}
                        name="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <TextField
                        fullWidth
                        label={t('surname')}
                        name="second_name"
                        required
                        value={values.second_name}
                        onChange={handleChange}
                      />
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <TextField
                        fullWidth
                        label={t('Position')}
                        name="position"
                        value={values.position}
                        onChange={handleChange}
                      />
                    </Stack>
                  </Stack>
                  <Stack width="50%" alignItems="center" justifyContent="center">
                    <AvatarUpload
                      flag="edit"
                      type="employee"
                      user={employeeFromStorate}
                      handler={setFieldValue}
                      avatar={values.avatar_url}
                    />
                  </Stack>
                </Stack>
                <Stack mt={2} spacing={2}>
                  <TextField
                    fullWidth
                    label={t('wallet.id')}
                    value={values.wallet_id}
                    error={Boolean(errors.wallet_id)}
                    helperText={errors.wallet_id}
                    name="wallet_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Additional information"
                    name="add_info"
                    value={values.add_info}
                    onChange={handleChange}
                  />
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
        )}
      </PageLayout>
    </Page>
  );
};
