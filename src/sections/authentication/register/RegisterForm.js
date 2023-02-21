import React, { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import {
  Stack,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import { validationSchemaForCompany, initialValuesForCompany } from './formikSetting';
import { registerUser } from '../../../redux/actions';
import { APP, APPLICATION, SIGN_IN } from '../../../constants/routes';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../components/Iconify';
import { companyOptions, roleOptions } from './constants';

function RegisterForm({ registerUser, value }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const errorMessage = useSelector(({ AuthUser: { errorMessage } }) => errorMessage);

  const navigate = useNavigate();
  const { t } = useTranslation('common');

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowSecondPassword = () => {
    setShowSecondPassword((show) => !show);
  };

  const formik = useFormik({
    initialValues: initialValuesForCompany,
    validationSchema: validationSchemaForCompany,

    onSubmit: (values) => {
      registerUser(
        {
          name: values.name,
          second_name: values.second_name,
          company_name: values.company,
          email: values.email,
          password: values.confirm_password,
        },
        navigate,
      );
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleChange,
    setFieldValue,
    values,
    isValid,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack flexDirection="row" mb={2} gap={1}>
          <Stack>
            <TextField
              fullWidth
              required
              FormHelperTextProps={{ style: { fontSize: 12 } }}
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
          <Stack>
            <TextField
              fullWidth
              required
              FormHelperTextProps={{ style: { fontSize: 12 } }}
              label="Surname"
              {...getFieldProps('second_name')}
              error={Boolean(touched.second_name && errors.second_name)}
              helperText={touched.second_name && errors.second_name}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </Stack>
        <Stack spacing={2} mb={3}>
          <TextField
            fullWidth
            required
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            label="Company Name"
            {...getFieldProps('company')}
            error={
              Boolean(touched.company && errors.company) ||
              (errorMessage.includes('Organization') && errorMessage)
            }
            helperText={
              Boolean(touched.company && errors.company) ||
              (errorMessage.includes('Organization') && errorMessage)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            {...getFieldProps('email')}
            error={
              Boolean(touched.email && errors.email) ||
              (errorMessage.includes('Admin') && errorMessage)
            }
            helperText={
              Boolean(touched.email && errors.email) ||
              (errorMessage.includes('Admin') && errorMessage)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            FormHelperTextProps={{ style: { fontSize: 12 } }}
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
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            type={showSecondPassword ? 'text' : 'password'}
            label="Confirm password"
            {...getFieldProps('confirm_password')}
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowSecondPassword} edge="end">
                    <Iconify icon={showSecondPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" disabled={!isValid} variant="contained">
          Create Profile
        </LoadingButton>
        <Typography fontSize="14px" fontWeight={500} color="#808080" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link
            fontSize="14px"
            fontWeight={500}
            component={RouterLink}
            to={SIGN_IN}
            underline="always"
          >
            Sign In
          </Link>
        </Typography>
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = (state) => ({ state });
const mapActionsToProps = { registerUser };

export default connect(mapStateToProps, mapActionsToProps)(RegisterForm);
